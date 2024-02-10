"use client";

import Image from "next/image";
import React from "react";

import { useTrackStore } from "stores/track-store";

const TrackDisplay = () => {
    const { currentTrack } = useTrackStore();

    return (
        <div className="flex flex-1 items-center">
            {/* IMAGE */}
            <div className="h-min">
                <Image className="w-14" src={currentTrack.img} alt="artwork" />
            </div>
            {/* ARTIST/SONG */}
            <div className="text-sm mx-4">
                <h5 className="text-white font-semibold">{currentTrack.title}</h5>
                <p className="text-gray-400 text-xs">{currentTrack.artist.title}</p>
            </div>
            {/* FAVORITE BUTTON */}
            {/* <p className="z-20 cursor-pointer text-white hover:scale-125 scale-100 transition-transform duration-300" onClick={handleLike}>
                {isItemFavorited ? <FaHeart /> : <FaRegHeart />}
            </p> */}
        </div>
    );
};

export default TrackDisplay;
