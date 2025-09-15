import React from "react";

interface IPlayPauseButtonProps {
    isPlaying: boolean;
    isCurrentTrack: boolean;
    loading: boolean;
    locked: boolean;
    onPlayPauseClick: () => void;
}

const PlayPauseButton = (props: IPlayPauseButtonProps) => {
    const { isPlaying, isCurrentTrack, loading, locked, onPlayPauseClick } = props;

    return (
        <button
            disabled={locked || loading}
            className={`mt-4 w-full py-2 rounded-lg text-white font-semibold shadow transition ${
                !locked
                    ? "bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-400 hover:to-purple-400"
                    : "bg-gray-700 cursor-not-allowed"
            }`}
            onClick={onPlayPauseClick}
        >
            {!locked ? (loading ? "Loading..." : isCurrentTrack && isPlaying ? "⏸️ Pause" : "▶️ Play") : "🔒 Locked"}
        </button>
    );
};

export default PlayPauseButton;
