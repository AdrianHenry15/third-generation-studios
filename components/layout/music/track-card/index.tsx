"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import PlayPauseButton from "./play-pause-button";
import TrackInfo from "./track-info";
import LockButton from "./lock-button";
import TypeLabel from "./type-label";
import LikeButton from "../../../ui/buttons/like-button";
import { useAuthStore } from "@/stores/auth-store";
import AddToPlaylistButton from "../../../ui/buttons/add-to-playlist/playlist-button";
import { TrackWithRelations } from "@/lib/types/database";
import DeleteButton from "./delete-button";
import Link from "next/link";
import TrackCreditsIcon from "./track-credits-icon";

interface ITrackCardProps {
    track: TrackWithRelations;
    playlist?: TrackWithRelations[];
    onUnlock?: (trackId: string) => void;
}

const TrackCard = ({ track, playlist = [], onUnlock }: ITrackCardProps) => {
    const { user } = useAuthStore();
    const pathname = usePathname();

    // Compute album cover safely - moved outside the conditional
    const albumCover = useMemo(() => {
        const albumImages = track.album?.images ?? [];
        if (!albumImages.length) return "/earth-splash.jpg";
        const match = albumImages.find((img) => img.album_id === track.album_id);
        return match?.url || albumImages[0]?.url || "/earth-splash.jpg";
    }, [track]);

    return (
        <div className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col">
            {/* Album Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={albumCover}
                    alt={track.title || "Track Cover"}
                    fill
                    className={`object-cover group-hover:brightness-90 transition ${track.locked ? "blur-sm" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlays */}
                <div className="absolute top-2 left-2">
                    <LikeButton trackId={track.id} />
                </div>
                <TypeLabel type={track.type || "Unknown"} />
                {track.locked && <LockButton onUnlock={onUnlock} trackId={track.id} />}
            </div>

            {/* Track Info + Actions */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <TrackInfo track={track} />

                {!track.url && (
                    <p className="mt-2 text-xs text-red-400 text-center">Preview not available — use links below for full track</p>
                )}

                <TrackCreditsIcon trackId={track.id} />

                <PlayPauseButton track={track} playlist={playlist} locked={track.locked} />
                {!user && (
                    <button className="mt-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-lg py-2 text-center hover:from-purple-600 hover:to-pink-600 transition">
                        <Link href="/sign-in">Log in</Link>
                    </button>
                )}
                {!user && <p className="mt-2 text-xs text-yellow-400 text-center">Log in to unlock full track playback and features</p>}

                {/* Add to Playlist Button */}
                {user && (
                    <div className="mt-4">
                        <AddToPlaylistButton trackId={track.id} />
                    </div>
                )}
                {user && user.id === track.artist_id && pathname === "/solo-queue/studio/my-tracks" && <DeleteButton track={track} />}
            </div>
        </div>
    );
};

export default TrackCard;
