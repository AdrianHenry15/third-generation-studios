"use client";

import { Category } from "@/lib/types";
import React, { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useFavoriteStore } from "stores/favorite-store";

interface IFavoriteButtonProps {
    category: Category;
    itemId: string;
}

const FavoriteButton = (props: IFavoriteButtonProps) => {
    const favoriteStore = useFavoriteStore();
    const [isItemFavorited, setIsItemFavorited] = useState<boolean | null>(null);

    const handleLike = () => {
        if (isItemFavorited) {
            favoriteStore.unFavoriteItem(props.category, props.itemId);
        } else {
            favoriteStore.favoriteItem(props.category, props.itemId);
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
