"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Music, Trash2, Pencil, Check, X, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { usePlaylist, useDeletePlaylist, useUpdatePlaylist, useRemoveTrackFromPlaylist, PlaylistTrack } from "@/hooks/music/use-playlists";
import { useArtist } from "@/hooks/music/use-artists";

// Resolve a playlist cover strictly from the first track's album image
function getPlaylistCoverUrl(playlist: any): string | undefined {
    console.log("Playlist data:", playlist); // Debug log

    // Check if we have any tracks
    if (!playlist?.tracks || playlist.tracks.length === 0) {
        console.log("No tracks found in playlist");
        return undefined;
    }

    const firstTrack = playlist.tracks[0];
    console.log("First track:", firstTrack); // Debug log

    // Handle different possible data structures
    let track = firstTrack;

    // If the track is nested under a 'track' property (playlist_tracks relation)
    if (firstTrack.track) {
        track = firstTrack.track;
        console.log("Using nested track:", track);
    }

    console.log("Final track object:", track); // Debug log

    // Try different possible paths for album images
    let coverUrl;

    // Path 1: Direct albums relation with album_images
    if (track?.albums?.album_images?.length > 0) {
        coverUrl = track.albums.album_images[0].url;
        console.log("Found cover via albums.album_images:", coverUrl);
    }
    // Path 2: Legacy album structure
    else if (track?.album?.images?.length > 0) {
        coverUrl = track.album.images[0].url;
        console.log("Found cover via album.images:", coverUrl);
    }
    // Path 3: Direct album_images array on track
    else if (track?.album_images?.length > 0) {
        coverUrl = track.album_images[0].url;
        console.log("Found cover via track.album_images:", coverUrl);
    }

    console.log("Final cover URL:", coverUrl); // Debug log
    return coverUrl;
}

function formatDuration(duration?: number) {
    if (!duration && duration !== 0) return "--:--";

    // convert milliseconds if the number is too large
    let seconds = duration;
    if (duration > 3600) {
        seconds = Math.floor(duration / 1000);
    }
    const totalSec = Math.floor(seconds);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// Component for individual track row with artist data
function TrackRow({
    playlistTrack,
    index,
    onRemove,
    isRemoving,
}: {
    playlistTrack: any;
    index: number;
    onRemove: () => void;
    isRemoving: boolean;
}) {
    const track = playlistTrack.track;
    const title = track?.title ?? "Untitled";
    const duration = track?.duration;

    // Fetch artist data using the artist hook
    const { data: artist, isLoading: artistLoading } = useArtist(track?.artist_id || "", !!track?.artist_id);

    const artistName = artistLoading ? "Loading..." : (artist?.stage_name ?? "Unknown artist");

    return (
        <li className="grid grid-cols-[auto_1fr_auto] gap-3 items-center px-4 py-3 hover:bg-neutral-900/50">
            <div className="w-6 text-right text-neutral-400">{index + 1}</div>
            <div className="min-w-0">
                <div className="text-sm text-white truncate">{title}</div>
                <div className="text-xs text-neutral-400 truncate">
                    {artistLoading ? <div className="h-3 w-24 bg-neutral-700 animate-pulse rounded" /> : artistName}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">{formatDuration(duration)}</span>
                <button
                    aria-label="Remove from playlist"
                    onClick={onRemove}
                    disabled={isRemoving}
                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
                >
                    {isRemoving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
            </div>
        </li>
    );
}

export default function PlaylistPage() {
    const params = useParams<{ "playlist-id": string | string[] }>();
    const raw = params["playlist-id"];
    const playlistId = decodeURIComponent(Array.isArray(raw) ? raw[0] : raw);

    const { data: playlist, isLoading, isError, refetch } = usePlaylist(playlistId);
    const { mutate: removeTrack, isPending: removing } = useRemoveTrackFromPlaylist();
    const router = useRouter();
    const { mutate: deletePlaylist, isPending: deleting } = useDeletePlaylist();
    const { mutate: updatePlaylist, isPending: renaming } = useUpdatePlaylist();

    // Inline rename state
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState("");
    const titleInputRef = useRef<HTMLInputElement | null>(null);

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

    // Sync draft when playlist loads/changes
    useEffect(() => {
        if (playlist?.name) setTitleDraft(playlist.name);
    }, [playlist?.name]);

    // Autofocus when entering edit mode
    useEffect(() => {
        if (isEditingTitle) {
            const t = setTimeout(() => titleInputRef.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [isEditingTitle]);

    const startEdit = () => setIsEditingTitle(true);
    const cancelEdit = () => {
        setTitleDraft(playlist?.name ?? "");
        setIsEditingTitle(false);
    };
    const saveTitle = () => {
        const next = titleDraft.trim();
        if (!playlist?.id) return;
        if (!next) return; // keep simple: do not allow empty
        if (next === playlist.name) {
            setIsEditingTitle(false);
            return;
        }
        updatePlaylist({ id: playlist.id, updates: { name: next } }, { onSuccess: () => setIsEditingTitle(false) });
    };
    const onTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveTitle();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            cancelEdit();
        }
    };

    const coverUrl = playlist ? getPlaylistCoverUrl(playlist) : undefined;
    const playlistTracks = playlist?.tracks ?? [];

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 pt-24 lg:pt-0">
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

                            {/* Title + inline edit controls */}
                            <div className="flex items-center gap-3 flex-wrap">
                                {isEditingTitle ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            ref={titleInputRef}
                                            value={titleDraft}
                                            onChange={(e) => setTitleDraft(e.target.value)}
                                            onKeyDown={onTitleKeyDown}
                                            disabled={renaming}
                                            className="bg-transparent text-3xl sm:text-5xl font-extrabold text-white leading-tight border-b border-transparent focus:border-neutral-600 focus:outline-none transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={saveTitle}
                                            disabled={renaming}
                                            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-green-600/90 hover:bg-green-600 text-white disabled:opacity-60"
                                            aria-label="Save playlist name"
                                            title="Save"
                                        >
                                            {renaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            disabled={renaming}
                                            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                                            aria-label="Cancel renaming"
                                            title="Cancel"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{playlist.name}</h1>
                                        <button
                                            type="button"
                                            onClick={startEdit}
                                            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                                            aria-label="Rename playlist"
                                            title="Rename"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

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
                            {deleting ? "Deleting..." : "Delete"}
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
                                {playlistTracks.map((playlistTrack: PlaylistTrack, idx: number) => (
                                    <TrackRow
                                        key={playlistTrack.id}
                                        playlistTrack={playlistTrack}
                                        index={idx}
                                        onRemove={() => removeTrack({ playlistTrackId: playlistTrack.id })}
                                        isRemoving={removing}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
