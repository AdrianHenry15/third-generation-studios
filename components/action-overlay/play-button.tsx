import { Category } from "@/lib/types";
import React from "react";

import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { useAudioPlayerStore } from "stores/audio-player-store";
import { useItemStore } from "stores/item-store";

interface IPlayButtonProps {
    currentCategory: Category;
    currentItemId: string;
    currentAudioFile: string;
    currentArtistName: string;
    currentItemImg: any;
    currentItemTitle: string;
}

const PlayButton = (props: IPlayButtonProps) => {
    const { isPlaying, play, pause } = useAudioPlayerStore();
    const {
        currentItemId,
        currentCategory,
        currentAudioFile,
        setCurrentArtistName,
        setCurrentItemImg,
        setCurrentItemTitle,
        setCurrentAudioFile,
    } = useItemStore();

    const handleClick = () => {
        if (isPlaying && currentItemId === props.currentItemId && currentCategory === props.currentCategory) {
            pause();
        } else {
            play(props.currentItemId, props.currentCategory);
            setCurrentAudioFile(props.currentAudioFile);
            setCurrentArtistName(props.currentArtistName);
            setCurrentItemImg(props.currentItemImg);
            setCurrentItemTitle(props.currentItemTitle);
        }
    };

    return (
        <div>
            <p className="z-20" onClick={handleClick}>
                {isPlaying && currentItemId === props.currentItemId && currentCategory === props.currentCategory ? (
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
        </div>
    );
};

export default PlayButton;
