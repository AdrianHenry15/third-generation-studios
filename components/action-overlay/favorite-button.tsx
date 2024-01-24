"use client";

import { ItemType } from "@/lib/types";
import React, { useEffect, useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useFavoriteStore } from "stores/favorite-store";

interface IFavoriteButtonProps {
    itemType: ItemType;
    itemID: string;
}

const FavoriteButton = (props: IFavoriteButtonProps) => {
    const favoriteStore = useFavoriteStore();
    const [isItemFavorited, setIsItemFavorited] = useState<boolean | null>(null);

    const handleLike = () => {
        if (isItemFavorited) {
            favoriteStore.unFavoriteItem(props.itemType, props.itemID);
        } else {
            favoriteStore.favoriteItem(props.itemType, props.itemID);
        }
    };

    return (
        <p
            className="z-20 absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300"
            onClick={handleLike}
        >
            {isItemFavorited ? <FaHeart /> : <FaRegHeart />}
        </p>
    );
};

export default FavoriteButton;
