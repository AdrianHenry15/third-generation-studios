import React from "react";

import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { useAudioPlayerStore } from "stores/audio-player-store";
import { useItemStore } from "stores/item-store";

interface IPlayButtonProps {
    currentItemID: string;
}

const PlayButton = (props: IPlayButtonProps) => {
    const { isPlaying, play, pause } = useAudioPlayerStore();
    const { currentItemID } = useItemStore();

    const handleClick = () => {
        if (isPlaying && currentItemID === props.currentItemID) {
            pause();
        } else {
            play(props.currentItemID);
        }
    };

    return (
        <p className="z-20" onClick={handleClick}>
            {isPlaying && currentItemID === props.currentItemID ? (
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
