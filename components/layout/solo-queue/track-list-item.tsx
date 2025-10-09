"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useCallback } from "react";
import { PlayButton } from "./play-button";
import { LikeButton } from "./rp-like-button";
import type { Database } from "@/lib/types/supabase-types";
import { useAudioPlayerStore } from "@/stores/audio-player-store";

type Track = Database["public"]["Tables"]["tracks"]["Row"];

interface TrackListItemProps {
    track: Track;
    showPlayButton?: boolean;
    getTrackImage: (track: Track) => string;
    getArtistName: (track: Track) => string;
    formatDuration: (seconds: number) => string;
    onTrackPlay: (track: Track) => void;
}

export function TrackListItem({
    track,
    showPlayButton = false,
    getTrackImage,
    getArtistName,
    formatDuration,
    onTrackPlay,
}: TrackListItemProps) {
    const { currentTrackId } = useAudioPlayerStore();

    const handleClick = useCallback(() => {
        onTrackPlay(track);
    }, [track, onTrackPlay]);

    return (
        <div
            className={`group flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer ${
                showPlayButton ? "bg-neutral-800/20" : ""
            } ${currentTrackId === track.id ? "bg-neutral-700/50" : ""}`}
            onClick={handleClick}
        >
            <div className="relative">
                <div className="w-12 h-12 rounded relative overflow-hidden bg-neutral-800">
                    <Image
                        src={getTrackImage(track)}
                        alt={track.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                        quality={85}
                        unoptimized={getTrackImage(track).startsWith("data:")}
                    />
                </div>
                {showPlayButton && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded flex items-center justify-center text-white">
                        <PlayButton track={track} onPlay={onTrackPlay} />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p
                    className={`font-medium truncate transition-colors duration-200 ${
                        currentTrackId === track.id ? "text-green-400" : "text-white"
                    }`}
                >
                    {track.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">{getArtistName(track)}</p>
            </div>
            <div className="flex items-center gap-2">
                <LikeButton track={track} />
                <span className="text-neutral-400 text-sm w-16 text-right">{formatDuration(track.duration)}</span>
                <button className="p-2 text-neutral-500 hover:text-white transition-all duration-200 opacity-60 group-hover:opacity-100">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>
    );
}
