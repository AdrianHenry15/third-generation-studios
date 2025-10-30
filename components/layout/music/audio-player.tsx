"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { useAlbumWithImages } from "@/hooks/music/use-albums";
import { useArtist } from "@/hooks/music/use-artists";
import { motion, AnimatePresence } from "framer-motion";

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

const sheetVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.18 } },
} as const;

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

    const [expanded, setExpanded] = useState(false);

    // Fetch album data with images & artist
    const { data: album, isLoading: albumLoading } = useAlbumWithImages(currentTrack?.album_id || "", !!currentTrack?.album_id);
    const { data: artist, isLoading: artistLoading } = useArtist(currentTrack?.artist_id || "", !!currentTrack?.artist_id);

    useEffect(() => {
        // collapse when track changes or player closed
        if (!showPlayer) setExpanded(false);
    }, [showPlayer]);

    useEffect(() => {
        // lock body scroll on mobile when expanded
        if (expanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [expanded]);

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

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            if (!canPlay || isSpotify) {
                void playTrack(currentTrack);
            } else {
                resume();
            }
        }
    };

    return (
        <>
            {/* ---------- Desktop player (md and up) - keep original layout ---------- */}
            <div className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl bg-gray-900/95 rounded-2xl shadow-2xl items-center px-4 py-3 gap-4 border border-gray-800">
                {/* Album Art */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    {albumLoading ? (
                        <div className="w-full h-full bg-gray-700 animate-pulse rounded-lg" />
                    ) : (
                        <Image
                            src={albumCover}
                            alt={currentTrack.title}
                            sizes="(max-width: 768px) 48px, 64px"
                            fill
                            className="object-cover"
                            onError={(e) => {
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

                    <button className="p-1 rounded hover:bg-gray-800" aria-label="Next" onClick={onNext} disabled={!onNext || !hasNext}>
                        <SkipForward size={20} className={`text-white ${onNext && hasNext ? "" : "opacity-40"}`} />
                    </button>
                </div>

                {/* Seek Bar */}
                <div className="flex items-center gap-2 w-40">
                    <span className="text-xs text-gray-400">{formatTime(currentPosition)}</span>
                    <input
                        type="range"
                        min={0}
                        max={totalDuration}
                        step={0.1}
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
                        {muted || volume === 0 ? (
                            <VolumeX size={18} className="text-white" />
                        ) : (
                            <Volume2 size={18} className="text-white" />
                        )}
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

                {/* Close */}
                <button onClick={closePlayer} className="ml-2 p-1 rounded hover:bg-gray-800" aria-label="Close">
                    <X size={18} className="text-gray-400" />
                </button>
            </div>

            {/* ---------- Mobile collapsed bar (sm & md hidden, mobile-first) ---------- */}
            <div className="md:hidden">
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl">
                    <div
                        className="bg-white/6 backdrop-blur-md border border-white/6 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-3"
                        role="button"
                        aria-label="Open player"
                    >
                        {/* Small Album Art */}
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
                            {albumLoading ? (
                                <div className="w-full h-full bg-gray-700 animate-pulse rounded-lg" />
                            ) : (
                                <Image
                                    src={albumCover}
                                    alt={currentTrack.title}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/placeholder-album.png";
                                    }}
                                />
                            )}
                        </div>

                        {/* Title + Artist (truncated) */}
                        <div className="flex flex-col min-w-0 flex-1" onClick={() => setExpanded(true)}>
                            <span className="text-white font-semibold truncate text-sm">{currentTrack.title}</span>
                            <span className="text-gray-300 text-xs truncate">{artistLoading ? "Loading..." : artistName}</span>
                        </div>

                        {/* Play / Pause big touch target */}
                        <div className="flex items-center gap-2">
                            <button
                                className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                                aria-label={isPlaying ? "Pause" : "Play"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayPause();
                                }}
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

                        {/* Mini expand chevron / open */}
                        <button className="ml-2 p-2 rounded hover:bg-white/4" aria-label="Expand player" onClick={() => setExpanded(true)}>
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ---------- Animated Slide-Up Sheet ---------- */}
                <AnimatePresence>
                    {expanded && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                className="fixed inset-0 z-40 bg-black/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.18 } }}
                                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                onClick={() => setExpanded(false)}
                                aria-hidden
                            />

                            <motion.div
                                className="fixed left-0 right-0 bottom-0 z-50"
                                variants={sheetVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                role="dialog"
                                aria-modal="true"
                            >
                                <div className="mx-auto w-[95vw] max-w-2xl">
                                    {/* Glassmorphism sheet */}
                                    <div className="bg-white/8 backdrop-blur-md border border-white/8 rounded-t-3xl shadow-2xl px-5 pb-safe pt-3">
                                        {/* Drag handle + close */}
                                        <div className="flex items-center justify-between">
                                            <div className="mx-auto -mt-1 w-12 h-1.5 rounded-full bg-white/30" />
                                            <button
                                                onClick={() => {
                                                    setExpanded(false);
                                                }}
                                                aria-label="Close player"
                                                className="p-2 rounded-md -mr-1"
                                            >
                                                <X size={18} className="text-gray-200" />
                                            </button>
                                        </div>

                                        {/* Artwork + Info */}
                                        <div className="flex flex-col items-center gap-3 mt-3">
                                            <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-xl">
                                                <Image
                                                    src={albumCover}
                                                    alt={currentTrack.title}
                                                    fill
                                                    className="object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = "/placeholder-album.png";
                                                    }}
                                                />
                                            </div>

                                            <div className="text-center">
                                                <div className="text-white font-semibold text-lg truncate">{currentTrack.title}</div>
                                                <div className="text-gray-300 text-sm mt-1 truncate">{artistName}</div>
                                            </div>
                                        </div>

                                        {/* Seek + Time */}
                                        <div className="mt-4 px-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-300 w-10 text-left">{formatTime(currentPosition)}</span>
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={totalDuration}
                                                    step={0.1}
                                                    value={seekValue}
                                                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                                                    className="w-full accent-purple-500 cursor-pointer"
                                                    disabled={disableSeek}
                                                    style={{
                                                        background: `linear-gradient(to right, 
                                      rgba(168,85,247,1) 0%, 
                                      rgba(168,85,247,1) ${totalDuration > 0 ? (seekValue / totalDuration) * 100 : 0}%, 
                                      rgba(55,65,81,1) ${totalDuration > 0 ? (seekValue / totalDuration) * 100 : 0}%, 
                                      rgba(55,65,81,1) 100%)`,
                                                    }}
                                                />
                                                <span className="text-xs text-gray-300 w-10 text-right">{formatTime(totalDuration)}</span>
                                            </div>
                                        </div>

                                        {/* Main Controls */}
                                        <div className="flex items-center justify-center gap-6 mt-4">
                                            <button
                                                onClick={onPrev}
                                                aria-label="Previous"
                                                disabled={!onPrev || !hasPrev}
                                                className="p-3 rounded-full hover:bg-white/6"
                                            >
                                                <SkipBack size={20} className={`text-white ${onPrev && hasPrev ? "" : "opacity-40"}`} />
                                            </button>

                                            <button
                                                onClick={handlePlayPause}
                                                aria-label={isPlaying ? "Pause" : "Play"}
                                                className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl"
                                            >
                                                {isLoading ? (
                                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : isPlaying ? (
                                                    <Pause size={20} className="text-white" />
                                                ) : (
                                                    <Play size={20} className="text-white" />
                                                )}
                                            </button>

                                            <button
                                                onClick={onNext}
                                                aria-label="Next"
                                                disabled={!onNext || !hasNext}
                                                className="p-3 rounded-full hover:bg-white/6"
                                            >
                                                <SkipForward size={20} className={`text-white ${onNext && hasNext ? "" : "opacity-40"}`} />
                                            </button>
                                        </div>

                                        {/* Volume + Extra Controls */}
                                        <div className="mt-4 px-2 pb-6">
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={toggleMute}
                                                        className="p-2 rounded-md"
                                                        aria-label={muted ? "Unmute" : "Mute"}
                                                    >
                                                        {muted || volume === 0 ? (
                                                            <VolumeX size={18} className="text-white" />
                                                        ) : (
                                                            <Volume2 size={18} className="text-white" />
                                                        )}
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

                                                <div className="flex items-center gap-2">
                                                    {/* Add any extra controls here (e.g., queue, like, share) */}
                                                    <button className="p-2 rounded-md hover:bg-white/6" aria-label="Like">
                                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 21s-6.716-4.35-9.06-6.603C-0.61 10.918 1.71 6 6 6c2.093 0 3.86 1.059 4.5 2.268C11.14 7.059 12.907 6 15 6c4.29 0 6.61 4.918 3.06 8.397C18.716 16.65 12 21 12 21z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default AudioPlayer;
