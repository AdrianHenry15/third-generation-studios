"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ITrackProps } from "@/lib/types";
import { Heart, Info } from "lucide-react";
import CopyrightModal from "../modals/copyright-modal";
import RemixDisclaimerModal from "../modals/remix-disclaimer-modal";
import { playTrack, pauseTrack, resumeTrack, getCurrentPlayingTrack } from "@/lib/spotify/spotify-player";
import ExternalLinkButton from "../external-link-button";
import PlayPauseButton from "./play-pause-button";

interface ITrackCardProps extends ITrackProps {
    onUnlock?: (trackId: string) => void;
    accessToken?: string; // Add accessToken prop for Spotify SDK
}

const TrackCard = (props: ITrackCardProps) => {
    const {
        id,
        title,
        artists,
        album,
        type,
        duration,
        release_date,
        locked,
        plays,
        is_liked,
        copyright,
        onUnlock,
        spotify_id,
        accessToken,
    } = props;

    // Local state
    const [like, setlike] = useState(is_liked);
    const [loading, setLoading] = useState(false);
    const [isCurrentTrack, setIsCurrentTrack] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [noPreviewAvailable, setNoPreviewAvailable] = useState(false);

    // Check if this is the currently playing track
    useEffect(() => {
        const checkCurrentTrack = () => {
            const current = getCurrentPlayingTrack();
            setIsCurrentTrack(current.trackId === id);
            setIsPlaying(current.isPlaying && current.trackId === id);
        };

        checkCurrentTrack();
        const interval = setInterval(checkCurrentTrack, 1000); // Check every second
        return () => clearInterval(interval);
    }, [id]);

    const onPlayPauseClick = async () => {
        if (locked) return;

        setLoading(true);

        try {
            if (isCurrentTrack) {
                // Same track - toggle play/pause
                if (isPlaying) {
                    const result = await pauseTrack();
                    if (!result.success) {
                        console.error("Failed to pause track:", result.status);
                        alert("Failed to pause track");
                    }
                } else {
                    const result = await resumeTrack();
                    if (!result.success) {
                        console.error("Failed to resume track:", result.status);
                        alert("Failed to resume track");
                    }
                }
            } else {
                // Different track - play new track
                const result = await playTrack(
                    {
                        id,
                        title,
                        artists,
                        album,
                        type,
                        duration,
                        release_date,
                        locked,
                        plays,
                        is_liked: like,
                        copyright,
                        spotify_id,
                        url: props.url, // Make sure to pass the URL
                    },
                    accessToken,
                );

                // Handle different result cases
                if (!result.success) {
                    if (result.reason === "no-preview") {
                        setNoPreviewAvailable(true);
                        console.log("No preview available for this Spotify track");
                        // Don't show alert here, just update state
                        return;
                    } else {
                        alert(`Failed to play track: ${result.message || "Unknown error"}`);
                        return;
                    }
                }

                // Success - log player type for debugging
                console.log(`Playing track "${title}" with ${result.playerType} player`);
            }
        } catch (error: any) {
            console.error(`Error with ${type} track:`, error);
            if (error.message?.includes("No preview available")) {
                setNoPreviewAvailable(true);
            } else {
                alert(`Error playing track: ${error.message || error}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handlelikeToggle = () => {
        setlike((prev) => !prev);
        // You can add your API call or logic here
    };

    // Modal state for copyright info
    const [showCopyright, setShowCopyright] = useState(false);
    const [showRemixDisclaimer, setShowRemixDisclaimer] = useState(false);

    // Helper function to format duration from milliseconds to MM:SS
    const formatDuration = (durationMs: number): string => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div
            key={id}
            className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col"
        >
            {/* Image Overlay */}
            <div className="relative h-48 w-full">
                <Image
                    src={album.images[0]?.url || "/placeholder-album.png"}
                    alt={title}
                    fill
                    className={`object-cover group-hover:brightness-90 transition ${locked ? "blur-sm" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Like Heart Icon - Top Left */}
                <button
                    type="button"
                    aria-label={like ? "Unlike" : "Like"}
                    onClick={handlelikeToggle}
                    className="absolute top-3 left-3 text-2xl drop-shadow focus:outline-none"
                >
                    <Heart
                        size={20}
                        className={`transition-colors ${like ? "text-red-500 fill-red-500" : "text-white/80"}`}
                        fill={like ? "currentColor" : "none"}
                        strokeWidth={2.2}
                    />
                </button>

                {/* Remix Info Icon - Top Left (next to heart) */}
                {type === "Remix" && (
                    <button
                        type="button"
                        aria-label="Remix Information"
                        onClick={() => setShowRemixDisclaimer(true)}
                        className="absolute top-3 left-10 text-white/80 drop-shadow focus:outline-none hover:text-white transition-colors"
                    >
                        <Info size={20} />
                    </button>
                )}

                <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        type === "Spotify" ? "bg-green-500/90 text-white" : "bg-white/50 text-black"
                    }`}
                >
                    {type}
                </span>

                {locked && type === "Unreleased" && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center rounded-2xl">
                        <p className="text-white font-semibold mb-2">Locked</p>
                        <button
                            onClick={() => onUnlock && onUnlock(id)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-400 hover:to-pink-400 transition"
                        >
                            Unlock
                        </button>
                    </div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Track Info */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-1 truncate">{title}</h2>
                    <p className="text-gray-400 text-sm mb-1 truncate">
                        {artists && artists.length > 0 ? artists.map((artist) => artist.name).join(", ") : ""}
                    </p>
                    <p className="text-gray-300 text-xs mb-2 truncate font-medium">{album.name}</p>
                    <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2">
                        <span>{release_date}</span>
                        <span>•</span>
                        <span>{formatDuration(duration)}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 space-x-2 mb-2">
                        <span>Plays: {plays}</span>
                    </div>
                </div>
                {/* Play/Pause Button */}
                <PlayPauseButton
                    isPlaying={isPlaying}
                    isCurrentTrack={isCurrentTrack}
                    loading={loading}
                    locked={locked}
                    onPlayPauseClick={onPlayPauseClick}
                />

                {/* External Links */}
                {type === "Spotify" && spotify_id && (
                    <ExternalLinkButton spotify_id={spotify_id} noPreviewAvailable={noPreviewAvailable} linkType="spotify" />
                )}

                {type === "Spotify" && (
                    <ExternalLinkButton
                        albumName={album.name}
                        linkType="digital-stores"
                        link={`https://album.link/tgs-${album.name.toLowerCase()}`}
                    />
                )}

                {/* Show message for no preview */}
                {noPreviewAvailable && (
                    <p className="mt-2 text-xs text-gray-400 text-center">Preview not available - use links above for full track</p>
                )}
            </div>

            {/* Remix Disclaimer Modal */}
            {showRemixDisclaimer && <RemixDisclaimerModal setShowRemixDisclaimer={setShowRemixDisclaimer} />}

            {/* Copyright Modal */}
            {showCopyright && (
                <CopyrightModal setShowCopyright={setShowCopyright} copyright={copyright || "No copyright information available."} />
            )}
        </div>
    );
};

export default TrackCard;
