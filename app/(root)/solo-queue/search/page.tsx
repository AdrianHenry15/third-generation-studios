"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Music, User, PlayCircle } from "lucide-react";
import {
    useSearchArtistsQuery,
    useSearchPlaylistsQuery,
    useSearchTracksQuery,
    useSearchTracksByArtistsQuery,
} from "@/hooks/music/use-search";

// -----------------------------
// Cover helpers
// -----------------------------
function PlaylistCover({ name, cover }: { name: string; cover?: string | null }) {
    return (
        <div className="relative aspect-square rounded-md overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center">
            {cover ? (
                <Image src={cover} alt={`${name} cover`} fill sizes="(max-width: 1024px) 33vw, 16vw" className="object-cover" />
            ) : (
                <Music size={36} className="text-neutral-400" />
            )}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full bg-green-600 text-white shadow-lg">
                    <PlayCircle size={18} />
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    // URL + debounce
    const router = useRouter();
    const sp = useSearchParams();
    const initialQ = sp.get("q") ?? "";
    const [q, setQ] = useState(initialQ);
    const [debouncedQ, setDebouncedQ] = useState(initialQ);
    useEffect(() => {
        const id = setTimeout(() => setDebouncedQ(q), 300);
        return () => clearTimeout(id);
    }, [q]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (debouncedQ) params.set("q", debouncedQ);
        else params.delete("q");
        const url = `/solo-queue/search${params.toString() ? `?${params.toString()}` : ""}`;
        router.replace(url);
    }, [debouncedQ, router]);

    // Queries (enabled when >= 2 chars)
    const enabled = debouncedQ.trim().length >= 2;

    const {
        data: playlists = [],
        isLoading: loadingPlaylists,
        isError: errorPlaylists,
        refetch: refetchPlaylists,
        error: playlistsError,
    } = useSearchPlaylistsQuery(debouncedQ.trim(), enabled);

    const {
        data: tracks = [],
        isLoading: loadingTracks,
        isError: errorTracks,
        refetch: refetchTracks,
        error: tracksError,
    } = useSearchTracksQuery(debouncedQ.trim(), enabled);

    const {
        data: artists = [],
        isLoading: loadingArtists,
        isError: errorArtists,
        refetch: refetchArtists,
        error: artistsError,
    } = useSearchArtistsQuery(debouncedQ.trim(), enabled);

    // NEW: Tracks by matching artists
    const {
        data: artistTracksRaw = [],
        isLoading: loadingArtistTracks,
        isError: errorArtistTracks,
        refetch: refetchArtistTracks,
        error: artistTracksError,
    } = useSearchTracksByArtistsQuery(debouncedQ.trim(), enabled);

    // Dedupe artist tracks from title/genre tracks by id
    const existingTrackIds = new Set(tracks.map((t) => t.id));
    const artistTracks = artistTracksRaw.filter((t) => !existingTrackIds.has(t.id));

    const isLoading = enabled && (loadingPlaylists || loadingTracks || loadingArtists || loadingArtistTracks);
    const hasError = errorPlaylists || errorTracks || errorArtists || errorArtistTracks;

    // Debug logs for page-level state
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.debug("[search:page]", {
            q,
            debouncedQ,
            enabled,
            loading: { playlists: loadingPlaylists, tracks: loadingTracks, artists: loadingArtists },
            errors: {
                playlists: playlistsError ? String((playlistsError as any)?.message ?? playlistsError) : null,
                tracks: tracksError ? String((tracksError as any)?.message ?? tracksError) : null,
                artists: artistsError ? String((artistsError as any)?.message ?? artistsError) : null,
            },
            counts: { playlists: playlists.length, tracks: tracks.length, artists: artists.length },
        });
    }, [
        q,
        debouncedQ,
        enabled,
        loadingPlaylists,
        loadingTracks,
        loadingArtists,
        playlistsError,
        tracksError,
        artistsError,
        playlists.length,
        tracks.length,
        artists.length,
    ]);

    // Helper to stringify error details in UI
    const errText = (e: unknown) => {
        if (!e) return null;
        const anyErr = e as any;
        return anyErr?.message || anyErr?.error_description || anyErr?.hint || JSON.stringify(anyErr);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 pt-24 lg:pt-6">
            {/* Search input */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search tracks, playlists, artists..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                        autoFocus
                    />
                </div>
                <p className="mt-2 text-xs text-neutral-500">Tip: start typing at least 2 characters to search</p>
            </div>

            {/* Initial state */}
            {!enabled && <div className="py-16 text-center text-neutral-400">Start typing to search tracks, playlists, and artists.</div>}

            {/* Loading */}
            {enabled && isLoading && (
                <div className="space-y-8">
                    {/* Skeleton grids */}
                    <div>
                        <div className="h-4 w-28 bg-neutral-800 rounded mb-4" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="rounded-xl p-4 border border-neutral-800 bg-neutral-900/50 animate-pulse">
                                    <div className="aspect-square rounded-md bg-neutral-800 mb-3" />
                                    <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-neutral-800 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Error */}
            {enabled && !isLoading && hasError && (
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <p className="text-neutral-300 mb-3">Something went wrong while searching.</p>
                    {/* Show detailed error messages for faster debugging */}
                    <div className="max-w-2xl text-left text-xs text-red-400 bg-red-950/20 border border-red-900/40 rounded p-3 mb-4 w-full">
                        {errorPlaylists && <p>Playlists: {errText(playlistsError)}</p>}
                        {errorTracks && <p>Tracks: {errText(tracksError)}</p>}
                        {errorArtists && <p>Artists: {errText(artistsError)}</p>}
                        {errorArtistTracks && <p>Tracks by artists: {errText(artistTracksError)}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                refetchPlaylists();
                                refetchTracks();
                                refetchArtists();
                                refetchArtistTracks();
                            }}
                            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {/* Results */}
            {enabled && !isLoading && !hasError && (
                <div className="space-y-10">
                    {/* Playlists */}
                    <div>
                        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Playlists</h2>
                        {playlists.length === 0 ? (
                            <p className="text-neutral-500 text-sm">No playlists found</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                                {playlists.map((pl) => (
                                    <Link
                                        key={pl.id}
                                        href={`/solo-queue/playlists/${pl.id}`}
                                        className="group rounded-xl p-4 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors"
                                    >
                                        <PlaylistCover name={pl.name} cover={pl.cover_image_url} />
                                        <div className="mt-3">
                                            <h3 className="text-sm font-semibold text-white truncate">{pl.name}</h3>
                                            <p className="text-xs text-neutral-400 truncate">
                                                {pl.track_count ? `${pl.track_count} tracks` : "Playlist"}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tracks (title/genre) */}
                    <div>
                        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tracks</h2>
                        {tracks.length === 0 ? (
                            <p className="text-neutral-500 text-sm">No tracks found</p>
                        ) : (
                            <ul className="divide-y divide-neutral-800 rounded-xl border border-neutral-800 overflow-hidden">
                                {tracks.map((t) => (
                                    <li key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-900/50">
                                        <div className="h-9 w-9 rounded bg-neutral-800 flex items-center justify-center text-neutral-400">
                                            <Music size={16} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-white truncate">{t.title}</p>
                                            <p className="text-xs text-neutral-500">Track</p>
                                        </div>
                                        <Link
                                            href={`/solo-queue/search?play=${t.id}`}
                                            className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 hover:bg-neutral-700"
                                        >
                                            Play
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Artists */}
                    <div>
                        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Artists</h2>
                        {artists.length === 0 ? (
                            <p className="text-neutral-500 text-sm">No artists found</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                                {artists.map((a) => (
                                    <Link
                                        key={a.id}
                                        href={`/solo-queue/profile/${a.id}`}
                                        className="group rounded-xl p-4 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors flex flex-col items-center text-center"
                                    >
                                        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center">
                                            {a.profile_image_url ? (
                                                <Image
                                                    src={a.profile_image_url}
                                                    alt={a.stage_name}
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <User size={28} className="text-neutral-400" />
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <h3 className="text-sm font-semibold text-white truncate max-w-[12rem]">{a.stage_name}</h3>
                                            {a.verified && <p className="text-xs text-green-500">Verified</p>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tracks by matching artists */}
                    <div>
                        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tracks by matching artists</h2>
                        {artistTracks.length === 0 ? (
                            <p className="text-neutral-500 text-sm">No tracks found for matching artists</p>
                        ) : (
                            <ul className="divide-y divide-neutral-800 rounded-xl border border-neutral-800 overflow-hidden">
                                {artistTracks.map((t) => (
                                    <li key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-900/50">
                                        <div className="h-9 w-9 rounded bg-neutral-800 flex items-center justify-center text-neutral-400">
                                            <Music size={16} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-white truncate">{t.title}</p>
                                            <p className="text-xs text-neutral-500">Track</p>
                                        </div>
                                        <Link
                                            href={`/solo-queue/search?play=${t.id}`}
                                            className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 hover:bg-neutral-700"
                                        >
                                            Play
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
