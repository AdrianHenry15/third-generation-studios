"use client";

import React, { useState } from "react";

import PlayButton from "./play-button";
import SaveButton from "./save-button";
import LikeButton from "./like-button";
import OpenButton from "./open-button";
import OpenLinkModal from "../modals/open-link-modal";

interface IActionOverlayProps {
    website?: boolean;
    music?: boolean;
    movie?: boolean;
    artist?: boolean;
    websiteLink?: string;
    websiteTitle?: string;
    currentItemID?: string;
}

const ActionOverlay = (props: IActionOverlayProps) => {
    const [isWebsiteModalOpen, setWebsiteModalOpen] = useState(false);

    const openWebsite = () => {
        setWebsiteModalOpen(true);
    };

    const closeWebsiteModal = () => {
        setWebsiteModalOpen(false);
    };
    return (
        <div className="absolute cursor-pointer top-0 left-0 w-full h-full bg-black/20 text-white">
            {/* LIKE */}
            <LikeButton currentItemID={props.currentItemID!} />

            {/* SAVE */}
            <SaveButton />

            {/* PLAY/PAUSE BUTTON */}
            {props.music && <PlayButton currentItemID={props.currentItemID!} />}

            {/* WEBSITE OPEN BUTTON */}
            {props.website && <OpenButton onClick={() => openWebsite()} />}

            {/* MOVIE OPEN BUTTON */}
            {props.movie && <OpenButton onClick={() => {}} />}

            {/* ARTIST OPEN BUTTON */}
            {props.artist && <OpenButton onClick={() => {}} />}

            {/* OpenLinkModal */}
            {isWebsiteModalOpen && (
                <OpenLinkModal isOpen={true} closeModal={closeWebsiteModal} title={props.websiteTitle!} link={props.websiteLink!} />
            )}
        </div>
    );
};

export default ActionOverlay;
