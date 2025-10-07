"use client";

import { motion, Variants } from "framer-motion";
import { Play, Heart, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ITrackProps } from "@/lib/types/music-types";
import { useTracksWithJoinsQuery } from "@/hooks/music/use-tracks";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function SoloQHomePage() {
    const { data: tracks, isLoading, error } = useTracksWithJoinsQuery();
    const [displayedTracks, setDisplayedTracks] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const tracksPerPage = 20;

    // Get recently played tracks (for now, just the first 3)
    const recentlyPlayed = tracks?.slice(0, 3) || [];

    // Initialize displayed tracks and set up infinite scroll
    useEffect(() => {
        if (tracks && tracks.length > 0) {
            const initialTracks = tracks.slice(0, tracksPerPage);
            setDisplayedTracks(initialTracks);
            setHasMore(tracks.length > tracksPerPage);
        }
    }, [tracks]);

    // Load more tracks
    const loadMoreTracks = useCallback(() => {
        if (!tracks || !hasMore) return;

        const startIndex = currentPage * tracksPerPage;
        const endIndex = startIndex + tracksPerPage;
        const newTracks = tracks.slice(startIndex, endIndex);

        if (newTracks.length > 0) {
            setDisplayedTracks((prev) => [...prev, ...newTracks]);
            setCurrentPage((prev) => prev + 1);
            setHasMore(endIndex < tracks.length);
        } else {
            setHasMore(false);
        }
    }, [tracks, currentPage, hasMore]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
                loadMoreTracks();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadMoreTracks]);

    // Format duration from seconds to mm:ss
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Get album cover image
    const getTrackImage = (track: any) => {
        return track.album?.images?.[0]?.url || "/placeholder-album.png";
    };

    // Get artist names
    const getArtistNames = (track: any) => {
        if (track.artists && track.artists.length > 0) {
            return track.artists.map((artist: any) => artist.stage_name).join(", ");
        }
        return "Unknown Artist";
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pt-24 px-4">
            {/* Header */}
            <motion.header variants={itemVariants} className="space-y-2">
                <h1 className="text-4xl font-bold text-white">Welcome To Solo Queue</h1>
                <p className="text-neutral-400 text-lg">By Third Generation Studios</p>
            </motion.header>

            {/* Recently Played */}
            <motion.section variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Recently played</h2>
                    <button className="text-neutral-400 hover:text-white text-sm font-medium transition-colors">Show all</button>
                </div>

                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/20 animate-pulse">
                                <div className="w-12 h-12 bg-neutral-700 rounded"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
                                    <div className="h-3 bg-neutral-700 rounded w-1/4"></div>
                                </div>
                                <div className="h-3 bg-neutral-700 rounded w-12"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-center py-8">Failed to load tracks</div>
                ) : recentlyPlayed.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                        <div className="text-6xl mb-4">🎵</div>
                        <h3 className="text-xl font-semibold text-white">No tracks available yet</h3>
                        <p className="text-neutral-400 max-w-md mx-auto">
                            Looks like there are no tracks in your library. Start by exploring new music or uploading your own tracks to get
                            started!
                        </p>
                        <div className="flex gap-4 justify-center mt-6">
                            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                                Browse Music
                            </button>
                            <button className="px-6 py-2 border border-neutral-600 hover:border-neutral-500 text-white rounded-lg transition-colors">
                                Upload Track
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {recentlyPlayed.map((track: ITrackProps) => (
                            <div
                                key={track.id}
                                className="group flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded relative overflow-hidden">
                                        <Image
                                            src={getTrackImage(track)}
                                            alt={track.title}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                            quality={95}
                                            priority={false}
                                            unoptimized={false}
                                        />
                                    </div>
                                    <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                        <Play size={16} fill="white" className="text-white" />
                                    </button>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{track.title}</p>
                                    <p className="text-neutral-400 text-sm truncate">{getArtistNames(track)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-green-400">
                                        <Heart size={16} />
                                    </button>
                                    <span className="text-neutral-400 text-sm w-16 text-right">{formatDuration(track.duration)}</span>
                                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.section>

            {/* Explore All Tracks */}
            <motion.section variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Explore</h2>
                    <p className="text-neutral-400 text-sm">{tracks?.length || 0} tracks available</p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="bg-neutral-800/20 rounded-lg p-4 animate-pulse">
                                <div className="w-full aspect-square bg-neutral-700 rounded-lg mb-4"></div>
                                <div className="h-4 bg-neutral-700 rounded mb-2"></div>
                                <div className="h-3 bg-neutral-700 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-center py-8">Failed to load tracks</div>
                ) : displayedTracks.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                        <div className="text-6xl mb-4">🎵</div>
                        <h3 className="text-xl font-semibold text-white">No tracks available</h3>
                        <p className="text-neutral-400 max-w-md mx-auto">
                            There are no tracks to explore right now. Check back later or upload some tracks to get started!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {displayedTracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    className="group bg-neutral-800/20 hover:bg-neutral-700/30 rounded-lg p-4 transition-all duration-200 cursor-pointer"
                                >
                                    <div className="relative mb-4">
                                        <div className="w-full aspect-square rounded-lg relative overflow-hidden bg-neutral-800">
                                            <Image
                                                src={getTrackImage(track)}
                                                alt={`${track.title} by ${getArtistNames(track)}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                                quality={95}
                                                priority={index < 10}
                                                unoptimized={false}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "/placeholder-album.png";
                                                }}
                                            />
                                        </div>
                                        <button className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 shadow-lg">
                                            <Play size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1 truncate">{track.title}</h3>
                                        <p className="text-neutral-400 text-sm line-clamp-2">{getArtistNames(track)}</p>
                                        <p className="text-neutral-500 text-xs mt-1">{formatDuration(track.duration)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Loading indicator for infinite scroll */}
                        {hasMore && (
                            <div className="flex justify-center py-8">
                                <div className="flex items-center gap-2 text-neutral-400">
                                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading more tracks...</span>
                                </div>
                            </div>
                        )}

                        {!hasMore && displayedTracks.length > 0 && (
                            <div className="text-center py-8 text-neutral-400">You've reached the end! 🎉</div>
                        )}
                    </>
                )}
            </motion.section>
        </motion.div>
    );
}
