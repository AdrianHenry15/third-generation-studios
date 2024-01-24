"use client";

import React, { useState } from "react";

import PlayButton from "./play-button";
import SaveButton from "./save-button";
import OpenButton from "./open-button";
import OpenLinkModal from "../modals/open-link-modal";
import { ItemType } from "@/lib/types";
import FavoriteButton from "./favorite-button";

interface IActionOverlayProps {
    // website?: boolean;
    // music?: boolean;
    // movie?: boolean;
    // artist?: boolean;
    websiteLink?: string;
    websiteTitle?: string;
    itemID?: string;
    itemType: ItemType;
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
            <FavoriteButton itemType={props.itemType} itemID={props.itemID!} />

            {/* SAVE */}
            <SaveButton />

            {/* PLAY/PAUSE BUTTON */}
            {props.itemType === ItemType.MUSIC && <PlayButton itemType={props.itemType} itemID={props.itemID!} />}

            {/* WEBSITE OPEN BUTTON */}
            {props.itemType === ItemType.WEBSITE && <OpenButton onClick={() => openWebsite()} />}

            {/* MOVIE OPEN BUTTON */}
            {props.itemType === ItemType.MOVIE && <OpenButton onClick={() => {}} />}

            {/* ARTIST OPEN BUTTON */}
            {props.itemType === ItemType.ARTIST && <OpenButton onClick={() => {}} />}

            {/* OpenLinkModal */}
            {isWebsiteModalOpen && (
                <OpenLinkModal isOpen={true} closeModal={closeWebsiteModal} title={props.websiteTitle!} link={props.websiteLink!} />
            )}
        </div>
    );
};

export default ActionOverlay;
