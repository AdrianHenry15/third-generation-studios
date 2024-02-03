"use client";

import Image from "next/image";
import React from "react";

import Pic from "@/public/music/jack.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useItemStore } from "stores/item-store";
import { useFavoriteStore } from "stores/favorite-store";

const TrackDisplay = () => {
    const likeStore = useFavoriteStore();
    const { currentItemId, currentCategory, currentItemImg, currentArtistName, currentItemTitle } = useItemStore();

    const isItemFavorited =
        currentCategory &&
        currentItemId &&
        Array.isArray(likeStore.favoritedItems[currentCategory]) &&
        likeStore.favoritedItems[currentCategory].includes(currentItemId);

    const handleLike = () => {
        if (isItemFavorited) {
            likeStore.unFavoriteItem(currentCategory!, currentItemId!);
        } else {
            likeStore.favoriteItem(currentCategory!, currentItemId!);
        }
    };

    return (
        <div className="flex flex-1 items-center">
            {/* IMAGE */}
            <div className="h-min">
                <Image className="w-14" src={currentItemImg} alt="artwork" />
            </div>
            {/* ARTIST/SONG */}
            <div className="text-sm mx-4">
                <h5 className="text-white font-semibold">{currentItemTitle}</h5>
                <p className="text-gray-400 text-xs">{currentArtistName}</p>
            </div>
            {/* FAVORITE BUTTON */}
            <p className="z-20 cursor-pointer text-white hover:scale-125 scale-100 transition-transform duration-300" onClick={handleLike}>
                {isItemFavorited ? <FaHeart /> : <FaRegHeart />}
            </p>
        </div>
    );
};

export default TrackDisplay;
