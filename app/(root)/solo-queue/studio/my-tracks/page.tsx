"use client";

import TrackCard from "@/components/layout/music/track-card";
import { useArtist } from "@/hooks/music/use-artists";
import { useTracksByArtist } from "@/hooks/music/use-tracks";
import { useAuthStore } from "@/stores/auth-store";

/**
 * MyTracksPage
 * Displays tracks uploaded by the currently logged-in artist
 */
export default function MyTracksPage() {
    const { user } = useAuthStore();
    const { data: artist } = useArtist(user?.id || "");
    const { data: tracks, isLoading, error } = useTracksByArtist(artist?.id || "");

    if (!user) return null;

    // Filter tracks to only include those by current user
    const myTracks = tracks?.filter((track) => track.artist_id === user.id) || [];

    // Build a playlist shape compatible with TrackWithRelationsResponse[]
    // Using `any` keeps this file independent of the type's import and avoids TS error.
    const playlist: any = myTracks.map((t: any) => ({
        ...t,
        artists: t?.artists ?? [],
        albums: t?.albums ?? [],
        track_credits: t?.track_credits ?? [],
        // cover possible naming variations safely
        remixes: t?.remixes ?? [],
        remixers: t?.remixers ?? [],
        remixests: t?.remixests ?? [],
    }));

    // -------------------------
    // Loading State
    // -------------------------
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-8">My Tracks</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-2xl h-80 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    // -------------------------
    // Error State
    // -------------------------
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-8">My Tracks</h1>
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                    <p className="text-red-400">Error loading tracks: {error.message}</p>
                </div>
            </div>
        );
    }

    // -------------------------
    // Empty State
    // -------------------------
    if (myTracks.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 pt-24 text-center">
                <h1 className="text-3xl font-bold text-white mb-8">My Tracks</h1>
                <p className="text-gray-400 text-lg">No tracks found</p>
                <p className="text-gray-500 text-sm mt-2">Start creating music to see your tracks here</p>
            </div>
        );
    }

    // -------------------------
    // Tracks Grid
    // -------------------------
    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-3xl font-bold text-white mb-8">My Tracks</h1>
            <p className="text-gray-400 mb-6">
                {myTracks.length} track{myTracks.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myTracks.map((track) => (
                    <TrackCard key={track.id} trackId={track.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}
