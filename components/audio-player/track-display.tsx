"use client";

import Image from "next/image";
import React from "react";

import Pic from "@/public/music/jack.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useItemStore } from "stores/item-store";
import { useLikeStore } from "stores/like-store";

const TrackDisplay = () => {
    const likeStore = useLikeStore();
    const { currentItemID, currentItemType } = useItemStore();

    const isItemLiked =
        currentItemType &&
        currentItemID &&
        Array.isArray(likeStore.likedItems[currentItemType]) &&
        likeStore.likedItems[currentItemType].includes(currentItemID);

    const handleLike = () => {
        if (isItemLiked) {
            likeStore.unlikeItem(currentItemType!, currentItemID!);
        } else {
            likeStore.likeItem(currentItemType!, currentItemID!);
        }
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
            <p className="z-20 cursor-pointer text-white hover:scale-125 scale-100 transition-transform duration-300" onClick={handleLike}>
                {isItemLiked ? <FaHeart /> : <FaRegHeart />}
            </p>
        </div>
    );
};

export default TrackDisplay;
