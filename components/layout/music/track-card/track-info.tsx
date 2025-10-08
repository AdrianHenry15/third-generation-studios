import React from "react";
import { TrackWithRelations } from "@/lib/types/music-types";

interface ITrackInfoProps {
    track: TrackWithRelations;
}

const TrackInfo: React.FC<ITrackInfoProps> = ({ track }) => {
    const { title, release_date, duration, plays } = track;

    const formatDuration = (durationSeconds: number | null): string => {
        if (!durationSeconds) return "0:00";
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const formatReleaseDate = (dateStr: string | null): string => {
        if (!dateStr) return "Unknown Date";
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-1 truncate">{title}</h2>
            <p className="text-gray-400 text-sm mb-1 truncate">{track.artists?.stage_name || "Unknown Artist"}</p>
            {title === track.albums.name ? null : (
                <p className="text-gray-300 text-xs mb-2 truncate font-medium">{track.albums?.name || "Unknown Album"}</p>
            )}

            <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2">
                <span>{formatReleaseDate(release_date)}</span>
                <span>•</span>
                <span>{formatDuration(duration)}</span>
            </div>

            <div className="flex items-center text-xs text-gray-500 space-x-2 mb-2">
                <span>Plays: {plays || 0}</span>
            </div>

            {track.genre && (
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <span>Genre: {track.genre}</span>
                </div>
            )}
        </div>
    );
};

export default TrackInfo;
