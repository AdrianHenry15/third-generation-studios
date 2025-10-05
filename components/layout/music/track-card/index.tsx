"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useTrackByIdWithJoinsQuery } from "@/hooks/music/use-tracks";
import ExternalLinkButton from "../external-link-button";
import PlayPauseButton from "./play-pause-button";
import TrackInfo from "./track-info";
import LockButton from "./lock-button";
import TypeLabel from "./type-label";
import LikeButton from "./like-button";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileByIdQuery } from "@/hooks/public/use-profiles";
import { IAlbumImageProps, ITrackProps } from "@/lib/types/music-types";

interface ITrackCardProps {
    trackId: string;
    playlist?: ITrackProps[];
    onUnlock?: (trackId: string) => void;
}

/**
 * TrackCard
 * Displays a single track with image, play button, type label, and optional artist actions
 */
const TrackCard = ({ trackId, playlist, onUnlock }: ITrackCardProps) => {
    const { user } = useAuthStore();
    const { data: profile } = useProfileByIdQuery(user!.id);

    const { data: track, isLoading, error } = useTrackByIdWithJoinsQuery(trackId);
    const router = useRouter();

    // -------------------------
    // Loading State
    // -------------------------
    if (isLoading) {
        return (
            <div className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    // -------------------------
    // Error State
    // -------------------------
    if (error || !track) {
        return (
            <div className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden h-80 flex items-center justify-center">
                <p className="text-red-400 text-sm">Failed to load track</p>
            </div>
        );
    }

    // -------------------------
    // Album Cover Selection
    // -------------------------
    const albumImages: IAlbumImageProps[] = track.album?.images || [];
    const albumCover = albumImages.find((img) => img.id === track.album?.id)?.url || albumImages[0]?.url || "/placeholder-album.png";

    // -------------------------
    // Render Track Card
    // -------------------------
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
                <TypeLabel type={track.type} />
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

                {/* Optional External Links */}
                {track.type === "Released" && track.album?.name && (
                    <ExternalLinkButton albumName={track.album.name} link={`https://album.link/tgs-${track.album.name.toLowerCase()}`} />
                )}
            </div>
        </div>
    );
};

export default TrackCard;
