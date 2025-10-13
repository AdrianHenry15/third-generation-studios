"use client";

import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import {
    usePlaylistsByUser,
    useAddTrackToPlaylist,
    useCreatePlaylist,
    type PlaylistInsert,
    PlaylistTrack,
} from "@/hooks/music/use-playlists";

interface PlaylistButtonDropdownProps {
    userId: string;
    trackId: string;
    onClose: () => void;
}

const PlaylistButtonDropdown: React.FC<PlaylistButtonDropdownProps> = ({ userId, trackId, onClose }) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const { data: userPlaylists, isLoading } = usePlaylistsByUser(userId, !!userId);
    const addTrackToPlaylist = useAddTrackToPlaylist();
    const createPlaylist = useCreatePlaylist();

    const handleAddToPlaylist = async (playlistId: string) => {
        try {
            const playlist = userPlaylists?.find((p) => p.id === playlistId);
            const nextPosition = (playlist?.tracks?.length || 0) + 1;
            await addTrackToPlaylist.mutateAsync({
                playlistId,
                trackId,
                position: nextPosition,
                addedBy: userId,
            });
            onClose();
        } catch (error) {
            console.error("Failed to add track to playlist:", error);
        }
    };

    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return;
        try {
            const playlistData: PlaylistInsert = {
                name: newPlaylistName.trim(),
                created_by: userId,
                description: null,
                is_public: false,
            };
            const newPlaylist = await createPlaylist.mutateAsync(playlistData);
            if (newPlaylist?.id) {
                await addTrackToPlaylist.mutateAsync({
                    playlistId: newPlaylist.id,
                    trackId,
                    position: 1,
                    addedBy: userId,
                });
            }
            setNewPlaylistName("");
            setShowCreateForm(false);
            onClose();
        } catch (error) {
            console.error("Failed to create playlist:", error);
        }
    };

    const isTrackInPlaylist = (playlistId: string) => {
        const playlist = userPlaylists?.find((p) => p.id === playlistId);
        return playlist?.tracks?.some((playlistTrack: PlaylistTrack) => playlistTrack.track_id === trackId) || false;
    };

    return (
        <div className="absolute z-50 top-full right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
            {!showCreateForm ? (
                <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-300">Add to playlist</p>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            title="Create new playlist"
                            type="button"
                        >
                            <Plus size={14} className="inline-block mr-1" />
                            New
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                                <span className="ml-2 text-sm text-gray-400">Loading...</span>
                            </div>
                        ) : userPlaylists?.length ? (
                            <div className="space-y-1">
                                {userPlaylists.map((playlist) => {
                                    const isInPlaylist = isTrackInPlaylist(playlist.id);
                                    return (
                                        <button
                                            key={playlist.id}
                                            onClick={() => handleAddToPlaylist(playlist.id)}
                                            disabled={isInPlaylist || addTrackToPlaylist.isPending}
                                            className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-between group ${
                                                isInPlaylist
                                                    ? "text-green-400 bg-green-900/20 cursor-not-allowed"
                                                    : "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                                            }`}
                                            type="button"
                                        >
                                            <span className="truncate font-medium">{playlist.name}</span>
                                            {isInPlaylist ? (
                                                <Check size={16} className="ml-2 flex-shrink-0" />
                                            ) : (
                                                <Plus
                                                    size={14}
                                                    className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <Plus size={32} className="mx-auto mb-2 text-gray-600" />
                                <p className="text-sm text-gray-400 mb-3">No playlists yet</p>
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                                    type="button"
                                >
                                    Create Your First Playlist
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-300">Create Playlist</p>
                        <button
                            onClick={() => {
                                setShowCreateForm(false);
                                setNewPlaylistName("");
                            }}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                            type="button"
                        >
                            <Plus size={14} className="rotate-45" />
                        </button>
                    </div>
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
                    <div className="flex gap-2">
                        <button
                            onClick={handleCreatePlaylist}
                            disabled={!newPlaylistName.trim() || createPlaylist.isPending}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                            type="button"
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
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaylistButtonDropdown;
