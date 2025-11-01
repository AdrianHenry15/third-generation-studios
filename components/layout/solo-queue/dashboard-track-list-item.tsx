"use client";

import Image from "next/image";
import { useCallback } from "react";
import { PlayButton } from "./play-button";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import LikeButton from "@/components/ui/buttons/like-button";
import AddToPlaylistButton from "@/components/ui/buttons/add-to-playlist/playlist-button";
import { TrackWithRelations } from "@/lib/types/database";

interface DashboardTrackListItemProps {
    track: TrackWithRelations;
    showPlayButton?: boolean;
    getTrackImage: (track: TrackWithRelations) => string;
    getArtistName: (track: TrackWithRelations) => string;
    formatDuration: (seconds: number) => string;
    onTrackPlay: (track: TrackWithRelations) => void;
}

export function DashboardTrackListItem({
    track,
    showPlayButton = false,
    getTrackImage,
    getArtistName,
    formatDuration,
    onTrackPlay,
}: DashboardTrackListItemProps) {
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
                        quality={85}
                        sizes="(max-width: 640px) 100vw, 200px"
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
            <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-sm w-16 text-right">{formatDuration(track.duration)}</span>
                <LikeButton trackId={track.id} />
                <div onClick={(e) => e.stopPropagation()}>
                    <AddToPlaylistButton iconSize={12} trackId={track.id} />
                </div>
            </div>
        </div>
    );
}
