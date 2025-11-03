"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import Image from "next/image";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import PlayerSeekBar from "./player-seek-bar";
import PlayerVolumeControl from "./player-volume-control";
import { useAlbumWithImages } from "@/hooks/music/use-albums";
import LikeButton from "@/components/ui/buttons/like-button";
import AddToPlaylistButton from "@/components/ui/buttons/add-to-playlist/playlist-button";

interface MobileExpandedSheetProps {
    setExpanded: (val: boolean) => void;
}

const sheetVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 180, damping: 22, mass: 0.6 } },
    exit: { y: "100%", opacity: 0, transition: { type: "spring", stiffness: 240, damping: 26, mass: 0.7 } },
} as const;

const MobileExpandedSheet: React.FC<MobileExpandedSheetProps> = ({ setExpanded }) => {
    const { currentTrack, isPlaying, pauseTrack, resume, isLoading, currentTime, duration, seekTo, volume, setVolume, muted, toggleMute } =
        useAudioPlayerStore();
    const { data: albumData, isLoading: albumLoading } = useAlbumWithImages(currentTrack!.album_id, !!currentTrack);

    if (!currentTrack) return null;

    const albumCover = albumData?.album_images?.[0]?.url || "/placeholder-album.png";

    const handlePlayPause = () => {
        if (isPlaying) pauseTrack();
        else resume();
    };

    return (
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

            {/* Slide-Up Sheet */}
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                    if (info.offset.y > 90) setExpanded(false);
                }}
                className="fixed left-0 right-0 bottom-0 z-50"
                variants={sheetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="mx-auto w-[95vw] max-w-2xl bg-white/8 backdrop-blur-md border border-white/8 rounded-t-3xl shadow-2xl px-5 pb-safe pt-3">
                    {/* Drag handle + close */}
                    <div className="flex items-center justify-between relative pb-4">
                        <div className="mx-auto -mt-1 w-12 h-1.5 rounded-full bg-white/30" />
                        <button
                            onClick={() => setExpanded(false)}
                            aria-label="Close player"
                            className="p-2 right-0 top-0 absolute rounded-md -mr-1"
                        >
                            <X size={18} className="text-gray-200" />
                        </button>
                    </div>

                    {/* Artwork + Info */}
                    <div className="flex flex-col items-center gap-3 mt-3">
                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-xl">
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
                        <div className="text-center">
                            <div className="text-white font-semibold text-lg truncate">{currentTrack.title}</div>
                            <div className="text-gray-300 text-sm mt-1 truncate">{currentTrack.artist?.stage_name || "Unknown Artist"}</div>
                        </div>
                    </div>

                    {/* Seek */}
                    <div className="mt-4 px-1">
                        <PlayerSeekBar currentTime={currentTime} duration={duration} seekTo={seekTo} />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <button className="p-3 rounded-full hover:bg-white/6">
                            <SkipBack size={20} className="text-white opacity-40" />
                        </button>
                        <button
                            onClick={handlePlayPause}
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
                        <button className="p-3 rounded-full hover:bg-white/6">
                            <SkipForward size={20} className="text-white opacity-40" />
                        </button>
                    </div>

                    {/* Volume & Actions */}
                    <div className="mt-4 px-2 pb-6 flex items-center justify-between gap-4">
                        <PlayerVolumeControl volume={volume} muted={muted} setVolume={setVolume} toggleMute={toggleMute} />
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <LikeButton trackId={currentTrack.id} />
                            <AddToPlaylistButton trackId={currentTrack.id} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default MobileExpandedSheet;
