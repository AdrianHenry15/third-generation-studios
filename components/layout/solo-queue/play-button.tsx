"use client";

import { Play, Pause } from "lucide-react";
import { useCallback } from "react";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import type { Database } from "@/lib/types/supabase-types";

type Track = Database["public"]["Tables"]["tracks"]["Row"];

interface PlayButtonProps {
    track: Track;
    size?: number;
    onPlay: (track: Track) => void;
}

export function PlayButton({ track, size = 16, onPlay }: PlayButtonProps) {
    const { currentTrackId, isPlaying } = useAudioPlayerStore();

    const isCurrentTrack = currentTrackId === track.id;
    const showPause = isCurrentTrack && isPlaying;

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onPlay(track);
        },
        [track, onPlay],
    );

    return (
        <button onClick={handleClick} className="transition-all duration-200 hover:scale-105">
            {showPause ? <Pause size={size} fill="currentColor" /> : <Play size={size} fill="currentColor" />}
        </button>
    );
}
