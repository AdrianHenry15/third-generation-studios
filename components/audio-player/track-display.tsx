"use client";

import Image from "next/image";
import React from "react";

import Pic from "@/public/music/jack.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useItemStore } from "stores/item-store";
import { useFavoriteStore } from "stores/favorite-store";

const TrackDisplay = () => {
    const likeStore = useFavoriteStore();
    const { currentItemID, currentItemType } = useItemStore();

    const isItemFavorited =
        currentItemType &&
        currentItemID &&
        Array.isArray(likeStore.favoritedItems[currentItemType]) &&
        likeStore.favoritedItems[currentItemType].includes(currentItemID);

    const handleLike = () => {
        if (isItemFavorited) {
            likeStore.unFavoriteItem(currentItemType!, currentItemID!);
        } else {
            likeStore.favoriteItem(currentItemType!, currentItemID!);
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
            {/* FAVORITE BUTTON */}
            <p className="z-20 cursor-pointer text-white hover:scale-125 scale-100 transition-transform duration-300" onClick={handleLike}>
                {isItemFavorited ? <FaHeart /> : <FaRegHeart />}
            </p>
        </div>
    );
};

export default TrackDisplay;
