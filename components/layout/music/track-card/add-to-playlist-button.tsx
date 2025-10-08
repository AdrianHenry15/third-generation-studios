"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import {
    usePlaylistsByUser,
    useAddTrackToPlaylist,
    useCreatePlaylist,
    type PlaylistInsert,
    PlaylistTrack,
} from "@/hooks/music/use-playlists";

// -------------------------
// TYPES & INTERFACES
// -------------------------

interface IAddToPlaylistButtonProps {
    trackId: string;
}

// -------------------------
// MAIN COMPONENT
// -------------------------

const AddToPlaylistButton = ({ trackId }: IAddToPlaylistButtonProps) => {
    // -------------------------
    // STATE & REFS
    // -------------------------

    const { user } = useAuthStore();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // -------------------------
    // HOOKS & QUERIES
    // -------------------------

    const { data: userPlaylists, isLoading } = usePlaylistsByUser(user?.id || "", !!user?.id);
    const addTrackToPlaylist = useAddTrackToPlaylist();
    const createPlaylist = useCreatePlaylist();

    // -------------------------
    // EFFECTS
    // -------------------------

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

    // -------------------------
    // EVENT HANDLERS
    // -------------------------

    const handleAddToPlaylist = async (playlistId: string, playlistName: string) => {
        if (!user?.id) {
            console.log("No user logged in");
            return;
        }

        console.log("Adding track to playlist:", { playlistId, trackId, userId: user.id });

        try {
            // Get the current playlist to determine the next position
            const playlist = userPlaylists?.find((p) => p.id === playlistId);
            const nextPosition = (playlist?.tracks?.length || 0) + 1;

            await addTrackToPlaylist.mutateAsync({
                playlistId,
                trackId,
                position: nextPosition,
                addedBy: user.id,
            });

            setShowDropdown(false);
            console.log(`Track added to "${playlistName}" successfully`);
        } catch (error) {
            console.error("Failed to add track to playlist:", error);
        }
    };

    const handleCreatePlaylist = async () => {
        if (!user?.id || !newPlaylistName.trim()) return;

        try {
            const playlistData: PlaylistInsert = {
                name: newPlaylistName.trim(),
                created_by: user.id,
                description: null,
                is_public: false,
            };

            const newPlaylist = await createPlaylist.mutateAsync(playlistData);

            // Add the track to the newly created playlist
            if (newPlaylist?.id) {
                await addTrackToPlaylist.mutateAsync({
                    playlistId: newPlaylist.id,
                    trackId,
                    position: 1, // First track in new playlist
                    addedBy: user.id,
                });
                console.log(`Track added to new playlist "${newPlaylistName}" successfully`);
            }

            setNewPlaylistName("");
            setShowCreateForm(false);
            setShowDropdown(false);
        } catch (error) {
            console.error("Failed to create playlist:", error);
        }
    };

    const isTrackInPlaylist = (playlistId: string) => {
        const playlist = userPlaylists?.find((p) => p.id === playlistId);
        // Check if any track in the playlist matches our trackId
        return playlist?.tracks?.some((playlistTrack: PlaylistTrack) => playlistTrack.track_id === trackId) || false;
    };

    // -------------------------
    // RENDER
    // -------------------------

    return (
        <div className="relative inline-block z-10 mt-4" ref={dropdownRef}>
            {/* Main Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    console.log("Button clicked, user:", user);
                    if (!user) {
                        console.log("No user, cannot show dropdown");
                        return;
                    }
                    setShowDropdown(!showDropdown);
                }}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    user ? "bg-black/60 hover:bg-black/80 text-white" : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                }`}
                title={user ? "Add to playlist" : "Sign in to add to playlist"}
                disabled={!user || addTrackToPlaylist.isPending}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && user && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 z-20 overflow-hidden">
                    {!showCreateForm ? (
                        /* Playlist Selection View */
                        <div className="p-3">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-gray-300">Add to playlist</p>
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                    title="Create new playlist"
                                >
                                    + New
                                </button>
                            </div>

                            {/* Playlist List */}
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                {isLoading ? (
                                    /* Loading State */
                                    <div className="flex items-center justify-center py-4">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                                        <span className="ml-2 text-sm text-gray-400">Loading...</span>
                                    </div>
                                ) : userPlaylists?.length ? (
                                    /* Playlists List */
                                    <div className="space-y-1">
                                        {userPlaylists.map((playlist) => {
                                            const isInPlaylist = isTrackInPlaylist(playlist.id);
                                            return (
                                                <button
                                                    key={playlist.id}
                                                    onClick={() => handleAddToPlaylist(playlist.id, playlist.name)}
                                                    disabled={isInPlaylist || addTrackToPlaylist.isPending}
                                                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-between group ${
                                                        isInPlaylist
                                                            ? "text-green-400 bg-green-900/20 cursor-not-allowed"
                                                            : "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                                                    }`}
                                                >
                                                    <span className="truncate font-medium">{playlist.name}</span>
                                                    {isInPlaylist ? (
                                                        /* Already Added Icon */
                                                        <svg className="w-4 h-4 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        /* Add Icon (on hover) */
                                                        <svg
                                                            className="w-4 h-4 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* Empty State */
                                    <div className="text-center py-6">
                                        <svg
                                            className="w-8 h-8 text-gray-600 mx-auto mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14-2v.5M5 9v.5m0 6v.5m14-.5v.5M5 15h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="text-sm text-gray-400 mb-3">No playlists yet</p>
                                        <button
                                            onClick={() => setShowCreateForm(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Create Your First Playlist
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Playlist Creation Form */
                        <div className="p-4">
                            {/* Form Header */}
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-gray-300">Create Playlist</p>
                                <button
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setNewPlaylistName("");
                                    }}
                                    className="text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Name Input */}
                            <input
                                type="text"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                placeholder="Playlist name..."
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-3"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleCreatePlaylist();
                                    } else if (e.key === "Escape") {
                                        setShowCreateForm(false);
                                        setNewPlaylistName("");
                                    }
                                }}
                            />

                            {/* Form Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCreatePlaylist}
                                    disabled={!newPlaylistName.trim() || createPlaylist.isPending}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    {createPlaylist.isPending ? (
                                        <>
                                            <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create & Add"
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setNewPlaylistName("");
                                    }}
                                    className="px-3 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                                    disabled={createPlaylist.isPending}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddToPlaylistButton;
