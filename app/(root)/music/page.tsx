"use client";

import { useEffect, useState, useMemo } from "react";
import TrackFilter from "@/components/layout/music/track-filter";
import TrackCard from "@/components/layout/music/track-card";
import { usePublicTracks } from "@/hooks/music/use-tracks";
import type { Tables } from "@/lib/types/supabase-types";
import { TrackWithRelations } from "@/lib/types/database";

// Track type from Supabase
type Track = Tables<"tracks">;

const filterOptions = [
    { value: "default", label: "Default" },
    { value: "artist", label: "Artist" },
    { value: "genre", label: "Genre" },
    { value: "shortest", label: "Shortest" },
    { value: "longest", label: "Longest" },
    { value: "released", label: "Released" },
    { value: "unreleased", label: "Unreleased" },
];

export default function MusicPage() {
    // Fetch tracks data using music hooks
    const { data: tracks, isLoading, error } = usePublicTracks();

    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("default");
    const [searchTerm, setSearchTerm] = useState("");

    // Debounce search to reduce recomputes and URL updates
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const [showPlayableOnly, setShowPlayableOnly] = useState(false);

    // Memoized filtered and sorted tracks for optimal performance
    const sortedTracks = useMemo<TrackWithRelations[]>(() => {
        if (!Array.isArray(tracks) || tracks.length === 0) return [];

        let filtered = (tracks as TrackWithRelations[]).filter((track) => {
            // Search filter
            if (debouncedSearch) {
                const searchLower = debouncedSearch.toLowerCase();
                const matchesSearch =
                    track.title?.toLowerCase().includes(searchLower) ||
                    track.artist?.stage_name?.toLowerCase().includes(searchLower) ||
                    track.album?.name?.toLowerCase().includes(searchLower) ||
                    track.genre?.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Playable only filter (has URL)
            if (showPlayableOnly && !track.url) {
                return false;
            }

            return true;
        });

        // Sorting
        switch (filter) {
            case "artist":
                return [...filtered].sort((a, b) => {
                    const aName = a.artist?.stage_name || "";
                    const bName = b.artist?.stage_name || "";
                    return aName.localeCompare(bName);
                });
            case "genre":
                return [...filtered].sort((a, b) => (a.genre || "").localeCompare(b.genre || ""));
            case "shortest":
                return [...filtered].sort((a, b) => (a.duration || 0) - (b.duration || 0));
            case "longest":
                return [...filtered].sort((a, b) => (b.duration || 0) - (a.duration || 0));
            case "released":
                return filtered.filter((track) => track.type === "Released");
            case "unreleased":
                return filtered.filter((track) => track.type !== "Released");
            case "remix":
                return filtered.filter((track) => track.type === "Remix");
            default:
                // Default sorting by plays (most popular first)
                return [...filtered].sort((a, b) => (b.plays || 0) - (a.plays || 0));
        }
    }, [tracks, debouncedSearch, showPlayableOnly, filter]);

    // Memoized stats calculation for performance
    const stats = useMemo(() => {
        if (!Array.isArray(tracks) || tracks.length === 0) {
            return { total: 0, playable: 0, released: 0, unreleased: 0 };
        }

        const typedTracks = tracks as TrackWithRelations[];
        const playable = typedTracks.filter((track) => track.url).length;
        const released = typedTracks.filter((track) => track.type === "Released").length;
        const unreleased = tracks.length - released;

        return {
            total: tracks.length,
            playable,
            released,
            unreleased,
        };
    }, [tracks]);

    const handleUnlock = (trackId: string) => {
        setUnlocked((prev) => [...prev, trackId]);
    };

    const resetFilters = () => {
        setFilter("default");
        setSearchTerm("");
        setShowPlayableOnly(false);
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto mt-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Loading Music...</h1>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto mt-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Error Loading Music</h1>
                    <p className="text-gray-400 mb-4">Unable to load tracks. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto mt-24">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Discover Music</h1>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                        <TrackFilter value={filter} onChange={setFilter} options={filterOptions} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 px-3 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search by title, artist, album..."
                            aria-label="Search tracks"
                        />
                        <label className="inline-flex items-center gap-2 text-gray-300 text-sm select-none">
                            <input
                                type="checkbox"
                                checked={showPlayableOnly}
                                onChange={(e) => setShowPlayableOnly(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                            />
                            Playable only
                        </label>

                        <button
                            onClick={resetFilters}
                            className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm hover:bg-gray-700 transition-colors"
                            title="Reset filters"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                        Total: {stats.total} • Playable: {stats.playable}
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <span>Released: {stats.released}</span>
                    <span>Unreleased: {stats.unreleased}</span>
                </p>

                <p className="text-lg text-gray-400 mb-10">
                    A curated collection from Third Generation Studios. Stream your favorites, discover new vibes.
                </p>

                {sortedTracks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-300">
                        <div className="text-2xl font-semibold mb-2">No tracks found</div>
                        <div className="text-gray-400 mb-4">Try adjusting your search or filters.</div>
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {sortedTracks.map((track) => (
                            <TrackCard
                                key={track.id}
                                trackId={track.id}
                                onUnlock={(trackId) => {
                                    if (!unlocked.includes(trackId)) handleUnlock(trackId);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
