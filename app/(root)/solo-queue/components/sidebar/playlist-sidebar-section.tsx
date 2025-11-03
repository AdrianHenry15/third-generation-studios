"use client";

import { useState } from "react";
import { Plus, PlayCircle } from "lucide-react";
import SidebarSection from "./sidebar-section";
import { useAuthStore } from "@/stores/auth-store";
import { usePlaylistsByUser, useCreatePlaylist } from "@/hooks/music/use-playlists";
import { useModalStore } from "@/stores/modal-store";

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
    const [playlistName, setPlaylistName] = useState("");

    // Stores
    const { user } = useAuthStore(); // Get current user
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);

    // Queries / Mutations using new hooks
    const { data: playlists = [], isLoading } = usePlaylistsByUser(user?.id || "", !!user?.id);
    const createPlaylistMutation = useCreatePlaylist();

    // Derived data
    // Get 5 most recent playlists (sort by created_at desc)
    const recentPlaylists = playlists
        .filter((playlist) => playlist.created_at !== null)
        .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
        .slice(0, 5);

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
                    closeModal();
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
        openModal("create_playlist", {});
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
                            href: user?.id ? "#create-playlist" : "/sign-in",
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
                                      href: "#playlists-loading",
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
        </>
    );
}
