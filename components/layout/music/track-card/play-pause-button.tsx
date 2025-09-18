import React from "react";
import { ITrackProps } from "@/lib/types";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { useAudioPlayerStore } from "@/stores/audio-player-store";

interface IPlayPauseButtonProps {
    track: ITrackProps;
    playlist?: ITrackProps[];
    locked: boolean;
}

const PlayPauseButton = (props: IPlayPauseButtonProps) => {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
    const { track, playlist, locked } = props;

    const {
        currentTrackId,
        isPlaying: contextIsPlaying,
        playTrack,
        pauseTrack,
        resume,
        isLoading: contextIsLoading,
    } = useAudioPlayerStore();

    const { user, loading: authLoading } = useSupabaseAuth();

    const isCurrentTrack = currentTrackId === track.id;
    const isPlaying = isCurrentTrack && contextIsPlaying;
    const loading = isCurrentTrack && contextIsLoading;
    const disabled = locked || loading || track.url === null || track.url === "";

    const handlePlayPause = async () => {
        if (locked) return;

        try {
            if (isCurrentTrack) {
                // Same track - toggle play/pause
                if (isPlaying) {
                    pauseTrack();
                } else {
                    resume();
                }
            } else {
                // Different track - play new track
                await playTrack(track, playlist);
            }
        } catch (error: any) {
            console.error(`Error with ${track.type} track:`, error);
        }
    };

    // FIXED: correct missing-track condition and render based on auth state
    if (track.url === null || track.url === "") {
        // If auth state is still loading, show disabled loading button
        if (authLoading) {
            return (
                <button disabled className="mt-4 w-full py-2 rounded-lg text-white font-semibold shadow bg-gray-700 cursor-not-allowed">
                    Checking auth...
                </button>
            );
        }

        // Signed-in users can go to upload; unsigned users are prompted to sign in
        if (user && user.email === ADMIN_EMAIL) {
            return (
                <button
                    className="mt-4 w-full py-2 rounded-lg text-white font-semibold shadow bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400"
                    onClick={() => {
                        // minimal navigation; replace with router push if desired
                        window.location.href = `/dashboard/upload?trackId=${encodeURIComponent(track.id)}`;
                    }}
                >
                    Upload Missing Track
                </button>
            );
        }
    }
    return (
        <button
            disabled={disabled}
            className={`mt-4 w-full py-2 rounded-lg text-white font-semibold shadow transition ${
                !disabled
                    ? "bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-400 hover:to-purple-400"
                    : "bg-gray-700 cursor-not-allowed"
            }`}
            onClick={handlePlayPause}
        >
            {!locked ? (loading ? "Loading..." : isCurrentTrack && isPlaying ? "Pause" : "Play") : "Locked"}
        </button>
    );
};

export default PlayPauseButton;
