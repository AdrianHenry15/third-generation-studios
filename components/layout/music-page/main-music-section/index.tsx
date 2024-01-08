import React from "react";

import MusicImgTextOverlay from "./music-img-text-overlay";
import MusicPlayerHeader from "./music-player-header";

const MainMusicSection = () => {
    return (
        <div className="relative">
            <MusicImgTextOverlay />
            <div className="h-full">
                <MusicPlayerHeader />
            </div>
        </div>
    );
};

export default MainMusicSection;
