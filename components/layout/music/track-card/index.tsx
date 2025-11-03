"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { useUpdateTrack } from "@/hooks/music/use-tracks";

interface ITrackCardProps {
    track: TrackWithRelations;
    playlist?: TrackWithRelations[];
    onUnlock?: (trackId: string) => void;
}

const TrackCard = ({ track, playlist = [], onUnlock }: ITrackCardProps) => {
    const { user } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
    const updateTrackMutation = useUpdateTrack();
    const [editingYoutube, setEditingYoutube] = useState(false);
    const [youtubeInput, setYoutubeInput] = useState("");

    const links = track.links as Record<string, string> | null;
    const youtube = links?.youtube || links?.youtube_url || links?.yt;

    const isArtist = user?.id === track.artist_id;

    // Compute album cover safely - moved outside the conditional
    const albumCover = useMemo(() => {
        const albumImages = track.album?.images ?? [];
        if (!albumImages.length) return "/earth-splash.jpg";
        const match = albumImages.find((img) => img.album_id === track.album_id);
        return match?.url || albumImages[0]?.url || "/earth-splash.jpg";
    }, [track]);

    const handleSaveYoutube = () => {
        updateTrackMutation.mutate({
            id: track.id,
            updates: {
                links: {
                    ...(links || {}),
                    youtube: youtubeInput,
                },
            },
        });

        setEditingYoutube(false);
    };

    // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     router.push("/sign-in");
    // };

    return (
        <div className="group bg-gray-900/80 rounded-2xl shadow-lg  hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col">
            {/* Album Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={albumCover}
                    alt={track.title || "Track Cover"}
                    fill
                    className={`object-cover rounded-t-lg group-hover:brightness-90 transition ${track.locked ? "blur-sm" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
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
                {(track.type === "Remix" || track.album?.type === "Remix") && (
                    <div>
                        {youtube && !editingYoutube && (
                            <Link
                                href={youtube}
                                target="_blank"
                                className="mt-3 flex flex-col w-full text-white bg-gradient-to-r from-red-500 to-red-800 hover:bg-red-950/50 rounded-lg py-2 text-center"
                            >
                                Play on YouTube
                            </Link>
                        )}

                        {/* If no link & user is the artist → show button to add */}
                        {!youtube && !editingYoutube && isArtist && (
                            <button onClick={() => setEditingYoutube(true)} className="text-colorful-gradient hover:underline">
                                Add YouTube Link
                            </button>
                        )}

                        {/* Inline editor */}
                        {editingYoutube && (
                            <div className="flex items-center gap-2">
                                <input
                                    value={youtubeInput}
                                    onChange={(e) => setYoutubeInput(e.target.value)}
                                    placeholder="Enter YouTube URL"
                                    className="px-2 py-1 text-sm rounded bg-gray-800 border border-gray-700 flex-1"
                                />
                                <button onClick={handleSaveYoutube} className="text-green-400 text-xs hover:text-green-300">
                                    Save
                                </button>
                                <button onClick={() => setEditingYoutube(false)} className="text-red-400 text-xs hover:text-red-300">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {!user && (
                    <Link
                        // onClick={handleLinkClick}
                        href="/sign-in"
                        className="mt-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-lg py-2 text-center hover:from-purple-600 hover:to-pink-600 transition"
                    >
                        Log in
                    </Link>
                )}
                {!user && <p className="mt-2 text-xs text-yellow-400 text-center">Log in to unlock full track playback and features</p>}
                {/* Add to Playlist Button */}
                {user && (
                    <div className={`mt-4 flex justify-end ${isArtist && pathname === "/solo-queue/studio/my-tracks" ? "mr-10" : ""}`}>
                        <AddToPlaylistButton trackId={track.id} />
                    </div>
                )}
                {isArtist && pathname === "/solo-queue/studio/my-tracks" && <DeleteButton track={track} />}
            </div>
        </div>
    );
};

export default TrackCard;
