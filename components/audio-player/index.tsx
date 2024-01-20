import React from "react";

import RightPanel from "./volume-panel";
import TrackDisplay from "./track-display";
import Controls from "./controls";

const AudioPlayer = () => {
    return (
        <div className="bg-black z-50 px-4 py-10 text-white fixed justify-between bottom-0 w-full h-[75px] flex items-center">
            {/* ARTWORK, ARTIST, SONG, LIKE BUTTON */}
            <TrackDisplay />
            {/* AUDIO ACTIONS AND DURATION */}
            <Controls />
            {/* VOLUME */}
            <RightPanel />
        </div>
    );
};

export default AudioPlayer;
