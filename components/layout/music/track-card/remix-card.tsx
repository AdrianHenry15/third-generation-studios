"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import ExternalLinkButton from "../external-link-button";
import PlayPauseButton from "./play-pause-button";
import TrackInfo from "./track-info";
import LockButton from "./lock-button";
import TypeLabel from "./type-label";
import LikeButton from "./like-button";
import { useAuthStore } from "@/stores/auth-store";
import { useProfile } from "@/hooks/public/use-profiles";
import AddToPlaylistButton from "./add-to-playlist-button";
import { useRemixByTrackIdQuery } from "@/hooks/music/use-remixes";

interface IRemixCardProps {
    track: any;
    playlist?: any[];
    onUnlock?: (trackId: string) => void;
}

/**
 * RemixCard
 * Specialized card for displaying remix tracks with original song information
 */
const RemixCard = ({ track, playlist, onUnlock }: IRemixCardProps) => {
    const { user } = useAuthStore();
    const { data: profile } = useProfile(user?.id || "", !!user?.id);
    const { data: remixData } = useRemixByTrackIdQuery(track.id);
    const router = useRouter();

    const albumImages = track.albums.album_images || [];
    const albumCover =
        albumImages.find((img: any) => img.album_id === track.albums.id)?.url || albumImages[0]?.url || "/placeholder-album.png";

    // Parse original artists from JSON - matches Supabase schema
    const originalArtists = React.useMemo(() => {
        if (!remixData?.original_artists) return [];
        try {
            return Array.isArray(remixData.original_artists)
                ? remixData.original_artists
                : JSON.parse(remixData.original_artists as string);
        } catch {
            return [];
        }
    }, [remixData?.original_artists]);

    return (
        <div className="group bg-gradient-to-br from-purple-900/90 to-gray-900/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col border border-purple-500/20">
            {/* Album Image with Remix Overlay */}
            <div className="relative h-48 w-full">
                <Image
                    src={albumCover}
                    alt={track.title}
                    fill
                    className={`object-cover group-hover:brightness-90 transition ${track.locked ? "blur-sm" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlays */}
                <LikeButton trackId={track.id} />
                <TypeLabel type={track.type} />
                {track.locked && <LockButton onUnlock={onUnlock} trackId={track.id} />}
            </div>

            {/* Track Info + Remix Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Main Track Info */}
                <TrackInfo track={track} />

                {/* Remix Information */}
                {remixData && (
                    <div className="mt-3 p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                        <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wide mb-2">Original Track</h4>

                        <div className="space-y-2">
                            {/* Original Song */}
                            <div>
                                <p className="text-sm font-medium text-white">{remixData.original_song}</p>
                            </div>

                            {/* Original Artists */}
                            {originalArtists.length > 0 && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Original by:</p>
                                    <p className="text-sm text-purple-200">{originalArtists.join(", ")}</p>
                                </div>
                            )}

                            {/* Original Track Link */}
                            {remixData.url && (
                                <div className="pt-2">
                                    <a
                                        href={remixData.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                        Listen to Original
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!track.url && (
                    <p className="mt-2 text-xs text-red-400 text-center">
                        Preview not available to play here — use links below for full track
                    </p>
                )}

                <PlayPauseButton track={track} playlist={playlist} locked={track.locked} />

                {/* Artist-only update button */}
                {profile?.role === "artist" && (
                    <button
                        onClick={() => router.push(`/solo-queue/studio/my-tracks/update/${track.id}`)}
                        className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Update Remix
                    </button>
                )}

                {/* Add to Playlist Button for authenticated users */}
                {user && <AddToPlaylistButton trackId={track.id} />}

                {/* Optional External Links */}
                {track.type === "Released" && track.albums.name && (
                    <ExternalLinkButton
                        albumName={track.albums.name}
                        link={`https://album.link/tgs-${track.albums.name.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                )}
            </div>
        </div>
    );
};

export default RemixCard;
