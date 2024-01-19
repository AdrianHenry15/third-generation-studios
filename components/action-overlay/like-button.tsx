import React, { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

const LikeButton = () => {
    const [like, setLike] = useState(false);

    return (
        <p className="z-20" onClick={() => setLike(!like)}>
            {like ? (
                <FaHeart className="absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300" />
            ) : (
                <FaRegHeart className="absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300" />
            )}
        </p>
    );
};

export default LikeButton;
