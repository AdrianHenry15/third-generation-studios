"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePublicTracks } from "@/hooks/music/use-tracks";
import { useAllArtists } from "@/hooks/music/use-artists";
import { useAlbumsWithImages } from "@/hooks/music/use-albums";
import type { Database } from "@/lib/types/supabase-types";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { ExploreTrackCard } from "@/components/layout/solo-queue/explore-track-card";
import { TrackListItem } from "@/components/layout/solo-queue/track-list-item";
import { TrackListSkeleton, TrackGridSkeleton } from "@/components/layout/solo-queue/loading-skeleton";
import { EmptyState } from "@/components/layout/solo-queue/empty-state";
import { TrackWithRelations } from "@/lib/types/database";

// Use proper Supabase types
// type Track = Database["public"]["Tables"]["tracks"]["Row"];

// Create a placeholder image as a data URL
const PLACEHOLDER_IMAGE =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik08MCA2MEg2MFY4MEg0MFYxMDBINjBWMTIwSDgwVjE0MEgxMDBWMTIwSDEyMFYxNDBIMTQwVjEyMEgxNjBWMTAwSDE0MFY4MEgxMjBWNjBIMTAwVjQwSDgwVjYwWiIgZmlsbD0iIzQwNDA0MCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSIjNTI1MjUyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iOCIgZmlsbD0iIzI2MjYyNiIvPgo8L3N2Zz4K";

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
    const { data: tracks, isLoading: tracksLoading, error: tracksError } = usePublicTracks();
    const { data: artists, isLoading: artistsLoading, error: artistsError } = useAllArtists();
    const { data: albumsWithImages, isLoading: albumsLoading, error: albumsError } = useAlbumsWithImages();

    // Audio player store
    const { playTrack, pauseTrack, currentTrackId, isPlaying } = useAudioPlayerStore();

    // Create maps for efficient lookups
    const artistMap = useMemo(() => {
        if (!artists?.length) return new Map();
        return new Map(artists.map((artist) => [artist.id, artist]));
    }, [artists]);

    const albumImageMap = useMemo(() => {
        if (!albumsWithImages?.length) return new Map();
        const imageMap = new Map();
        albumsWithImages.forEach((album) => {
            if (album.album_images?.length) {
                imageMap.set(album.id, album.album_images[0]);
            }
        });
        return imageMap;
    }, [albumsWithImages]);

    const [displayedTracks, setDisplayedTracks] = useState<TrackWithRelations[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const tracksPerPage = 20;

    // Consolidated loading and error states
    const isLoading = tracksLoading || artistsLoading || albumsLoading;
    const hasError = !!tracksError || artistsError || albumsError;
    const error = tracksError;

    // Memoized recently played tracks
    const recentlyPlayed = useMemo(() => {
        return tracks?.slice(0, 3) || [];
    }, [tracks]);

    // Initialize displayed tracks
    useEffect(() => {
        if (tracks?.length) {
            const initialTracks = tracks.slice(0, tracksPerPage);
            setDisplayedTracks(initialTracks);
            setHasMore(tracks.length > tracksPerPage);
            setCurrentPage(1);
        }
    }, [tracks]);

    // Optimized load more function
    const loadMoreTracks = useCallback(() => {
        if (!tracks?.length || !hasMore) return;

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

    // Infinite scroll handler with throttling
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
                    loadMoreTracks();
                }
            }, 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, [loadMoreTracks]);

    // Memoized utility functions
    const formatDuration = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }, []);

    const getTrackImage = useCallback(
        (track: TrackWithRelations) => {
            if (!track.album_id) return PLACEHOLDER_IMAGE;
            const image = albumImageMap.get(track.album_id);
            return image?.url && image.url.trim() !== "" ? image.url : PLACEHOLDER_IMAGE;
        },
        [albumImageMap],
    );

    const getArtistName = useCallback(
        (track: TrackWithRelations) => {
            if (!track.artist_id) return "Unknown Artist";
            const artist = artistMap.get(track.artist_id);
            return artist?.stage_name || "Unknown Artist";
        },
        [artistMap],
    );

    // Handle track play/pause
    const handleTrackPlay = useCallback(
        (track: TrackWithRelations) => {
            if (currentTrackId === track.id && isPlaying) {
                pauseTrack();
            } else {
                playTrack(track, tracks || []);
            }
        },
        [currentTrackId, isPlaying, pauseTrack, playTrack, tracks],
    );

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
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
                    <TrackListSkeleton count={3} />
                ) : hasError ? (
                    <div className="text-red-400 text-center py-8">Failed to load tracks: {error?.message || "Unknown error"}</div>
                ) : recentlyPlayed.length === 0 ? (
                    <EmptyState
                        title="No tracks available yet"
                        description="Looks like there are no tracks in your library. Start by exploring new music or uploading your own tracks to get started!"
                        actions={
                            <>
                                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                                    Browse Music
                                </button>
                                <button className="px-6 py-2 border border-neutral-600 hover:border-neutral-500 text-white rounded-lg transition-colors">
                                    Upload Track
                                </button>
                            </>
                        }
                    />
                ) : (
                    <div className="space-y-2">
                        {recentlyPlayed.map((track) => (
                            <TrackListItem
                                key={track.id}
                                track={track}
                                showPlayButton
                                getTrackImage={getTrackImage}
                                getArtistName={getArtistName}
                                formatDuration={formatDuration}
                                onTrackPlay={handleTrackPlay}
                            />
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
                    <TrackGridSkeleton count={10} />
                ) : hasError ? (
                    <div className="text-red-400 text-center py-8">Failed to load tracks: {error?.message || "Unknown error"}</div>
                ) : displayedTracks.length === 0 ? (
                    <EmptyState
                        title="No tracks available"
                        description="There are no tracks to explore right now. Check back later or upload some tracks to get started!"
                    />
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {displayedTracks.map((track, index) => (
                                <ExploreTrackCard
                                    key={track.id}
                                    track={track}
                                    index={index}
                                    getTrackImage={getTrackImage}
                                    getArtistName={getArtistName}
                                    formatDuration={formatDuration}
                                    onTrackPlay={handleTrackPlay}
                                />
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
