import React, { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

const LikeButton = () => {
    const [like, setLike] = useState(false);

    return (
        <p onClick={() => setLike(!like)}>
            {like ? (
                <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
                <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
        </p>
    );
};

export default LikeButton;
