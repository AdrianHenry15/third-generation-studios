"use client";

import React from "react";

import { IoIosPause, IoIosPlay } from "react-icons/io";
import { useAudioPlayerStore } from "stores/audio-player-store";
import { useTrackStore } from "stores/track-store";

const MobilePlayButton = () => {
    const { isPlaying, play, pause } = useAudioPlayerStore();
    const { currentTrack } = useTrackStore();

    const handlePlayPause = () => {
        isPlaying ? pause() : play(currentTrack);
    };
    return (
        <p className="cursor-pointer scale-100 hover:scale-110 transition-transform duration-300 ease-in-out" onClick={handlePlayPause}>
            {isPlaying ? <IoIosPause size={25} className="text-white" /> : <IoIosPlay size={25} className="text-white" />}
        </p>
    );
};

export default MobilePlayButton;
