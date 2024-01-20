"use client";

import React from "react";

import { BiShuffle } from "react-icons/bi";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { LuRepeat2 } from "react-icons/lu";

import AudioPlayerPlayButton from "./play-button";

const Controls = () => {
    const SkipButton = "mx-4 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out";
    const AltButton = "text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out";

    return (
        <div className="flex-col hidden md:flex">
            {/* PLAYER ACTIONS */}
            <div className="flex items-center">
                {/* SHUFFLE */}
                <BiShuffle className={AltButton} size={20} />
                {/* PREVIOUS */}
                <MdSkipPrevious className={SkipButton} size={30} />
                {/* PLAY/PAUSE */}
                <AudioPlayerPlayButton />
                {/* NEXT */}
                <MdSkipNext className={SkipButton} size={30} />
                {/* REPEAT */}
                <LuRepeat2 className={AltButton} size={20} />
            </div>
            {/* DURATION */}
            <div></div>
        </div>
    );
};

export default Controls;
