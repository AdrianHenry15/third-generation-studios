"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TrackFilter from "@/components/layout/music/track-filter";
import { fetchSpotifyTracks, setSpotifyUserToken } from "@/lib/spotify/spotify-access";
import TrackCard from "@/components/layout/music/track-card";
import { ITrackProps, ISpotifyTrackProps, AlbumType } from "@/lib/types";
import { useTracks } from "@/hooks/music/use-tracks";
import { supabase } from "@/lib/supabase/client";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { useProfile } from "@/hooks/use-profiles";
import { syncSpotifyTracks } from "@/lib/spotify/sync-spotify";
import { useQueryClient } from "@tanstack/react-query";
import { useBulkUserTrackLikes } from "@/hooks/music/use-track-likes";

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
    const router = useRouter();
    const pathname = usePathname();
    const { profile } = useProfile();
    const queryClient = useQueryClient();
    const supabaseAuth = useSupabaseAuth();

    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("default");
    const [spotifyTracks, setSpotifyTracks] = useState<ISpotifyTrackProps[]>([]);
    const { data: supabaseTracks, isLoading: isSupabaseLoading } = useTracks("Anjin Iso");
    const [isSpotifyLoading, setIsSpotifyLoading] = useState(true);
    const enableSpotifySync = process.env.NEXT_PUBLIC_SYNC_SPOTIFY_TO_SUPABASE === "true";
    const hasSyncedSpotify = useRef(false);
    const [searchTerm, setSearchTerm] = useState("");
    // debounce search to reduce recomputes and URL updates
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(t);
    }, [searchTerm]);
    const [showPlayableOnly, setShowPlayableOnly] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Handle Spotify OAuth token
    useEffect(() => {
        const spotifyToken = searchParams.get("spotify_token");
        if (spotifyToken) {
            setSpotifyUserToken(spotifyToken);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [searchParams]);

    // Fetch Spotify tracks
    useEffect(() => {
        const fetchAllTracks = async () => {
            setIsSpotifyLoading(true);
            try {
                const spotify = await fetchSpotifyTracks("Anjin Iso").catch(() => []);
                setSpotifyTracks(spotify);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            } finally {
                setIsSpotifyLoading(false);
            }
        };
        fetchAllTracks();
    }, []);

    // Convert Spotify track to ITrackProps
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

        return {
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
            track_number: track.track_number,
        } as unknown as ITrackProps;
    };

    // Memoized mapped Spotify tracks
    const mappedSpotifyTracks = useMemo(() => {
        if (!spotifyTracks || spotifyTracks.length === 0) return [] as ITrackProps[];
        return spotifyTracks.filter((t) => t.artists?.some((a) => a.name === "Anjin Iso")).map(convertSpotifyTrack);
    }, [spotifyTracks]);

    // Combine all tracks
    const allTracks = useMemo(() => {
        const filteredSupabaseTracks = (supabaseTracks ?? []).filter(
            (track) => track.artists && track.artists[0]?.stage_name === "Anjin Iso",
        );
        return [...mappedSpotifyTracks, ...filteredSupabaseTracks];
    }, [supabaseTracks, mappedSpotifyTracks]);

    // Apply filters (use debounced search term)
    const getFilteredTracks = (tracks: ITrackProps[]): ITrackProps[] => {
        let filtered = [...tracks];

        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase();
            filtered = filtered.filter((t) => {
                const title = t.title?.toLowerCase() || "";
                const album = t.album?.name?.toLowerCase() || "";
                const genre = t.genre?.toLowerCase() || "";
                const artists = (t.artists || []).map((a) => a.stage_name?.toLowerCase() || "").join(" ");
                return title.includes(q) || album.includes(q) || genre.includes(q) || artists.includes(q);
            });
        }

        if (showPlayableOnly) filtered = filtered.filter((t) => !!t.url);

        if (filter === "artist")
            filtered.sort((a, b) => (a.artists?.[0]?.stage_name || "").localeCompare(b.artists?.[0]?.stage_name || ""));
        else if (filter === "genre") filtered.sort((a, b) => a.genre.localeCompare(b.genre));
        else if (filter === "shortest") filtered.sort((a, b) => a.duration - b.duration);
        else if (filter === "longest") filtered.sort((a, b) => b.duration - a.duration);
        else if (filter === "released") filtered = filtered.filter((t) => t.type === "Released");
        else if (filter === "unreleased") filtered = filtered.filter((t) => t.type === "Unreleased" || t.type === "Released");

        return filtered.sort((a, b) => (a.locked === b.locked ? 0 : a.locked ? 1 : -1));
    };

    const sortedTracks = useMemo(() => getFilteredTracks(allTracks), [allTracks, filter, debouncedSearch, showPlayableOnly]);

    // Batch likes for visible tracks and seed per-track cache used by LikeButton hooks
    const visibleTrackIds = useMemo(() => sortedTracks.map((t) => t.id), [sortedTracks]);
    const { data: bulkLikes } = useBulkUserTrackLikes(visibleTrackIds);
    useEffect(() => {
        if (!bulkLikes?.user_id) return;
        // seed individual like queries so LikeButton doesn't hit the network
        for (const id of visibleTrackIds) {
            const liked = bulkLikes.likedIds.has(id);
            queryClient.setQueryData(["track-like", id], { user_id: bulkLikes.user_id, liked });
        }
    }, [bulkLikes, visibleTrackIds, queryClient]);

    // Counts
    const spotifyCount = mappedSpotifyTracks.length;
    const supabaseCount = (supabaseTracks ?? []).filter((t) => t.artists && t.artists[0]?.stage_name === "Anjin Iso").length;
    const playableCount = allTracks.filter((t) => !!t.url).length;

    // Unlock track
    const handleUnlock = (trackId: string) => setUnlocked((prev) => (prev.includes(trackId) ? prev : [...prev, trackId]));

    const isLoading = isSpotifyLoading || isSupabaseLoading;

    // Spotify → Supabase sync effect
    useEffect(() => {
        if (!enableSpotifySync || hasSyncedSpotify.current || !mappedSpotifyTracks.length) return;

        const run = async () => {
            hasSyncedSpotify.current = true;
            setIsSyncing(true);
            try {
                const artistMap = new Map<string, any>();
                const albumMap = new Map<string, any>();
                const credits: any[] = [];
                const tracks: any[] = [];

                for (const t of mappedSpotifyTracks) {
                    for (const a of t.artists || []) {
                        if (!a?.id) continue;
                        if (!artistMap.has(a.id)) artistMap.set(a.id, { spotify_id: a.id, stage_name: a.stage_name });
                        credits.push({ track_spotify_id: t.spotify_id, artist_spotify_id: a.id, role: "main-artist" });
                    }

                    const alb = t.album;
                    if (alb?.id && !albumMap.has(alb.id))
                        albumMap.set(alb.id, {
                            spotify_id: alb.id,
                            name: alb.name,
                            album_type: alb.type,
                            release_date: alb.release_date,
                            cover_url: alb.images?.[0]?.url || null,
                        });

                    tracks.push({
                        spotify_id: t.spotify_id,
                        title: t.title,
                        duration_ms: t.duration,
                        preview_url: t.url || null,
                        album_spotify_id: t.album?.id || null,
                        primary_artist_spotify_id: t.artists?.[0]?.id || null,
                        track_number: (t as any).track_number ?? null,
                        release_year: t.release_date || null,
                        genre: t.genre || null,
                    });
                }

                const artistRows = Array.from(artistMap.values());
                if (artistRows.length) await supabase.from("music.artists").upsert(artistRows, { onConflict: "spotify_id" });

                const albumRows = Array.from(albumMap.values());
                if (albumRows.length) await supabase.from("music.albums").upsert(albumRows, { onConflict: "spotify_id" });

                if (tracks.length) await supabase.from("music.tracks").upsert(tracks, { onConflict: "spotify_id" });

                if (credits.length)
                    await supabase.from("music.credits").upsert(credits, {
                        onConflict: "track_spotify_id,artist_spotify_id,role",
                    });
            } catch (e) {
                console.warn("spotify sync failed", e);
                hasSyncedSpotify.current = false;
            } finally {
                setIsSyncing(false);
            }
        };
        void run();
    }, [enableSpotifySync, mappedSpotifyTracks]);

    // URL → UI state sync
    useEffect(() => {
        const f = searchParams.get("filter");
        if (f) setFilter(f);
        const q = searchParams.get("q");
        if (q) setSearchTerm(q);
        const playable = searchParams.get("playable");
        if (playable === "1") setShowPlayableOnly(true);
    }, []);

    // UI state → URL sync (avoid redundant replaces)
    useEffect(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (filter && filter !== "default") params.set("filter", filter);
        else params.delete("filter");
        if (searchTerm) params.set("q", searchTerm);
        else params.delete("q");
        if (showPlayableOnly) params.set("playable", "1");
        else params.delete("playable");

        const next = `${pathname}?${params.toString()}`;
        const current = `${pathname}?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`;
        if (next !== current) {
            router.replace(next, { scroll: false });
        }
    }, [filter, searchTerm, showPlayableOnly]); // eslint-disable-line react-hooks/exhaustive-deps

    // Persist unlocked tracks
    useEffect(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("tgs_music_unlocked") : null;
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) setUnlocked(parsed);
            } catch {}
        }
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined") localStorage.setItem("tgs_music_unlocked", JSON.stringify(unlocked));
    }, [unlocked]);

    if (isLoading)
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto mt-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Loading Music...</h1>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                </div>
            </main>
        );

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
                        {enableSpotifySync && profile?.role === "artist" && (
                            <button
                                onClick={async () => await syncSpotifyTracks(spotifyTracks)}
                                disabled={isSyncing || !mappedSpotifyTracks.length}
                                className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Upsert Spotify tracks into Supabase"
                            >
                                {isSyncing ? "Syncing…" : "Sync Spotify"}
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setFilter("default");
                                setSearchTerm("");
                                setShowPlayableOnly(false);
                            }}
                            className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm"
                            title="Reset filters"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                        Total: {allTracks.length} • Playable: {playableCount}
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <span>Unreleased: {supabaseCount}</span>
                    <span>Released: {spotifyCount}</span>
                    {enableSpotifySync && (
                        <span className={`ml-auto ${isSyncing ? "text-indigo-300" : "text-green-300"}`}>
                            Spotify sync {isSyncing ? "in progress" : "ready"}
                        </span>
                    )}
                </p>

                <p className="text-lg text-gray-400 mb-10">
                    A curated collection from Third Generation Studios. Stream your favorites, discover new vibes.
                </p>

                {sortedTracks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-300">
                        <div className="text-2xl font-semibold mb-2">No tracks found</div>
                        <div className="text-gray-400 mb-4">Try adjusting your search or filters.</div>
                        <button
                            onClick={() => {
                                setFilter("default");
                                setSearchTerm("");
                                setShowPlayableOnly(false);
                            }}
                            className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700"
                        >
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
