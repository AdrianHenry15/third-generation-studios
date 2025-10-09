"use client";

import Image from "next/image";
import { useCallback } from "react";
import { PlayButton } from "./play-button";
import type { Database } from "@/lib/types/supabase-types";
import { useAudioPlayerStore } from "@/stores/audio-player-store";

type Track = Database["public"]["Tables"]["tracks"]["Row"];

interface ExploreTrackCardProps {
    track: Track;
    index: number;
    getTrackImage: (track: Track) => string;
    getArtistName: (track: Track) => string;
    formatDuration: (seconds: number) => string;
    onTrackPlay: (track: Track) => void;
}

export function ExploreTrackCard({ track, index, getTrackImage, getArtistName, formatDuration, onTrackPlay }: ExploreTrackCardProps) {
    const { currentTrackId, isPlaying } = useAudioPlayerStore();

    const handleClick = useCallback(() => {
        onTrackPlay(track);
    }, [track, onTrackPlay]);

    return (
        <div
            className={`group bg-neutral-800/20 hover:bg-neutral-700/30 rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                currentTrackId === track.id ? "ring-2 ring-green-500/50 bg-neutral-700/40" : ""
            }`}
            onClick={handleClick}
        >
            <div className="relative mb-4">
                <div className="w-full aspect-square rounded-lg relative overflow-hidden bg-neutral-800">
                    <Image
                        src={getTrackImage(track)}
                        alt={`${track.title} by ${getArtistName(track)}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        quality={85}
                        priority={index < 10}
                        unoptimized={getTrackImage(track).startsWith("data:")}
                    />
                </div>
                <div
                    className={`absolute bottom-2 right-2 w-12 h-12 text-black rounded-full transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center ${
                        currentTrackId === track.id && isPlaying
                            ? "bg-green-400 opacity-100"
                            : "bg-green-500 hover:bg-green-400 opacity-0 group-hover:opacity-100"
                    }`}
                >
                    <PlayButton track={track} onPlay={onTrackPlay} />
                </div>
            </div>
            <div>
                <h3
                    className={`font-medium mb-1 truncate transition-colors duration-200 ${
                        currentTrackId === track.id ? "text-green-400" : "text-white"
                    }`}
                >
                    {track.title}
                </h3>
                <p className="text-neutral-400 text-sm line-clamp-2">{getArtistName(track)}</p>
                <p className="text-neutral-500 text-xs mt-1">{formatDuration(track.duration)}</p>
            </div>
        </div>
    );
}
