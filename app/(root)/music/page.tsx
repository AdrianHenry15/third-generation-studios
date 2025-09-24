"use client";

import { useEffect, useState, useMemo } from "react";
import TrackFilter from "@/components/layout/music/track-filter";
import TrackCard from "@/components/layout/music/track-card";
import { useMusicQuery } from "@/hooks/music/use-music";
import { ITrackProps } from "@/lib/types";

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
    const { data: tracks = [], isLoading, error } = useMusicQuery("tracks", "tracks");

    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("default");
    const [searchTerm, setSearchTerm] = useState("");
    // debounce search to reduce recomputes and URL updates
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(t);
    }, [searchTerm]);
    const [showPlayableOnly, setShowPlayableOnly] = useState(false);

    // Memoized filtered and sorted tracks for optimal performance
    const sortedTracks = useMemo<ITrackProps[]>(() => {
        if (!tracks || tracks.length === 0) return [] as ITrackProps[];

        let filtered = (tracks as ITrackProps[]).filter((track) => {
            // Search filter
            if (debouncedSearch) {
                const searchLower = debouncedSearch.toLowerCase();
                const matchesSearch =
                    track.title?.toLowerCase().includes(searchLower) ||
                    (track.artists && track.artists.some((a) => a.stage_name?.toLowerCase().includes(searchLower))) ||
                    track.album?.name?.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Playable only filter (spotify_id or url)
            if (showPlayableOnly && !track.spotify_id && !track.url) {
                return false;
            }

            return true;
        });

        // Sorting
        switch (filter) {
            case "artist":
                return [...filtered].sort((a, b) => {
                    const aName = a.artists?.[0]?.stage_name || "";
                    const bName = b.artists?.[0]?.stage_name || "";
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
            default:
                return filtered;
        }
    }, [tracks, debouncedSearch, showPlayableOnly, filter]);

    // Memoized stats calculation for performance
    const stats = useMemo(() => {
        if (!tracks || tracks.length === 0) {
            return { total: 0, playable: 0, released: 0, unreleased: 0 };
        }

        const playable = (tracks as ITrackProps[]).filter((track) => track.spotify_id || track.url).length;
        const released = (tracks as ITrackProps[]).filter((track) => track.type === "Released").length;
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

    if (isLoading)
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto mt-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Loading Music...</h1>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                </div>
            </main>
        );

    if (error) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto mt-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Error Loading Music</h1>
                    <p className="text-gray-400 mb-4">Unable to load tracks. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700"
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
                            className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm"
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
                    <span>Unreleased: {stats.unreleased}</span>
                    <span>Released: {stats.released}</span>
                </p>

                <p className="text-lg text-gray-400 mb-10">
                    A curated collection from Third Generation Studios. Stream your favorites, discover new vibes.
                </p>

                {sortedTracks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-300">
                        <div className="text-2xl font-semibold mb-2">No tracks found</div>
                        <div className="text-gray-400 mb-4">Try adjusting your search or filters.</div>
                        <button onClick={resetFilters} className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700">
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {sortedTracks.map((track) => (
                            <TrackCard
                                key={track.id}
                                track={track}
                                album_images={track.album?.images || []}
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
