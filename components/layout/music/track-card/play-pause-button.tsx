import React from "react";
import { useAudioPlayer } from "@/contexts/audio-player-context";
import { ITrackProps } from "@/lib/types";

interface IPlayPauseButtonProps {
    track: ITrackProps;
    playlist?: ITrackProps[];
    locked: boolean;
}

const PlayPauseButton = (props: IPlayPauseButtonProps) => {
    const { track, playlist, locked } = props;

    const { currentTrackId, isPlaying: contextIsPlaying, playTrack, pauseTrack, resume, isLoading: contextIsLoading } = useAudioPlayer();

    const isCurrentTrack = currentTrackId === track.id;
    const isPlaying = isCurrentTrack && contextIsPlaying;
    const loading = isCurrentTrack && contextIsLoading;

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

    return (
        <button
            disabled={locked || loading}
            className={`mt-4 w-full py-2 rounded-lg text-white font-semibold shadow transition ${
                !locked
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
