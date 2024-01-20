import React from "react";
import LeftPanel from "./left-panel";
import MiddlePanel from "./middle-panel";
import RightPanel from "./right-panel";

const AudioPlayer = () => {
    return (
        <div className="bg-black z-50 px-4 py-10 text-white fixed justify-between bottom-0 w-full h-[75px] flex items-center">
            {/* ARTWORK, ARTIST, SONG, LIKE BUTTON */}
            <LeftPanel />
            {/* AUDIO ACTIONS AND DURATION */}
            <MiddlePanel />
            {/* VOLUME */}
            <RightPanel />
        </div>
    );
};

export default AudioPlayer;
