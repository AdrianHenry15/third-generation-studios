"use client"

import ConfirmModal from "@/components/modals/confirm-modal"
import { createClient } from "@/lib/supabase/client"
import { ImageType } from "@/models"
import { Trash2 } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"

interface ITrashButtonProps {
  image: ImageType
}

const TrashButton: React.FC<ITrashButtonProps> = ({ image }) => {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleDeleteClick = (e: React.MouseEvent) => {
    // e.preventDefault()
    // e.stopPropagation()
    setDeleteModalOpen(true)
  }
  const handleConfirmDelete = async () => {
    try {
      const deletedAt = new Date().toISOString()
      const { error } = await supabase
        .from("images")
        .update({ deleted_at: deletedAt })
        .eq("id", image.id)
      if (error) throw error
      toast.success("Image moved to trash")
      // Invalidate images query so TanStack Query refetches
      await queryClient.invalidateQueries({ queryKey: ["images"] })
      window.location.reload()
    } catch (error) {
      toast.error("Failed to delete image")
    }
    setDeleteModalOpen(false)
  }

  if (deleteModalOpen) {
    return (
      <ConfirmModal
        title="Are you sure you want to delete this image?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    )
  }

  return (
    <button
      onClick={handleDeleteClick}
      className="bg-black bg-opacity-60 rounded-full p-1.5 text-white transition-opacity hover:bg-red-600"
      aria-label="Delete image">
      <Trash2 size={16} />
    </button>
  )
}

export default TrashButton
