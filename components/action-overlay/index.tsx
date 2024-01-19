import React from "react";

import PlayButton from "./play-button";
import SaveButton from "./save-button";
import LikeButton from "./like-button";

interface IActionOverlayProps {
    website?: boolean;
    music?: boolean;
    movie?: boolean;
}

const ActionOverlay = (props: IActionOverlayProps) => {
    return (
        <div
            onClick={() => console.log("poop")}
            className="absolute cursor-pointer top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white"
        >
            {/* LIKE */}
            <LikeButton />

            {/* SAVE */}
            <SaveButton />

            {/* PLAY/PAUSE BUTTON */}
            {props.music && <PlayButton />}
        </div>
    );
};

export default ActionOverlay;
