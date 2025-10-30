"use client";

import React from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { useAlbumWithImages } from "@/hooks/music/use-albums";
import { useArtist } from "@/hooks/music/use-artists";

const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
};

interface AudioPlayerProps {
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onPrev, onNext, hasPrev, hasNext }) => {
    const {
        currentTrack,
        showPlayer,
        isPlaying,
        pauseTrack,
        resume,
        closePlayer,
        currentTime,
        duration,
        seekTo,
        volume,
        setVolume,
        muted,
        toggleMute,
        isLoading,
        canPlay,
        playTrack,
    } = useAudioPlayerStore();

    // Fetch album data with images
    const { data: album, isLoading: albumLoading } = useAlbumWithImages(currentTrack?.album_id || "", !!currentTrack?.album_id);

    // Fetch artist data
    const { data: artist, isLoading: artistLoading } = useArtist(currentTrack?.artist_id || "", !!currentTrack?.artist_id);

    if (!showPlayer || !currentTrack) return null;

    const isSpotify = currentTrack.type === "Released";
    const disableSeek = isLoading || !canPlay;

    // Get album cover from the album images
    const albumCover = album?.album_images?.[0]?.url || "/placeholder-album.png";

    // Get artist name from the artist data
    const artistName = artist?.stage_name || "Unknown Artist";

    // Calculate smooth values for the seek bar
    const totalDuration = duration || 0;
    const currentPosition = currentTime || 0;
    const seekValue = Math.min(currentPosition, totalDuration);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl bg-gray-900/95 rounded-2xl shadow-2xl flex items-center px-4 py-3 gap-4 border border-gray-800">
            {/* Album Art */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                {albumLoading ? (
                    /* Loading placeholder */
                    <div className="w-full h-full bg-gray-700 animate-pulse rounded-lg" />
                ) : (
                    <Image
                        src={albumCover}
                        alt={currentTrack.title}
                        sizes="(max-width: 768px) 48px, 64px"
                        fill
                        className="object-cover"
                        onError={(e) => {
                            // Fallback to placeholder on error
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-album.png";
                        }}
                    />
                )}
            </div>

            {/* Track Info */}
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white font-semibold truncate">{currentTrack.title}</span>
                <span className="text-gray-400 text-xs truncate">
                    {artistLoading ? <div className="h-3 w-20 bg-gray-700 animate-pulse rounded" /> : artistName}
                </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-gray-800" aria-label="Previous" onClick={onPrev} disabled={!onPrev || !hasPrev}>
                    <SkipBack size={20} className={`text-white ${onPrev && hasPrev ? "" : "opacity-40"}`} />
                </button>

                <button
                    className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    onClick={() => {
                        if (isPlaying) {
                            pauseTrack();
                        } else {
                            if (!canPlay || isSpotify) {
                                void playTrack(currentTrack);
                            } else {
                                resume();
                            }
                        }
                    }}
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

                <button className="p-1 rounded hover:bg-gray-800" aria-label="Next" onClick={onNext} disabled={!onNext || !hasNext}>
                    <SkipForward size={20} className={`text-white ${onNext && hasNext ? "" : "opacity-40"}`} />
                </button>
            </div>

            {/* Seek Bar - Much Smoother */}
            <div className="flex items-center gap-2 w-40">
                <span className="text-xs text-gray-400">{formatTime(currentPosition)}</span>
                <input
                    type="range"
                    min={0}
                    max={totalDuration}
                    step={0.1} // Much finer steps for smoother scrubbing
                    value={seekValue}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                    disabled={disableSeek}
                    style={{
                        background: `linear-gradient(to right, 
                            #a855f7 0%, 
                            #a855f7 ${totalDuration > 0 ? (seekValue / totalDuration) * 100 : 0}%, 
                            #374151 ${totalDuration > 0 ? (seekValue / totalDuration) * 100 : 0}%, 
                            #374151 100%)`,
                    }}
                />
                <span className="text-xs text-gray-400">{formatTime(totalDuration)}</span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1 w-20">
                <button onClick={toggleMute} className="p-1" aria-label={muted ? "Unmute" : "Mute"}>
                    {muted || volume === 0 ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                </button>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-purple-500"
                />
            </div>

            {/* Close Button */}
            <button onClick={closePlayer} className="ml-2 p-1 rounded hover:bg-gray-800" aria-label="Close">
                <X size={18} className="text-gray-400" />
            </button>
        </div>
    );
};

export default AudioPlayer;
