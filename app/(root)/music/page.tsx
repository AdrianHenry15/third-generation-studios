"use client";

import { useState, useEffect, useMemo } from "react";
import { usePublicTracks } from "@/hooks/music/use-tracks";
import { useAllArtists } from "@/hooks/music/use-artists";
import { useAlbumsWithImages } from "@/hooks/music/use-albums";
import TrackCard from "@/app/(root)/solo-queue/components/track-card";
import { TrackGridSkeleton } from "@/app/(root)/solo-queue/components/loading-skeleton";
import { EmptyState } from "@/app/(root)/solo-queue/components/empty-state";
import { BetaBanner } from "@/components/beta-banner";

export default function MusicPage() {
    // Fetch tracks, artists, and albums with images
    const { data: tracks, isLoading: tracksLoading, error: tracksError } = usePublicTracks();
    const { data: artists, isLoading: artistsLoading, error: artistsError } = useAllArtists();
    const { data: albumsWithImages, isLoading: albumsLoading, error: albumsError } = useAlbumsWithImages();

    // Create maps for efficient lookups
    const artistMap = useMemo(() => {
        if (!artists?.length) return new Map();
        return new Map(artists.map((artist) => [artist.id, artist]));
    }, [artists]);

    const albumMap = useMemo(() => {
        if (!albumsWithImages?.length) return new Map();
        return new Map(albumsWithImages.map((album) => [album.id, album]));
    }, [albumsWithImages]);

    // Compose tracks with relations
    const tracksWithRelations = useMemo(() => {
        if (!tracks?.length) return [];
        return tracks.map((track) => {
            const album = albumMap.get(track.album_id) || null;
            // Ensure album.images is always an array for TrackCard compatibility
            const albumWithImages = album ? { ...album, images: album.album_images || [] } : null;
            return {
                ...track,
                artist: artistMap.get(track.artist_id) || null,
                album: albumWithImages,
            };
        });
    }, [tracks, artistMap, albumMap]);

    // Search and filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    // Filtered and sorted tracks
    const filteredTracks = useMemo(() => {
        let filtered = tracksWithRelations;
        if (debouncedSearch) {
            const lower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(
                (track) =>
                    track.title?.toLowerCase().includes(lower) ||
                    track.artist?.stage_name?.toLowerCase().includes(lower) ||
                    track.album?.name?.toLowerCase().includes(lower),
            );
        }
        return filtered;
    }, [tracksWithRelations, debouncedSearch]);

    // Loading and error states
    const isLoading = tracksLoading || artistsLoading || albumsLoading;
    const hasError = !!tracksError || artistsError || albumsError;
    const error = tracksError || artistsError || albumsError;

    return (
        <div className="space-y-8 py-24 px-4 xl:px-24">
            <BetaBanner />
            <header className="space-y-2">
                <h1 className="text-4xl font-bold text-white">Music Library</h1>
                <p className="text-neutral-400 text-lg">Browse all tracks by Third Generation Studios</p>
            </header>

            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <input
                        type="text"
                        className="px-4 py-2 rounded-lg bg-neutral-800 text-white w-full max-w-md"
                        placeholder="Search by title, artist, or album..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="sm:ml-4 text-neutral-400 text-sm">{filteredTracks.length} tracks</span>
                </div>

                {isLoading ? (
                    <TrackGridSkeleton count={10} />
                ) : hasError ? (
                    <div className="text-red-400 text-center py-8">Failed to load tracks: {error?.message || "Unknown error"}</div>
                ) : filteredTracks.length === 0 ? (
                    <EmptyState title="No tracks found" description="Try adjusting your search or check back later for more music!" />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredTracks.map((track) => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
