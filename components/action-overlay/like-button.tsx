"use client";

import { ItemType } from "@/lib/types";
import React from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useLikeStore } from "stores/like-store";

interface ILikeButtonProps {
    itemType: ItemType;
    itemID: string;
}

const LikeButton = (props: ILikeButtonProps) => {
    const likeStore = useLikeStore();
    const isItemLiked =
        props.itemType &&
        props.itemID &&
        Array.isArray(likeStore.likedItems[props.itemType]) &&
        likeStore.likedItems[props.itemType].includes(props.itemID);

    const handleLike = () => {
        if (isItemLiked) {
            likeStore.unlikeItem(props.itemType, props.itemID);
        } else {
            likeStore.likeItem(props.itemType, props.itemID);
        }
    };

    return (
        <p
            className="z-20 absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300"
            onClick={handleLike}
        >
            {isItemLiked ? <FaHeart /> : <FaRegHeart />}
        </p>
    );
};

export default LikeButton;
