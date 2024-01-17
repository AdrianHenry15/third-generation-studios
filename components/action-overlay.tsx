"use client";

import React, { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";

const ActionOverlay = () => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
        <div className="absolute cursor-pointer top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            {/* LIKE */}
            <p onClick={() => setLike(!like)}>
                {like ? (
                    <FaHeart className="absolute top-4 left-4 text-gray-300" />
                ) : (
                    <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                )}
            </p>
            {/* SAVE */}
            <p onClick={() => setSaved(!saved)}>
                {saved ? (
                    <FaBookmark className="absolute top-4 left-11 text-gray-300" />
                ) : (
                    <FaRegBookmark className="absolute top-4 left-11 text-gray-300" />
                )}
            </p>
        </div>
    );
};

export default ActionOverlay;
