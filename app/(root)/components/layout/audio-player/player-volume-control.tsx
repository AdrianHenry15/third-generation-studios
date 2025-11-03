"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface PlayerVolumeControlProps {
    volume: number;
    muted: boolean;
    setVolume: (val: number) => void;
    toggleMute: () => void;
}

const PlayerVolumeControl: React.FC<PlayerVolumeControlProps> = ({ volume, muted, setVolume, toggleMute }) => {
    return (
        <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="p-2 rounded-md" aria-label={muted ? "Unmute" : "Mute"}>
                {muted || volume === 0 ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
            </button>
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-48 accent-purple-500"
            />
        </div>
    );
};

export default PlayerVolumeControl;
