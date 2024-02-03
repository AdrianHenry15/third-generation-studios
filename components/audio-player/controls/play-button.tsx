import React from "react";
import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { useAudioPlayerStore } from "stores/audio-player-store";
import { useItemStore } from "stores/item-store";

const AudioPlayerPlayButton = () => {
    const { isPlaying, play, pause, audioRef } = useAudioPlayerStore();
    const { currentItemId, currentCategory } = useItemStore();
    const handlePlayPause = () => {
        isPlaying ? pause() : play(currentItemId!, currentCategory!);
    };
    return (
        <div>
            <audio ref={audioRef} src=""></audio>
            <p className="cursor-pointer scale-100 hover:scale-110 transition-transform duration-300 ease-in-out" onClick={handlePlayPause}>
                {isPlaying ? <IoPauseCircle size={40} className="text-white" /> : <IoPlayCircle size={40} className="text-white" />}
            </p>
        </div>
    );
};

export default AudioPlayerPlayButton;
