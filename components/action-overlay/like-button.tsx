import React, { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useItemStore } from "stores/item-store";
import { useSongActionStore } from "stores/song-action-store";

interface ILikeButtonProps {
    currentItemID: string;
}

const LikeButton = (props: ILikeButtonProps) => {
    const { isSongLiked, likeSong } = useSongActionStore();
    const { currentItemID } = useItemStore();

    const handleLike = () => {
        if (!isSongLiked || props.currentItemID === currentItemID) {
            likeSong(props.currentItemID);
        }
    };

    return (
        <p className="z-20" onClick={handleLike}>
            {isSongLiked && props.currentItemID === currentItemID ? (
                <FaHeart className="absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300" />
            ) : (
                <FaRegHeart className="absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300" />
            )}
        </p>
    );
};

export default LikeButton;
