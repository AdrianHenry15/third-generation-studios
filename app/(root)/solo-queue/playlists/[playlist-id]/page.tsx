"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Music, Trash2 } from "lucide-react";
import { usePlaylistByIdQuery, useRemoveTrackFromPlaylist, usePlaylistDelete } from "@/hooks/music/use-playlists";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { IPlaylistProps, IPlaylistTrackProps, ITrackProps } from "@/lib/types/music-types";
import { useParams, useRouter } from "next/navigation";

// Resolve a playlist cover from stored field or first track's album (typed)
function getPlaylistCoverUrl(pl: IPlaylistProps): string | undefined {
    // Prefer stored cover
    if (pl.cover_image_url) return pl.cover_image_url;

    // Fallback to first track's album image
    const first = pl.tracks?.[0];
    return first?.track?.album?.images?.[0]?.url;
}

function formatDuration(msOrSec?: number) {
    if (!msOrSec && msOrSec !== 0) return "-";
    // Heuristic: treat values > 10000 as ms, else seconds
    const totalSec = msOrSec > 10000 ? Math.floor(msOrSec / 1000) : Math.floor(msOrSec);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlaylistPage() {
    const params = useParams<{ "playlist-id": string | string[] }>();
    const raw = params["playlist-id"];
    const playlistId = decodeURIComponent(Array.isArray(raw) ? raw[0] : raw);

    const { data: playlist, isLoading, isError, refetch } = usePlaylistByIdQuery(playlistId);
    const { mutate: removeTrack, isPending: removing } = useRemoveTrackFromPlaylist();
    const router = useRouter();
    const { mutate: deletePlaylist, isPending: deleting } = usePlaylistDelete();

    // Resolve creator name from created_by (fallback when no join present)
    const [creatorName, setCreatorName] = useState<string | null>(null);
    useEffect(() => {
        if (playlist?.created_by) {
            (async () => {
                const { data } = await supabase.from("profiles").select("username").eq("id", playlist.created_by).single();
                if (data?.username) setCreatorName(data.username);
            })();
        }
    }, [playlist?.created_by]);

    const coverUrl = playlist ? getPlaylistCoverUrl(playlist) : undefined;
    const playlistTracks: IPlaylistTrackProps[] = playlist?.tracks ?? [];

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            {/* Loading */}
            {isLoading && (
                <div className="space-y-6">
                    <div className="flex items-end gap-6">
                        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-md bg-neutral-800 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-6 w-40 bg-neutral-800 rounded animate-pulse" />
                            <div className="h-10 w-72 bg-neutral-800 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="h-10 bg-neutral-900/50 border border-neutral-800 rounded animate-pulse" />
                    <div className="space-y-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-14 bg-neutral-900/50 border border-neutral-800 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            )}

            {/* Error */}
            {!isLoading && isError && (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <p className="text-neutral-300 mb-3">Failed to load playlist.</p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Content */}
            {!isLoading && !isError && playlist && (
                <>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-6">
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-md overflow-hidden bg-neutral-800 border border-neutral-800 flex items-center justify-center">
                            {coverUrl ? (
                                <Image
                                    src={coverUrl}
                                    alt={`${playlist.name} cover`}
                                    fill
                                    sizes="192px"
                                    className="object-cover"
                                    priority={false}
                                />
                            ) : (
                                <Music size={48} className="text-neutral-500" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase text-neutral-400">Playlist</p>
                            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{playlist.name}</h1>
                            <div className="mt-2 text-sm text-neutral-400">
                                <span>{playlistTracks.length} tracks</span>
                                {creatorName && <span className="mx-2">•</span>}
                                {creatorName && <span>By {creatorName}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-6 flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 text-white transition-colors">
                            <PlayCircle size={20} />
                            Play
                        </button>
                        <Link
                            href="/solo-queue/search"
                            className="px-3 py-2 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200"
                        >
                            Add tracks
                        </Link>
                        <button
                            onClick={() => {
                                if (!playlist?.id) return;
                                const ok = window.confirm("Delete this playlist? This cannot be undone.");
                                if (!ok) return;
                                deletePlaylist(playlist.id, {
                                    onSuccess: () => router.push("/solo-queue/playlists"),
                                });
                            }}
                            disabled={deleting}
                            className="px-3 py-2 rounded-full bg-red-600/90 hover:bg-red-600 text-white border border-red-700/40 disabled:opacity-60"
                        >
                            Delete
                        </button>
                    </div>

                    {/* Tracks */}
                    <div className="rounded-xl overflow-hidden border border-neutral-800">
                        <div className="grid grid-cols-[auto_1fr_auto] gap-3 px-4 py-2 text-xs uppercase tracking-wide text-neutral-400 bg-neutral-900/60">
                            <span>#</span>
                            <span>Title</span>
                            <span>Time</span>
                        </div>
                        {playlistTracks.length === 0 ? (
                            <div className="px-4 py-8 text-center text-neutral-400">No tracks in this playlist yet.</div>
                        ) : (
                            <ul className="divide-y divide-neutral-800">
                                {playlistTracks.map((pt, idx) => {
                                    const t: ITrackProps | undefined = pt.track;
                                    const title = t?.title ?? "Untitled";
                                    const artist = t?.artists?.[0]?.stage_name ?? "Unknown artist";
                                    const duration = t?.duration;

                                    return (
                                        <li
                                            key={pt.id}
                                            className="grid grid-cols-[auto_1fr_auto] gap-3 items-center px-4 py-3 hover:bg-neutral-900/50"
                                        >
                                            <div className="w-6 text-right text-neutral-400">{idx + 1}</div>
                                            <div className="min-w-0">
                                                <div className="text-sm text-white truncate">{title}</div>
                                                <div className="text-xs text-neutral-400 truncate">{artist}</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-neutral-400">{formatDuration(duration)}</span>
                                                <button
                                                    aria-label="Remove from playlist"
                                                    onClick={() => removeTrack({ playlistTrackId: pt.id })}
                                                    disabled={removing}
                                                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
