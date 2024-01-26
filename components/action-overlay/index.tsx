"use client";

import React, { useState } from "react";

import PlayButton from "./play-button";
import SaveButton from "./save-button";
import OpenButton from "./open-button";
import OpenLinkModal from "../modals/open-link-modal";
import FavoriteButton from "./favorite-button";

import { Category } from "@/lib/types";

interface IActionOverlayProps {
    websiteLink?: string;
    websiteTitle?: string;
    itemId?: string;
    category: Category;
}

const ActionOverlay = (props: IActionOverlayProps) => {
    const [isWebsiteModalOpen, setWebsiteModalOpen] = useState(false);

    const openWebsite = () => {
        setWebsiteModalOpen(true);
    };

    const closeWebsiteModal = () => {
        setWebsiteModalOpen(false);
    };

    const handleAction = () => {
        if (props.category === Category.MUSIC) {
            console.log("music");
        } else if (props.category === Category.WEBSITE) {
            openWebsite();
        } else if (props.category === Category.MOVIE) {
            console.log("movie");
        } else if (props.category === Category.ARTIST) {
            console.log("artist");
        }
    };
    return (
        <div className="absolute cursor-pointer top-0 left-0 w-full h-full bg-black/20 text-white">
            {/* LIKE */}
            {/* <FavoriteButton category={props.category} itemId={props.itemId!} /> */}

            {/* SAVE */}
            {/* <SaveButton /> */}

            {/* OPEN ITEM */}
            <OpenButton onClick={handleAction} />

            {/* PLAY/PAUSE BUTTON */}
            {props.category === Category.MUSIC && <PlayButton category={props.category} itemId={props.itemId!} />}

            {/* OpenLinkModal */}
            {isWebsiteModalOpen && (
                <OpenLinkModal isOpen={true} closeModal={closeWebsiteModal} title={props.websiteTitle!} link={props.websiteLink!} />
            )}
        </div>
    );
};

export default ActionOverlay;
