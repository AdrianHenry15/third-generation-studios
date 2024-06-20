"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useTrackStore } from "stores/track-store";

const TrackDisplay = () => {
    const { currentTrack } = useTrackStore();

    return (
        <div className="flex flex-1 items-center">
            {/* IMAGE */}
            <Link href={`/music/track/${currentTrack.id}`} className="h-min">
                <Image loading="lazy" className="w-14" src={currentTrack.img} alt="artwork" />
            </Link>
            {/* ARTIST/SONG */}
            <div className="text-sm mx-4">
                <h5 className="text-white font-semibold">{currentTrack.title}</h5>
                {currentTrack.artist && <p className="text-gray-400 text-xs">{currentTrack.artist.title || ""}</p>}
            </div>
            {/* FAVORITE BUTTON */}
            {/* <p className="z-20 cursor-pointer text-white hover:scale-125 scale-100 transition-transform duration-300" onClick={handleLike}>
                {isItemFavorited ? <FaHeart /> : <FaRegHeart />}
            </p> */}
        </div>
    );
};

export default TrackDisplay;
