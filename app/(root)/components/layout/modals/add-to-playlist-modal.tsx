"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, X } from "lucide-react";
import {
    usePlaylistsByUser,
    useAddTrackToPlaylist,
    useCreatePlaylist,
    type PlaylistInsert,
    PlaylistTrack,
} from "@/hooks/music/use-playlists";
import { useModalStore } from "@/stores/modal-store";
import { useAuthStore } from "@/stores/auth-store";

interface AddToPlaylistModalProps {
    trackId: string;
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({ trackId }) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const { user } = useAuthStore();
    const closeModal = useModalStore((state) => state.closeModal);

    const { data: userPlaylists, isLoading } = usePlaylistsByUser(user?.id || "", !!user);
    const addTrackToPlaylist = useAddTrackToPlaylist();
    const createPlaylist = useCreatePlaylist();

    const handleAddToPlaylist = async (playlistId: string) => {
        if (!user?.id) return;
        try {
            const playlist = userPlaylists?.find((p) => p.id === playlistId);
            const nextPosition = (playlist?.tracks?.length || 0) + 1;
            await addTrackToPlaylist.mutateAsync({
                playlistId,
                trackId,
                position: nextPosition,
                addedBy: user.id,
            });
            closeModal();
        } catch (error) {
            console.error("Failed to add track to playlist:", error);
        }
    };

    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim() || !user?.id) return;
        try {
            const playlistData: PlaylistInsert = {
                name: newPlaylistName.trim(),
                created_by: user.id,
                description: null,
                is_public: false,
            };
            const newPlaylist = await createPlaylist.mutateAsync(playlistData);
            if (newPlaylist?.id) {
                await addTrackToPlaylist.mutateAsync({
                    playlistId: newPlaylist.id,
                    trackId,
                    position: 1,
                    addedBy: user.id,
                });
            }
            setNewPlaylistName("");
            setShowCreateForm(false);
            closeModal();
        } catch (error) {
            console.error("Failed to create playlist:", error);
        }
    };

    const isTrackInPlaylist = (playlistId: string) => {
        const playlist = userPlaylists?.find((p) => p.id === playlistId);
        return playlist?.tracks?.some((t: PlaylistTrack) => t.track_id === trackId) || false;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 p-6 rounded-xl shadow-xl max-w-md w-full border border-neutral-700 mx-4 relative"
            >
                {/* Close Button */}
                <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors">
                    <X size={20} />
                </button>

                {!showCreateForm ? (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">Add to Playlist</h2>
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                            >
                                <Plus size={14} className="mr-1" /> New
                            </button>
                        </div>

                        <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-4">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                                    <span className="ml-2 text-sm text-gray-400">Loading...</span>
                                </div>
                            ) : userPlaylists?.length ? (
                                userPlaylists.map((playlist) => {
                                    const isInPlaylist = isTrackInPlaylist(playlist.id);
                                    return (
                                        <button
                                            key={playlist.id}
                                            onClick={() => handleAddToPlaylist(playlist.id)}
                                            disabled={isInPlaylist || addTrackToPlaylist.isPending}
                                            className={`w-full text-left px-3 py-2.5 text-sm rounded-lg flex items-center justify-between transition-colors ${
                                                isInPlaylist
                                                    ? "text-green-400 bg-green-900/20 cursor-not-allowed"
                                                    : "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                                            }`}
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
                                })
                            ) : (
                                <p className="text-gray-400 text-center py-4">No playlists yet</p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-bold mb-4 text-white">Create Playlist</h2>
                        <input
                            type="text"
                            placeholder="Playlist name"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleCreatePlaylist();
                                if (e.key === "Escape") {
                                    setShowCreateForm(false);
                                    setNewPlaylistName("");
                                }
                            }}
                            className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-neutral-400"
                            autoFocus
                            disabled={createPlaylist.isPending}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewPlaylistName("");
                                }}
                                className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors disabled:opacity-50"
                                disabled={createPlaylist.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreatePlaylist}
                                disabled={!newPlaylistName.trim() || createPlaylist.isPending || !user?.id}
                                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createPlaylist.isPending ? "Creating..." : "Create & Add"}
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AddToPlaylistModal;
