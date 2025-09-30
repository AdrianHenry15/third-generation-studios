"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IAlbumImageProps, ITrackProps } from "@/lib/solo-q-types/music-types";
import CopyrightModal from "../modals/copyright-modal";
import ExternalLinkButton from "../external-link-button";
import PlayPauseButton from "./play-pause-button";
import TrackInfo from "./track-info";
import LockButton from "./lock-button";
import RemixDisclaimer from "./remix-disclaimer";
import TypeLabel from "./type-label";
import LikeButton from "./like-button";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileByIdQuery } from "@/hooks/public/use-profiles";

interface ITrackCardProps {
    track: ITrackProps;
    album_images?: IAlbumImageProps[]; // make optional: prefer album.images
    onUnlock?: (trackId: string) => void;
    playlist?: ITrackProps[]; // Optional playlist for when playing from a collection
}

const TrackCard = (props: ITrackCardProps) => {
    const { user } = useAuthStore();
    const { data: profile } = useProfileByIdQuery(user!.id);
    // Destructure once for clarity
    const { track, album_images, playlist, onUnlock } = props;
    const { id, title, album, type, locked, copyright } = track;

    // Modal state for copyright info
    const [showCopyright, setShowCopyright] = useState(false);

    // Router for navigation
    const router = useRouter();

    // Prefer images attached to the album object; fallback to the album_images prop, then a placeholder
    const imagesSource: IAlbumImageProps[] = (album && (album as any).images) || album_images || [];
    const AlbumCover =
        imagesSource.find((img) => img.id === album?.id || (typeof img.id === "string" && img.id.startsWith(String(album?.id))))?.url ||
        imagesSource[0]?.url ||
        "/placeholder-album.png";

    return (
        <div
            key={id}
            className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col"
        >
            {/* Image Overlay */}
            <div className="relative h-48 w-full">
                <Image
                    src={AlbumCover}
                    alt={title}
                    fill
                    className={`object-cover group-hover:brightness-90 transition ${locked ? "blur-sm" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Like Heart Icon - Top Left */}
                <LikeButton trackId={id} />

                {/* Remix Info Icon - Top Left (next to heart) */}
                {type === "Remix" && <RemixDisclaimer />}

                <TypeLabel type={type} />

                {locked && type === "Unreleased" && <LockButton onUnlock={onUnlock} trackId={id} />}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Track Info */}
                <TrackInfo track={track} />

                {/* Show error directly under Play/Pause if no URL to play from (based on DB) */}
                {!track.url && (
                    <p className="mt-2 text-xs text-red-400 text-center">
                        Preview not available to play here — use links below for full track
                    </p>
                )}
                {/* Play/Pause Button */}
                <PlayPauseButton track={track} playlist={playlist} locked={locked} />

                {/* Update Button */}
                {profile!.role === "artist" && (
                    <button
                        onClick={() => router.push(`/solo-q/studio/my-tracks/${id}`)}
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

                {/* External Links */}
                {type === "Released" && album?.name && (
                    <ExternalLinkButton albumName={album.name} link={`https://album.link/tgs-${album.name.toLowerCase()}`} />
                )}
            </div>

            {/* Copyright Modal */}
            {showCopyright && (
                <CopyrightModal setShowCopyright={setShowCopyright} copyright={copyright || "No copyright information available."} />
            )}
        </div>
    );
};
export default TrackCard;
