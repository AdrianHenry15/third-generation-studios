"use client";

import React from "react";

import { BiShuffle } from "react-icons/bi";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { LuRepeat2 } from "react-icons/lu";
import { useAudioPlayerStore } from "stores/audio-player-store";

const Controls = () => {
    const { isPlaying, play, pause, itemId } = useAudioPlayerStore();

    const handlePlayPause = () => {
        isPlaying ? pause() : play(itemId!);
    };

    const SkipButton = "mx-4 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out";

    return (
        <div className="flex-col hidden md:flex">
            {/* PLAYER ACTIONS */}
            <div className="flex items-center">
                {/* SHUFFLE */}
                <BiShuffle className="text-gray-400" size={20} />
                {/* PREVIOUS */}
                <MdSkipPrevious className={SkipButton} size={30} />
                {/* PLAY/PAUSE */}
                <p
                    className="cursor-pointer scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
                    onClick={handlePlayPause}
                >
                    {isPlaying ? <IoPauseCircle size={40} className="text-white" /> : <IoPlayCircle size={40} className="text-white" />}
                </p>
                {/* NEXT */}
                <MdSkipNext className={SkipButton} size={30} />
                {/* REPEAT */}
                <LuRepeat2 className="text-gray-400" size={20} />
            </div>
            {/* DURATION */}
            <div></div>
        </div>
    );
};

export default Controls;
