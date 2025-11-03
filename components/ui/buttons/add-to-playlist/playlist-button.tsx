"use client";

import React, { useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useModalStore } from "@/stores/modal-store";

interface IAddToPlaylistButtonProps {
    trackId: string;
    className?: string;
    iconSize?: number;
}

const AddToPlaylistButton = ({ trackId, className = "", iconSize = 18 }: IAddToPlaylistButtonProps) => {
    const { user } = useAuthStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const { isModalOpen } = useModalStore();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen, closeModal]);

    const handleAddToPlaylist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) return;
        openModal("add_to_playlist", { userId: user.id, trackId });
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            // Ensure parent is relative for absolute dropdown
        >
            <button
                onClick={handleAddToPlaylist}
                className={`p-1 rounded-full transition focus:outline-none
                    ${user ? "bg-black/60 hover:bg-black/80 text-white" : "bg-gray-600/50 text-gray-400 cursor-not-allowed"}
                `}
                title={user ? "Add to playlist" : "Sign in to add to playlist"}
                disabled={!user}
                type="button"
            >
                <Plus size={iconSize} strokeWidth={2.2} />
            </button>
        </div>
    );
};

export default AddToPlaylistButton;
