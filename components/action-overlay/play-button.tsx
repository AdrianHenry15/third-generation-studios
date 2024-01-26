import { Category } from "@/lib/types";
import React from "react";

import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { useAudioPlayerStore } from "stores/audio-player-store";
import { useItemStore } from "stores/item-store";

interface IPlayButtonProps {
    category: Category;
    itemId: string;
}

const PlayButton = (props: IPlayButtonProps) => {
    const { isPlaying, play, pause } = useAudioPlayerStore();
    const { currentItemId, currentCategory } = useItemStore();

    const handleClick = () => {
        if (isPlaying && currentItemId === props.itemId && currentCategory === props.category) {
            pause();
        } else {
            play(props.itemId, props.category);
        }
    };

    return (
        <p className="z-20" onClick={handleClick}>
            {isPlaying && currentItemId === props.itemId && currentCategory === props.category ? (
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
