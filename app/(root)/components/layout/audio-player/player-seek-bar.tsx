"use client";

import React from "react";

interface PlayerSeekBarProps {
    currentTime: number;
    duration: number;
    seekTo: (val: number) => void;
}

const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const PlayerSeekBar: React.FC<PlayerSeekBarProps> = ({ currentTime, duration, seekTo }) => {
    const seekValue = Math.min(currentTime, duration);
    const disableSeek = duration === 0;

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300 w-10 text-left">{formatTime(currentTime)}</span>
            <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={seekValue}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
                disabled={disableSeek}
                style={{
                    background: `linear-gradient(to right, rgba(168,85,247,1) 0%, rgba(168,85,247,1) ${
                        duration > 0 ? (seekValue / duration) * 100 : 0
                    }%, rgba(55,65,81,1) ${duration > 0 ? (seekValue / duration) * 100 : 0}%, rgba(55,65,81,1) 100%)`,
                }}
            />
            <span className="text-xs text-gray-300 w-10 text-right">{formatTime(duration)}</span>
        </div>
    );
};

export default PlayerSeekBar;
