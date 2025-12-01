import { useUpdateTrack } from "@/hooks/music/use-tracks";
import { TrackWithRelations } from "@/lib/types/database";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import React, { useState } from "react";

const YoutubePlayButton = ({ track }: { track: TrackWithRelations }) => {
    // State
    const [editingYoutube, setEditingYoutube] = useState(false);
    const [youtubeInput, setYoutubeInput] = useState("");
    const [error, setError] = useState("");

    // Hooks
    const { user } = useAuthStore();
    const updateTrackMutation = useUpdateTrack();

    // Data
    const links = track.links as Record<string, string> | null;
    const youtube = links?.youtube || links?.youtube_url || links?.yt;
    const isArtist = user?.id === track.artist_id;

    // Regex for validating YouTube URLs
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)[\w-]{11}(&[\w?=]*)?$/;

    // Auto-format YouTube URL to include https:// if missing
    const formatYoutubeUrl = (url: string) => {
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };
    // Handlers
    const handleSaveYoutube = () => {
        const formattedUrl = formatYoutubeUrl(youtubeInput.trim());

        if (!youtubeRegex.test(formattedUrl)) {
            setError("Please enter a valid YouTube link.");
            return;
        }

        updateTrackMutation.mutate({
            id: track.id,
            updates: {
                links: {
                    ...(links || {}),
                    youtube: formattedUrl,
                },
            },
        });

        setEditingYoutube(false);
        setError("");
    };
    if (track.type !== "Remix" && track.album?.type !== "Remix") return null;
    return (
        <div>
            {youtube && !editingYoutube && (
                <Link
                    href={youtube}
                    target="_blank"
                    className="mt-3 flex flex-col w-full text-white bg-gradient-to-r from-red-500 to-red-800 hover:bg-red-950/50 rounded-lg py-2 text-center"
                >
                    Play on YouTube
                </Link>
            )}

            {/* If no link & user is the artist → show button to add */}
            {!youtube && !editingYoutube && isArtist && (
                <button
                    onClick={() => setEditingYoutube(true)}
                    className="mt-3 flex flex-col text-center w-full items-center justify-center text-white bg-gradient-to-r from-red-500 to-red-800 hover:bg-red-950/50 rounded-lg py-2"
                >
                    Add YouTube Link
                </button>
            )}

            {/* Inline editor */}
            {editingYoutube && (
                <div className="flex flex-col items-start mt-4 gap-2">
                    <input
                        value={youtubeInput}
                        onChange={(e) => setYoutubeInput(e.target.value)}
                        placeholder="Enter YouTube URL"
                        className="p-2 text-sm rounded bg-gray-800 border border-gray-700 flex-1"
                    />
                    {error && <span className="text-red-400 text-xs">{error}</span>}
                    <button onClick={handleSaveYoutube} className="text-green-400 text-xs hover:text-green-300">
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setEditingYoutube(false);
                            setError("");
                        }}
                        className="text-red-400 text-xs hover:text-red-300"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default YoutubePlayButton;
