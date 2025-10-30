"use client";

import React, { useMemo } from "react";
import TrackCard from "@/components/layout/music/track-card";
import { useAuthStore } from "@/stores/auth-store";
import { useLikedTrackIds, useTracksWithRelationsByIds } from "@/hooks/music/use-tracks";
import { useAlbumsWithImages } from "@/hooks/music/use-albums";
import { TrackWithRelations } from "@/lib/types/database";

export default function LikedSongsPage() {
    const { user } = useAuthStore();
    const { data: likedIds, isLoading: isLoadingLikedIds, error: likedIdsError } = useLikedTrackIds(user?.id || "", !!user?.id);

    // Memoize likedIds so it doesn't trigger repeated fetches unnecessarily
    const memoizedLikedIds = useMemo(() => (likedIds ? [...likedIds] : []), [likedIds]);

    // Fetch track data for liked IDs
    const tracksQueries = useTracksWithRelationsByIds(memoizedLikedIds, !!user && memoizedLikedIds.length > 0);
    const tracks = useMemo(() => tracksQueries.map((q) => q.data).filter((t): t is TrackWithRelations => !!t), [tracksQueries]);

    // Fetch all albums with images (like in /music page)
    const { data: albumsWithImages, isLoading: albumsLoading, error: albumsError } = useAlbumsWithImages();

    // Build album map for quick lookup
    const albumMap = useMemo(() => {
        if (!albumsWithImages?.length) return new Map();
        return new Map(albumsWithImages.map((album) => [album.id, { ...album, images: album.album_images || [] }]));
    }, [albumsWithImages]);

    // Compose tracks with album images
    const tracksWithAlbumImages = useMemo(() => {
        if (!tracks.length) return [];
        return tracks.map((track) => {
            const album = albumMap.get(track.album_id) || null;
            return {
                ...track,
                album,
            };
        });
    }, [tracks, albumMap]);

    // Loading and error states
    const isLoading = isLoadingLikedIds || tracksQueries.some((q) => q.isLoading) || albumsLoading;
    const error = likedIdsError || tracksQueries.find((q) => q.error)?.error || albumsError;

    if (!user) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-2">Liked Songs</h1>
                <p className="text-gray-300">Sign in to see your liked songs.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Liked Songs</h1>

            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden h-80 animate-pulse">
                            <div className="h-48 w-full bg-gray-800" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 w-2/3 bg-gray-800 rounded" />
                                <div className="h-3 w-1/2 bg-gray-800 rounded" />
                                <div className="h-10 w-full bg-gray-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-red-400 mb-4">Failed to load liked songs. Please try again.</p>}

            {!isLoading && (!memoizedLikedIds.length || tracksWithAlbumImages.length === 0) && (
                <p className="text-gray-300">You haven’t liked any songs yet.</p>
            )}

            {!isLoading && tracksWithAlbumImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tracksWithAlbumImages.map((track) => (
                        <TrackCard key={track.id} track={track} playlist={tracksWithAlbumImages} />
                    ))}
                </div>
            )}
        </div>
    );
}
