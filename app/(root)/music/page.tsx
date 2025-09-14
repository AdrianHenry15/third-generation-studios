"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TrackFilter from "@/components/layout/music/track-filter";
import {
    fetchSpotifyTracks,
    fetchSpotifyGenre,
    setSpotifyUserToken,
    setSpotifyAuthModalHandler,
    redirectToSpotifyLogin,
} from "@/lib/spotify";
import TrackCard from "@/components/layout/music/track-card";
import SpotifyAuthModal from "@/components/layout/music/modals/spotify-auth-modal";
import { ITrackProps, ISpotifyTrackProps, AlbumTypes } from "@/lib/types";
import { dummyMusic } from "@/lib/constants";

const filterOptions = [
    { value: "default", label: "Default" },
    { value: "artist", label: "Artist" },
    { value: "genre", label: "Genre" },
    { value: "shortest", label: "Shortest" },
    { value: "longest", label: "Longest" },
    { value: "spotify", label: "Spotify" },
];

export default function MusicPage() {
    const searchParams = useSearchParams();
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("default");
    const [spotifyTracks, setSpotifyTracks] = useState<ISpotifyTrackProps[]>([]);
    const [trackGenres, setTrackGenres] = useState<{ [trackId: string]: string }>({});

    // Spotify Auth Modal State
    const [showSpotifyAuth, setShowSpotifyAuth] = useState(false);
    const [authTrackTitle, setAuthTrackTitle] = useState<string>();

    // Set up modal handler for spotify service
    useEffect(() => {
        setSpotifyAuthModalHandler((show: boolean, trackTitle?: string) => {
            setShowSpotifyAuth(show);
            setAuthTrackTitle(trackTitle);
        });
    }, []);

    // Handle Spotify authentication
    const handleSpotifyAuth = () => {
        setShowSpotifyAuth(false);
        redirectToSpotifyLogin();
    };

    // Handle Spotify token from OAuth callback
    useEffect(() => {
        const spotifyToken = searchParams.get("spotify_token");
        if (spotifyToken) {
            setSpotifyUserToken(spotifyToken);
            // Remove token from URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [searchParams]);

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
                        const genres = await fetchSpotifyGenre(artist.id);
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
    const mappedSpotifyTracks: ITrackProps[] = spotifyTracks
        .filter((track: ISpotifyTrackProps) => track.artists?.some((a) => a.name === "Anjin Iso"))
        .map((track: ISpotifyTrackProps, idx: number) => ({
            id: `spotify-${track.id}`,
            title: track.name,
            artists: track.artists.map((artist) => ({
                id: artist.id,
                name: artist.name,
            })),
            credits: { composer: "", producer: "" },
            url: track.preview_url || "",
            album: {
                id: track.album.id,
                type:
                    track.album.album_type === "single"
                        ? ("Single" as AlbumTypes)
                        : track.album.album_type === "album"
                          ? ("Album" as AlbumTypes)
                          : ("EP" as AlbumTypes),
                total_tracks: track.album.total_tracks,
                href: track.album.href,
                images: track.album.images.map((img, imgIdx) => ({
                    id: `${track.album.id}-${imgIdx}`,
                    url: img.url,
                    name: `${track.album.name} Cover`,
                })),
                name: track.album.name,
                release_date: track.album.release_date,
                artists: track.album.artists.map((artist) => ({
                    id: artist.id,
                    name: artist.name,
                })),
            },
            type: "Spotify" as const,
            duration: track.duration_ms,
            track_number: track.track_number,
            release_date: track.album.release_date.slice(0, 4),
            genre: trackGenres[track.id] || "-",
            locked: false,
            plays: 0,
            is_liked: false,
            spotify_id: track.id,
        }));

    // Combine dummyMusic and filtered Spotify tracks
    let allTracks: ITrackProps[] = [...dummyMusic, ...mappedSpotifyTracks];

    // Filter to only show tracks by Anjin Iso
    allTracks = allTracks.filter((track) => track.artists && track.artists[0]?.name === "Anjin Iso");

    let filteredTracks = [...allTracks];
    if (filter === "artist") {
        filteredTracks.sort((a, b) => {
            const aArtist = a.artists?.[0]?.name || "";
            const bArtist = b.artists?.[0]?.name || "";
            return aArtist.localeCompare(bArtist);
        });
    } else if (filter === "genre") {
        filteredTracks.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (filter === "shortest") {
        filteredTracks.sort((a, b) => a.duration - b.duration);
    } else if (filter === "longest") {
        filteredTracks.sort((a, b) => b.duration - a.duration);
    } else if (filter === "spotify") {
        filteredTracks = filteredTracks.filter((t) => t.type === "Spotify");
    } else if (filter === "supabase") {
        filteredTracks = filteredTracks.filter((t) => t.type === "Unreleased");
    }

    // Fix: sort by locked status after filtering
    const sortedTracks = [...filteredTracks].sort((a, b) => {
        if (a.locked === b.locked) return 0;
        return a.locked ? 1 : -1;
    });

    const handleUnlock = (trackId: string) => {
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
                        <TrackCard
                            key={track.id}
                            {...track}
                            onUnlock={(trackId) => {
                                if (!unlocked.includes(trackId)) handleUnlock(trackId);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Spotify Authentication Modal */}
            <SpotifyAuthModal
                isOpen={showSpotifyAuth}
                onClose={() => setShowSpotifyAuth(false)}
                onConfirm={handleSpotifyAuth}
                trackTitle={authTrackTitle}
            />
        </main>
    );
}
