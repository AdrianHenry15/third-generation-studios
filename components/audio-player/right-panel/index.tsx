import React from "react";
import VolumeSlider from "./volume-slider";
import MobilePlayButton from "./mobile-play-button";

const RightPanel = () => {
    return (
        <div className="flex">
            {/* VOLUME */}
            <div className="hidden md:flex">
                <VolumeSlider />
            </div>
            <div className="flex md:hidden">
                <MobilePlayButton />
            </div>
        </div>
    );
};

export default RightPanel;
