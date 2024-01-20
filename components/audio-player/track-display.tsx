"use client";

import Image from "next/image";
import React from "react";

import Pic from "@/public/music/jack.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSongActionStore } from "stores/song-action-store";
import { useItemStore } from "stores/item-store";

const TrackDisplay = () => {
    const { isSongLiked, likeSong } = useSongActionStore();
    const { currentItemID } = useItemStore();

    const handleLike = () => {
        likeSong(currentItemID!);
    };
    return (
        <div className="relative flex items-center">
            {/* IMAGE */}
            <div className="relative h-min">
                <Image className="w-14" src={Pic} alt="artwork" />
            </div>
            {/* ARTIST/SONG */}
            <div className="text-sm mx-4">
                <h5 className="text-white font-semibold">Track Name</h5>
                <p className="text-gray-400 text-xs">Artist Name</p>
            </div>
            {/* LIKE BUTTON */}
            <p className="z-20" onClick={handleLike}>
                {isSongLiked ? (
                    <FaHeart className="text-white hover:scale-125 scale-100 transition-transform duration-300" />
                ) : (
                    <FaRegHeart className="text-white hover:scale-125 scale-100 transition-transform duration-300" />
                )}
            </p>
        </div>
    );
};

export default TrackDisplay;
