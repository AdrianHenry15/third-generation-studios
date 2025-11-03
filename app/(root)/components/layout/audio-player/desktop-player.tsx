"use client";

import React from "react";
import Image from "next/image";
import { SkipBack, SkipForward, Play, Pause, X } from "lucide-react";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import PlayerSeekBar from "./player-seek-bar";
import PlayerVolumeControl from "./player-volume-control";
import { useAlbumWithImages } from "@/hooks/music/use-albums";

interface DesktopPlayerProps {
    setExpanded: (val: boolean) => void;
}

const DesktopPlayer: React.FC<DesktopPlayerProps> = ({ setExpanded }) => {
    const {
        currentTrack,
        isPlaying,
        pauseTrack,
        resume,
        closePlayer,
        isLoading,
        canPlay,
        playTrack,
        currentTime,
        duration,
        seekTo,
        volume,
        setVolume,
        muted,
        toggleMute,
        playlist,
    } = useAudioPlayerStore();
    const { data: albumData, isLoading: albumLoading } = useAlbumWithImages(currentTrack!.album_id, !!currentTrack);

    if (!currentTrack) return null;

    const handlePlayPause = () => {
        if (isPlaying) pauseTrack();
        else {
            if (!canPlay) void playTrack(currentTrack, playlist);
            else resume();
        }
    };

    const albumCover = albumData?.album_images?.[0]?.url || "/placeholder-album.png";

    return (
        <div className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl bg-gray-900/95 rounded-2xl shadow-2xl items-center px-4 py-3 gap-4 border border-gray-800">
            {/* Album Art */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
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

            {/* Track Info */}
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white font-semibold truncate">{currentTrack.title}</span>
                <span className="text-gray-400 text-xs truncate">{currentTrack.artist?.stage_name || "Unknown Artist"}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-gray-800" aria-label="Previous">
                    <SkipBack size={20} className="text-white opacity-40" />
                </button>

                <button
                    className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    onClick={handlePlayPause}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="w-[22px] h-[22px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                        <Pause size={22} className="text-white" />
                    ) : (
                        <Play size={22} className="text-white" />
                    )}
                </button>

                <button className="p-1 rounded hover:bg-gray-800" aria-label="Next">
                    <SkipForward size={20} className="text-white opacity-40" />
                </button>
            </div>

            {/* Seek + Volume */}
            <PlayerSeekBar currentTime={currentTime} duration={duration} seekTo={seekTo} />
            <PlayerVolumeControl volume={volume} muted={muted} setVolume={setVolume} toggleMute={toggleMute} />

            {/* Close */}
            <button onClick={closePlayer} className="ml-2 p-1 rounded hover:bg-gray-800" aria-label="Close">
                <X size={18} className="text-gray-400" />
            </button>
        </div>
    );
};

export default DesktopPlayer;
