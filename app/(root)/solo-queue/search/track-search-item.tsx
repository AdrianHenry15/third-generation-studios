import AddToPlaylistButton from "@/components/ui/buttons/add-to-playlist/playlist-button";
import LikeButton from "@/components/ui/buttons/like-button";
import { TrackWithRelations } from "@/lib/types/database";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import { Music } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";

interface ITrackSearchItemProps {
    track: TrackWithRelations;
    tracks: TrackWithRelations[];
}

const TrackSearchItem: React.FC<ITrackSearchItemProps> = ({ track, tracks }) => {
    // Subscribe to store updates so UI reacts to play/pause/track changes
    const currentTrack = useAudioPlayerStore((s) => s.currentTrack);
    const isPlaying = useAudioPlayerStore((s) => s.isPlaying);
    const playTrack = useAudioPlayerStore((s) => s.playTrack);
    const pause = useAudioPlayerStore((s) => s.pauseTrack);

    const isCurrent = currentTrack?.id === track.id;

    const handlePlayPause = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCurrent && isPlaying) {
            pause();
        } else {
            playTrack(track, tracks);
        }
    };

    const formatDuration = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }, []);

    return (
        <li className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-neutral-900/50 group relative">
            {/* Left: Image, Title, Artist (clickable for play) */}
            <button
                type="button"
                onClick={handlePlayPause}
                className="flex items-center gap-3 min-w-0 flex-1 text-left focus:outline-none"
                tabIndex={0}
            >
                <div className="relative h-12 w-12 rounded bg-neutral-800 flex items-center justify-center text-neutral-400 overflow-hidden">
                    {track.album?.images?.[0]?.url ? (
                        <Image
                            src={track.album.images[0].url}
                            alt={`${track.title} cover`}
                            width={48}
                            height={48}
                            className="object-cover"
                            sizes="48px"
                        />
                    ) : (
                        <Music size={36} className="text-neutral-400" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className={`${isCurrent && isPlaying ? "text-green-600" : "text-white"} text-sm truncate`}>{track.title}</p>
                    <p className="text-xs text-neutral-500">{track.artist?.stage_name || "Unknown Artist"}</p>
                </div>
            </button>
            {/* Right: Like and Add to Playlist Buttons */}
            <div className="flex gap-2 items-center">
                <LikeButton iconSize={18} trackId={track.id} />
                <AddToPlaylistButton trackId={track.id} />
                <span className="text-xs text-gray-400">{formatDuration(track.duration)}</span>
            </div>
        </li>
    );
};

export default TrackSearchItem;
