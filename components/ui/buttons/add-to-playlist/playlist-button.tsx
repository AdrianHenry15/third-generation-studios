"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import PlaylistButtonDropdown from "./playlist-button-dropdown";

interface IAddToPlaylistButtonProps {
    trackId: string;
    className?: string;
    iconSize?: number;
}

const AddToPlaylistButton = ({ trackId, className = "", iconSize = 18 }: IAddToPlaylistButtonProps) => {
    const { user } = useAuthStore();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div
            className={`relative inline-block ${className}`}
            ref={dropdownRef}
            // Ensure parent is relative for absolute dropdown
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (!user) return;
                    setShowDropdown((v) => !v);
                }}
                className={`p-1 rounded-full transition focus:outline-none
                    ${user ? "bg-black/60 hover:bg-black/80 text-white" : "bg-gray-600/50 text-gray-400 cursor-not-allowed"}
                `}
                title={user ? "Add to playlist" : "Sign in to add to playlist"}
                disabled={!user}
                type="button"
            >
                <Plus size={iconSize} strokeWidth={2.2} />
            </button>

            {showDropdown && user && <PlaylistButtonDropdown userId={user.id} trackId={trackId} onClose={() => setShowDropdown(false)} />}
        </div>
    );
};

export default AddToPlaylistButton;
