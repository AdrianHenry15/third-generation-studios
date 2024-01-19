import React, { useState } from "react";

import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";

const PlayButton = () => {
    const [play, setPlay] = useState(false);

    return (
        <p className="z-20" onClick={() => setPlay(!play)}>
            {!play ? (
                <IoPlayCircle
                    size={70}
                    className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 scale-100 transition-transform duration-300"
                />
            ) : (
                <IoPauseCircle
                    size={70}
                    className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 scale-100 transition-transform duration-300"
                />
            )}
        </p>
    );
};

export default PlayButton;
