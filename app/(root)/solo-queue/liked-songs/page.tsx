"use client";

import React from "react";
import TrackCard from "@/components/layout/music/track-card";
import { useAuthStore } from "@/stores/auth-store";
import { useLikedTrackIds } from "@/hooks/music/use-tracks";

export default function LikedSongsPage() {
    const { user } = useAuthStore();
    const { data: likedIds, isLoading, error } = useLikedTrackIds(user?.id || "", !!user?.id);

    if (!user) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-2">Liked Songs</h1>
                <p className="text-gray-300">Sign in to see your liked songs.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
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

            {error && <p className="text-red-400">Failed to load liked songs. Please try again.</p>}

            {!isLoading && likedIds?.length === 0 && <p className="text-gray-300">You haven’t liked any songs yet.</p>}

            {!!likedIds?.length && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {likedIds.map((trackId) => (
                        <TrackCard key={trackId} trackId={trackId} />
                    ))}
                </div>
            )}
        </div>
    );
}
