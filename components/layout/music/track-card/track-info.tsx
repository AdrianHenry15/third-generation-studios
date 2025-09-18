import { ITrackProps } from "@/lib/types";
import React from "react";

interface ITrackInfoProps {
    track: ITrackProps;
}

const TrackInfo: React.FC<ITrackInfoProps> = ({ track }) => {
    const { title, artists, album, release_date, duration, plays } = track;

    // Helper function to format duration from milliseconds to MM:SS
    const formatDuration = (durationMs: number): string => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-1 truncate">{title}</h2>
            <p className="text-gray-400 text-sm mb-1 truncate">
                {artists && artists.length > 0 ? artists.map((artist) => artist.stage_name).join(", ") : ""}
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
    );
};

export default TrackInfo;
