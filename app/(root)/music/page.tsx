"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import TrackFilter from "@/components/layout/music/track-filter";
import { fetchSpotifyTracks, setSpotifyUserToken } from "@/lib/spotify/spotify-access";
import TrackCard from "@/components/layout/music/track-card";
import { ITrackProps, ISpotifyTrackProps, AlbumType } from "@/lib/types";
import { dummyMusic } from "@/lib/constants";

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
    const searchParams = useSearchParams();
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("default");
    const [spotifyTracks, setSpotifyTracks] = useState<ISpotifyTrackProps[]>([]);
    const [supabaseTracks, setSupabaseTracks] = useState<ITrackProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Handle Spotify token from OAuth callback
    useEffect(() => {
        const spotifyToken = searchParams.get("spotify_token");
        if (spotifyToken) {
            setSpotifyUserToken(spotifyToken);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [searchParams]);

    // Fetch tracks from all sources
    useEffect(() => {
        const fetchAllTracks = async () => {
            setIsLoading(true);
            try {
                // Fetch Spotify tracks
                const spotify = await fetchSpotifyTracks("Anjin Iso").catch(() => []);
                setSpotifyTracks(spotify);

                // TODO: Fetch Supabase tracks
                // const supabase = await fetchSupabaseTracks().catch(() => []);
                // setSupabaseTracks(supabase);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllTracks();
    }, []);

    // Convert a single Spotify track into a full ITrackProps object
    const convertSpotifyTrack = (track: ISpotifyTrackProps): ITrackProps => {
        const firstArtistId = track.artists?.[0]?.id || "";
        const albumId = track.album.id;

        const artists = track.artists.map((artist) => ({
            id: artist.id,
            stage_name: artist.name,
            bio: "",
            profile_image_url: "",
            verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }));

        const credits = track.artists.map((artist, idx) => ({
            id: `spotify-credit-${track.id}-${idx}`,
            track_id: `spotify-${track.id}`,
            artist_id: artist.id,
            role: "main-artist" as const,
            created_at: new Date().toISOString(),
        }));

        const albumImages = track.album.images.map((img, imgIdx) => ({
            id: `${albumId}-${imgIdx}`,
            album_id: albumId,
            url: img.url,
            name: `${track.album.name} Cover`,
            created_at: new Date().toISOString(),
        }));

        const albumObj = {
            id: albumId,
            artist_id: track.album.artists?.[0]?.id || "",
            name: track.album.name,
            type:
                track.album.album_type === "Single"
                    ? ("Single" as AlbumType)
                    : track.album.album_type === "Album"
                      ? ("Album" as AlbumType)
                      : ("EP" as AlbumType),
            release_date: track.album.release_date,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            images: albumImages,
        };

        const releaseYear = track.album.release_date?.slice(0, 4) || "";

        const result: ITrackProps = {
            id: `spotify-${track.id}`,
            album_id: albumId,
            artist_id: firstArtistId,
            title: track.name,
            artists,
            credits,
            url: track.preview_url || "",
            album: albumObj,
            type: "Released",
            duration: track.duration_ms,
            release_date: releaseYear,
            genre: "Unknown",
            locked: false,
            plays: 0,
            is_liked: false,
            spotify_id: track.id,
            // optional fields left undefined (copyright, lyrics)
            track_number: track.track_number,
        } as unknown as ITrackProps; // small cast only for extra fields mismatch (track_number may not be in ITrackProps in some definitions)

        return result;
    };

    // Memoize mapped Spotify tracks so conversion only runs when spotifyTracks changes
    const mappedSpotifyTracks = useMemo(() => {
        if (!spotifyTracks || spotifyTracks.length === 0) return [] as ITrackProps[];
        return spotifyTracks.filter((t) => t.artists?.some((a) => a.name === "Anjin Iso")).map(convertSpotifyTrack);
    }, [spotifyTracks]);

    // Combine all track sources
    const getAllTracks = (): ITrackProps[] => {
        const dummyTracks = dummyMusic.filter((track) => track.artists && track.artists[0]?.stage_name === "Anjin Iso");
        const filteredSupabaseTracks = supabaseTracks.filter((track) => track.artists && track.artists[0]?.stage_name === "Anjin Iso");

        return [...dummyTracks, ...mappedSpotifyTracks, ...filteredSupabaseTracks];
    };

    // Apply filters to tracks
    const getFilteredTracks = (tracks: ITrackProps[]): ITrackProps[] => {
        let filtered = [...tracks];

        if (filter === "artist") {
            filtered.sort((a, b) => {
                const aArtist = a.artists?.[0]?.stage_name || "";
                const bArtist = b.artists?.[0]?.stage_name || "";
                return aArtist.localeCompare(bArtist);
            });
        } else if (filter === "genre") {
            filtered.sort((a, b) => a.genre.localeCompare(b.genre));
        } else if (filter === "shortest") {
            filtered.sort((a, b) => a.duration - b.duration);
        } else if (filter === "longest") {
            filtered.sort((a, b) => b.duration - a.duration);
        } else if (filter === "released") {
            filtered = filtered.filter((t) => t.type === "Released");
        } else if (filter === "unreleased") {
            filtered = filtered.filter((t) => t.type === "Unreleased" || t.type === "Released");
        }

        // Sort by locked status
        return filtered.sort((a, b) => {
            if (a.locked === b.locked) return 0;
            return a.locked ? 1 : -1;
        });
    };

    const allTracks = getAllTracks();
    const sortedTracks = getFilteredTracks(allTracks);

    const handleUnlock = (trackId: string) => {
        setUnlocked((prev) => (prev.includes(trackId) ? prev : [...prev, trackId]));
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto mt-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Loading Music...</h1>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    </div>
                </div>
            </main>
        );
    }

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
                            track={track}
                            album_images={track.album?.images || []}
                            onUnlock={(trackId) => {
                                if (!unlocked.includes(trackId)) handleUnlock(trackId);
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
