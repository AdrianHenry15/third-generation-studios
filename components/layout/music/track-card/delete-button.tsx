import { useDeleteAlbum } from "@/hooks/music/use-albums";
import { useDeleteTrack } from "@/hooks/music/use-tracks";
import { TrackWithRelations } from "@/lib/types/database";
import { useModalStore } from "@/stores/modal-store";
import { Trash2 } from "lucide-react";
import React from "react";

const DeleteButton = ({ track }: { track: TrackWithRelations }) => {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const deleteAlbum = useDeleteAlbum();
    const deleteTrack = useDeleteTrack();
    const handleDeleteClick = () => {
        openModal("confirm", {
            title: `Delete "${track.title}"?`,
            confirmText: "Delete",
            cancelText: "Cancel",
            onConfirm: async () => {
                try {
                    await deleteAlbum.mutateAsync(track.album_id);
                    await deleteTrack.mutateAsync(track.id);
                    closeModal();
                    openModal("success", {
                        title: `"Track Deleted.`,
                        confirmText: "Continue",
                        cancelText: "Close",
                        onConfirm: () => closeModal(),
                    });
                } catch (error) {
                    console.error("Failed to delete track:", error);
                }
            },
        });
    };
    return (
        <button
            onClick={handleDeleteClick}
            className="absolute bottom-[20px] right-4 p-[7px] bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
            title="Delete track"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
};

export default DeleteButton;
