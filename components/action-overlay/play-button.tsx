import React from "react";

import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { usePlayButtonStore } from "stores/play-button-store";

interface IPlayButtonProps {
    itemId: string;
}

const PlayButton = (props: IPlayButtonProps) => {
    const { isPlaying, itemId, play, pause } = usePlayButtonStore();

    const handleClick = () => {
        if (isPlaying && itemId === props.itemId) {
            pause();
        } else {
            play(props.itemId);
        }
    };

    return (
        <p className="z-20" onClick={handleClick}>
            {isPlaying && itemId === props.itemId ? (
                <IoPauseCircle
                    size={70}
                    className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 scale-100 transition-transform duration-300"
                />
            ) : (
                <IoPlayCircle
                    size={70}
                    className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 scale-100 transition-transform duration-300"
                />
            )}
        </p>
    );
};

export default PlayButton;
