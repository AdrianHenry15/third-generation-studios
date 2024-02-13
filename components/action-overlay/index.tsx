"use client";

import React, { useState } from "react";

import OpenButton from "./open-button";
import OpenLinkModal from "../modals/open-link-modal";

import { useRouter } from "next/navigation";

interface IActionOverlayProps {
    websiteLink: string;
    websiteTitle: string;
    currentItemId: string;
    currentItemTitle: string;
    currentItemImg: any;
    currentAudioFile?: string;
    currentArtistName?: string;
}

const ActionOverlay = (props: IActionOverlayProps) => {
    const [isWebsiteModalOpen, setWebsiteModalOpen] = useState(false);
    const router = useRouter();

    const openWebsite = () => {
        setWebsiteModalOpen(true);
    };

    const closeWebsiteModal = () => {
        setWebsiteModalOpen(false);
    };

    return (
        <div className="absolute cursor-pointer top-0 left-0 w-full h-full bg-black/20 text-white">
            {/* OPEN ITEM */}
            {/* <OpenButton onClick={handleAction} /> */}

            {/* OpenLinkModal */}
            {isWebsiteModalOpen && (
                <OpenLinkModal isOpen={true} closeModal={closeWebsiteModal} title={props.websiteTitle!} link={props.websiteLink!} />
            )}
        </div>
    );
};

export default ActionOverlay;
