"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { useAlbumWithImages } from "@/hooks/music/use-albums";

interface MobileCollapsedBarProps {
    setExpanded: (val: boolean) => void;
}

const MobileCollapsedBar: React.FC<MobileCollapsedBarProps> = ({ setExpanded }) => {
    const { currentTrack, isPlaying, resume, pauseTrack, isLoading } = useAudioPlayerStore();
    const { data: albumData, isLoading: albumLoading } = useAlbumWithImages(currentTrack!.album_id, !!currentTrack);

    if (!currentTrack) return null;

    const handlePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPlaying) pauseTrack();
        else resume();
    };

    const albumCover = albumData?.album_images?.[0]?.url || "/placeholder-album.png";

    return (
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl">
            <div
                className="bg-white/6 backdrop-blur-md border border-white/6 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-3"
                role="button"
                aria-label="Open player"
                onClick={() => setExpanded(true)}
            >
                {/* Album */}
                <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
                    {albumLoading ? (
                        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <Image
                            src={albumCover}
                            alt={currentTrack.title}
                            fill
                            quality={85}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Title + Artist */}
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-white font-semibold truncate text-sm">{currentTrack.title}</span>
                    <span className="text-gray-300 text-xs truncate">{currentTrack.artist?.stage_name || "Unknown Artist"}</span>
                </div>

                {/* Play/Pause */}
                <button
                    className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    onClick={handlePlayPause}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                        <Pause size={18} className="text-white" />
                    ) : (
                        <Play size={18} className="text-white" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default MobileCollapsedBar;
