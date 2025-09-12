"use client";

import Image from "next/image";
import React from "react";
import { TrackType } from "@/lib/types";

interface ITrackCardProps extends TrackType {
    onUnlock?: (trackId: number) => void;
}

const TrackCard = (props: ITrackCardProps) => {
    const { id, title, artist, album, albumArt, source, duration, year, genre, locked, onUnlock } = props;

    return (
        <div
            key={id}
            className="group bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 relative flex flex-col"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={albumArt}
                    alt={title}
                    fill
                    className={`object-cover group-hover:brightness-90 transition ${locked ? "blur-sm" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        source === "Spotify" ? "bg-green-500/90 text-white" : "bg-purple-500/90 text-white"
                    }`}
                >
                    {source}
                </span>

                {locked && (
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
                <div>
                    <h2 className="text-xl font-bold text-white mb-1 truncate">{title}</h2>
                    <p className="text-gray-400 text-sm mb-1 truncate">{artist}</p>
                    <p className="text-gray-300 text-xs mb-2 truncate font-medium">{album}</p>
                    <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2">
                        <span>{year}</span>
                        <span>•</span>
                        <span>{genre}</span>
                        <span>•</span>
                        <span>{duration}</span>
                    </div>
                </div>
                <button
                    disabled={locked}
                    className={`mt-4 w-full py-2 rounded-lg text-white font-semibold shadow transition ${
                        !locked
                            ? "bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-400 hover:to-purple-400"
                            : "bg-gray-700 cursor-not-allowed"
                    }`}
                >
                    {!locked ? "Play" : "Locked"}
                </button>
            </div>
        </div>
    );
};

export default TrackCard;
