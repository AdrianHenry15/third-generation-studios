import React from "react";

import MobileMusicImgTextOverlay from "../mobile-music/mobile-music-img-text-overlay";
import MobileMusicPlayerHeader from "../mobile-music/mobile-music-player-header";

const MobileMainMusicSection = () => {
    return (
        <div className="relative">
            <MobileMusicImgTextOverlay />
            <div className="h-full">
                <MobileMusicPlayerHeader />
            </div>
        </div>
    );
};

export default MobileMainMusicSection;
