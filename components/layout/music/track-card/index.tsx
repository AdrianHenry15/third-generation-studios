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
import { useTrackWithRelations } from "@/hooks/music/use-tracks";
import type { Tables } from "@/lib/types/supabase-types";
import RemixCard from "./remix-card";
import { TrackWithRelations } from "@/lib/types/database";

// Type for track with relations that matches the actual hook response
export type TrackWithRelationsResponse = {
    album_id: string;
    artist_id: string;
    created_at: string;
    duration: number;
    genre: string | null;
    id: string;
    is_public: boolean | null;
    links: any | null;
    locked: boolean;
    lyrics: string | null;
    plays: number;
    release_date: string | null;
    title: string;
    type: string | null;
    updated_at: string;
    url: string;
    artists: {
        stage_name: string;
        profile_image_url: string | null;
    };
    albums: {
        id: string;
        name: string;
        type: "Single" | "EP" | "Album";
        album_images: Tables<"album_images">[];
    };
    track_credits: {
        id?: string;
        created_at?: string;
        updated_at?: string;
        track_id?: string;
        name: string;
        role: "composer" | "producer" | "lyricist" | "featured-artist" | "main-artist";
    }[];
    // ✅ Fix: make remixes flexible so it supports partial data
    remixes: {
        id?: string;
        track_id?: string;
        created_at?: string | null;
        updated_at?: string | null;
        url?: string | null;
        original_song: string;
        original_artists: any;
        additional_artists?: any;
    } | null;
};

interface ITrackCardProps {
    trackId: string;
    playlist?: TrackWithRelations[];
    onUnlock?: (trackId: string) => void;
}

/**
 * TrackCard
 * Displays a single track with image, play button, type label, and optional artist actions
 * Automatically renders RemixCard for remix tracks
 */
const TrackCard = ({ trackId, playlist, onUnlock }: ITrackCardProps) => {
    const { user } = useAuthStore();
    const { data: profile } = useProfile(user?.id || "", !!user?.id);

    const { data: track, isLoading, error } = useTrackWithRelations(trackId);
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    if (error || !track) {
        return (
            <div className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden h-80 flex items-center justify-center">
                <p className="text-red-400 text-sm">Failed to load track</p>
            </div>
        );
    }

    // ✅ Render RemixCard for remix tracks
    if (track.type === "Remix") {
        return <RemixCard track={track} playlist={playlist} onUnlock={onUnlock} />;
    }

    // ✅ Regular track card for non-remix tracks
    const albumImages = track.albums.album_images || [];
    const albumCover = albumImages.find((img) => img.album_id === track.albums.id)?.url || albumImages[0]?.url || "/placeholder-album.png";

    return (
        <div className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col">
            {/* Album Image */}
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
                <TypeLabel type={track.type!} />
                {track.locked && <LockButton onUnlock={onUnlock} trackId={track.id} />}
            </div>

            {/* Track Info + Actions */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <TrackInfo track={track} />

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
                        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Update Track
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

export default TrackCard;
