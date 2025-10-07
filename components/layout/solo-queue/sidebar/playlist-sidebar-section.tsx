"use client";

// Sidebar "Playlists" section: lists a quick action ("Create Playlist") and recent playlists.
// Includes a small modal to create a playlist without leaving the sidebar.

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, PlayCircle } from "lucide-react";
import SidebarSection from "./sidebar-section";
import { useAuthStore } from "@/stores/auth-store";
import { usePlaylistsByUser, useCreatePlaylist } from "@/hooks/music/use-playlists";

/**
 * PlaylistSidebarSection
 * Renders a section with a create action and up to 5 recent playlists.
 *
 * Props:
 * - isCollapsed: whether the sidebar is collapsed (desktop)
 * - isMobile: whether the sidebar is in mobile mode
 * - onMobileClose: close handler for mobile sidebar
 */
export default function PlaylistSidebarSection({
    isCollapsed,
    isMobile,
    onMobileClose,
}: {
    isCollapsed: boolean;
    isMobile: boolean;
    onMobileClose: () => void;
}) {
    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    // Store
    const { user } = useAuthStore(); // Get current user

    // Queries / Mutations using new hooks
    const { data: playlists = [], isLoading } = usePlaylistsByUser(user?.id || "", !!user?.id);
    const createPlaylistMutation = useCreatePlaylist();

    // Derived data
    // Get 5 most recent playlists (sort by created_at desc)
    const recentPlaylists = playlists.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

    // Handlers
    const handleCreatePlaylist = () => {
        if (!playlistName.trim() || !user?.id) return;

        createPlaylistMutation.mutate(
            {
                name: playlistName.trim(),
                created_by: user.id,
                description: null,
                is_public: false,
            },
            {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setPlaylistName("");
                },
                onError: (error) => {
                    console.error("Failed to create playlist:", error);
                    // You could add toast notification here
                },
            },
        );
    };

    const handleCreateClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user?.id) {
            // Could show login prompt here
            console.warn("User must be logged in to create playlists");
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Section: Sidebar list (action + recent playlists) */}
            <SidebarSection
                section={{
                    title: "Playlists",
                    items: [
                        // "Create Playlist" item with custom click handler
                        {
                            icon: Plus,
                            label: user?.id ? "Create Playlist" : "Login to Create",
                            href: "#",
                            disabled: !user?.id,
                            onClick: handleCreateClick,
                        } as any,
                        // Show loading state OR actual playlists
                        ...(isLoading && user?.id
                            ? [
                                  // Single loading placeholder when actually loading
                                  {
                                      icon: PlayCircle,
                                      label: "Loading playlists...",
                                      href: "#",
                                      disabled: true,
                                  },
                              ]
                            : recentPlaylists.map((playlist) => ({
                                  icon: PlayCircle,
                                  label: playlist.name,
                                  href: `/solo-queue/playlists/${playlist.id}`,
                              }))),
                    ],
                }}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                onMobileClose={onMobileClose}
            />

            {/* Modal: Create Playlist */}
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
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleCreatePlaylist();
                                } else if (e.key === "Escape") {
                                    setIsModalOpen(false);
                                    setPlaylistName("");
                                }
                            }}
                            className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-neutral-400"
                            autoFocus
                            disabled={createPlaylistMutation.isPending}
                        />

                        {/* Error message */}
                        {createPlaylistMutation.isError && (
                            <p className="text-red-400 text-sm mb-4">Failed to create playlist. Please try again.</p>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setPlaylistName("");
                                }}
                                className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors disabled:opacity-50"
                                disabled={createPlaylistMutation.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreatePlaylist}
                                disabled={!playlistName.trim() || createPlaylistMutation.isPending || !user?.id}
                                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createPlaylistMutation.isPending ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
