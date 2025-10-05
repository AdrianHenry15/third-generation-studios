"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, PlayCircle } from "lucide-react";
import SidebarSection from "./sidebar-section";
import { usePlaylistsQuery, usePlaylistInsert } from "@/hooks/music/use-playlists";
import { useAuthStore } from "@/stores/auth-store";

export default function PlaylistSidebarSection({
    isCollapsed,
    isMobile,
    onMobileClose,
}: {
    isCollapsed: boolean;
    isMobile: boolean;
    onMobileClose: () => void;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    // Use the playlist hooks
    const { data: playlists = [] } = usePlaylistsQuery();
    const { mutate: createPlaylist, isPending } = usePlaylistInsert();
    const { user } = useAuthStore(); // Get current user

    // Get 5 most recent playlists
    const recentPlaylists = playlists.slice(0, 5);

    const handleCreatePlaylist = () => {
        if (!playlistName.trim() || !user) return;

        createPlaylist(
            {
                name: playlistName.trim(),
                created_by: user?.id || "",
                description: "",
                is_public: false,
            },
            {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setPlaylistName("");
                },
            },
        );
    };

    const handleCreateClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <SidebarSection
                section={{
                    title: "Playlists",
                    items: [
                        // "Create Playlist" item with custom click handler
                        {
                            icon: Plus,
                            label: "Create Playlist",
                            href: "#",
                        },
                        // Map playlists to sidebar links
                        ...recentPlaylists.map((playlist) => ({
                            icon: PlayCircle,
                            label: playlist.name,
                            href: `/solo-queue/playlists/${playlist.id}`,
                        })),
                    ],
                }}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                onMobileClose={onMobileClose}
            />

            {/* Playlist Create Modal */}
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
                    onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-neutral-900 p-6 rounded-xl shadow-xl max-w-md w-full border border-neutral-700 mx-4"
                    >
                        <h2 className="text-lg font-bold mb-4 text-white">Create Playlist</h2>
                        <input
                            type="text"
                            placeholder="Playlist name"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
                            className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                            autoFocus
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setPlaylistName("");
                                }}
                                className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreatePlaylist}
                                disabled={!playlistName.trim() || isPending}
                                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
