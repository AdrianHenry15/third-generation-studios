import React, { useState } from "react";

import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

const PlayButton = () => {
    const [play, setPlay] = useState(false);

    return (
        <p onClick={() => setPlay(!play)}>
            {!play ? (
                <IoPlayCircleOutline size={60} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            ) : (
                <IoPauseCircleOutline size={60} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
        </p>
    );
};

export default PlayButton;
