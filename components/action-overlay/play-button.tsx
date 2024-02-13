import { SongType } from "@/lib/types";
import React from "react";

import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { useAudioPlayerStore } from "stores/audio-player-store";
import { useTrackStore } from "stores/track-store";

interface IPlayButtonProps {
    currentTrack: SongType;
    className?: string;
}

const PlayButton = (props: IPlayButtonProps) => {
    const { isPlaying, play, pause } = useAudioPlayerStore();
    const { currentTrack, setCurrentTrack } = useTrackStore();

    const handleClick = () => {
        if (isPlaying && currentTrack.id === props.currentTrack.id) {
            pause();
        } else {
            play(props.currentTrack);
            setCurrentTrack(props.currentTrack);
        }
    };

    return (
        <div className={`${props.className} cursor-pointer`}>
            <p className="z-20" onClick={handleClick}>
                {isPlaying && currentTrack.id === props.currentTrack.id ? (
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
