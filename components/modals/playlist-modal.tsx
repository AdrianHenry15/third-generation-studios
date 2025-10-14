import React from "react";
import { motion } from "framer-motion";
import { useModalStore } from "@/stores/modal-store";
import { useAuthStore } from "@/stores/auth-store";
import { useCreatePlaylist } from "@/hooks/music/use-playlists";

const PlaylistModal = () => {
    // State
    const [playlistName, setPlaylistName] = React.useState("");
    // Stores
    const closeModal = useModalStore((state) => state.closeModal);
    const { user } = useAuthStore(); // Get current user

    // Queries / Mutations using new hooks
    const createPlaylistMutation = useCreatePlaylist();

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
                            closeModal();
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
                            closeModal();
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
    );
};

export default PlaylistModal;
