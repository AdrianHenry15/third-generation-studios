"use client";

import { useEffect, useState } from "react";
import TrackCard from "@/components/layout/music/track-card";
import TrackFilter from "@/components/layout/music/track-filter";
import { fetchSpotifyTracks, fetchGenre } from "@/lib/spotify";

const filterOptions = [
    { value: "default", label: "Default" },
    { value: "artist", label: "Artist" },
    { value: "genre", label: "Genre" },
    { value: "shortest", label: "Shortest" },
    { value: "longest", label: "Longest" },
    { value: "spotify", label: "Spotify" },
];

const dummyMusic = [
    {
        id: 1,
        title: "Midnight Drive",
        artist: "Anjin Iso",
        album: "Neon Nights",
        albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&q=80",
        source: "Supabase",
        duration: "3:42",
        year: 2023,
        genre: "Synthwave",
        locked: true, // free to play
    },
    {
        id: 2,
        title: "Electric Dreams",
        artist: "Anjin Iso",
        album: "Electric Avenue",
        albumArt: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
        source: "Supabase",
        duration: "4:10",
        year: 2022,
        genre: "Electronic",
        locked: false, // requires unlock
    },
    {
        id: 3,
        title: "Sunset Boulevard",
        artist: "Jafarri",
        album: "Golden Hour",
        albumArt: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80",
        source: "Supabase",
        duration: "3:55",
        year: 2021,
        genre: "Chillhop",
        locked: false,
    },
    {
        id: 4,
        title: "Starlit City",
        artist: "Belle Morie",
        album: "City Lights",
        albumArt: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&q=80",
        source: "Supabase",
        duration: "4:22",
        year: 2023,
        genre: "Pop",
        locked: true,
    },
];

export default function MusicPage() {
    const [unlocked, setUnlocked] = useState<number[]>([]);
    const [filter, setFilter] = useState<string>("default");
    const [spotifyTracks, setSpotifyTracks] = useState<any[]>([]);
    const [trackGenres, setTrackGenres] = useState<{ [trackId: string]: string }>({});

    useEffect(() => {
        fetchSpotifyTracks("Anjin Iso")
            .then(setSpotifyTracks)
            .catch(() => {});
    }, []);

    useEffect(() => {
        async function fetchAllGenres() {
            const genreCache: { [artistId: string]: string } = {};
            const updates: { [trackId: string]: string } = {};
            for (const track of spotifyTracks) {
                const artist = track.artists?.[0];
                if (artist && artist.id) {
                    if (!genreCache[artist.id]) {
                        const genres = await fetchGenre(artist.id);
                        genreCache[artist.id] = genres[0] || "-";
                    }
                    updates[track.id] = genreCache[artist.id];
                } else {
                    updates[track.id] = "-";
                }
            }
            setTrackGenres(updates);
        }
        if (spotifyTracks.length > 0) fetchAllGenres();
    }, [spotifyTracks]);

    // Map Spotify tracks to TrackCard format and filter for Anjin Iso only
    const mappedSpotifyTracks = spotifyTracks
        .filter((track: any) => track.artists?.some((a: any) => a.name === "Anjin Iso"))
        .map((track: any, idx: number) => ({
            id: 1000 + idx,
            title: track.name,
            artist: track.artists?.map((a: any) => a.name).join(", ") || "",
            album: track.album?.name || "",
            albumArt: track.album?.images?.[0]?.url || "",
            source: "Spotify",
            duration: `${Math.floor((track.duration_ms || 0) / 60000)}:${(((track.duration_ms || 0) % 60000) / 1000).toFixed(0).padStart(2, "0")}`,
            year: track.album?.release_date?.slice(0, 4) || "",
            genre: trackGenres[track.id] || "-",
            locked: false,
        }));

    // Combine dummyMusic and filtered Spotify tracks
    let allTracks = [...dummyMusic, ...mappedSpotifyTracks];

    // Filter to only show tracks by Anjin Iso
    allTracks = allTracks.filter((track) => track.artist === "Anjin Iso");

    let filteredTracks = [...allTracks];
    if (filter === "artist") {
        filteredTracks.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (filter === "genre") {
        filteredTracks.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (filter === "shortest") {
        filteredTracks.sort((a, b) => {
            const aSec = parseInt(a.duration.split(":")[0]) * 60 + parseInt(a.duration.split(":")[1]);
            const bSec = parseInt(b.duration.split(":")[0]) * 60 + parseInt(b.duration.split(":")[1]);
            return aSec - bSec;
        });
    } else if (filter === "longest") {
        filteredTracks.sort((a, b) => {
            const aSec = parseInt(a.duration.split(":")[0]) * 60 + parseInt(a.duration.split(":")[1]);
            const bSec = parseInt(b.duration.split(":")[0]) * 60 + parseInt(b.duration.split(":")[1]);
            return bSec - aSec;
        });
    } else if (filter === "spotify") {
        filteredTracks = filteredTracks.filter((t) => t.source === "Spotify");
    } else if (filter === "supabase") {
        filteredTracks = filteredTracks.filter((t) => t.source === "Supabase");
    }

    const sortedTracks = [...filteredTracks].sort((a, b) => {
        if (a.locked === b.locked) return 0;
        return a.locked ? 1 : -1;
    });

    const handleUnlock = (trackId: number) => {
        setUnlocked((prev) => (prev.includes(trackId) ? prev : [...prev, trackId]));
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto mt-24">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Discover Music</h1>
                    <TrackFilter value={filter} onChange={setFilter} options={filterOptions} />
                </div>
                <p className="text-lg text-gray-400 mb-10">
                    A curated collection from Third Generation Studios. Stream your favorites, discover new vibes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sortedTracks.map((track) => (
                        <TrackCard key={track.id} {...track} onUnlock={handleUnlock} />
                    ))}
                </div>
            </div>
        </main>
    );
}
