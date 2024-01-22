"use client";

import React from "react";

import RightPanel from "./right-panel";
import TrackDisplay from "./track-display";
import Controls from "./controls";
import { useItemStore } from "stores/item-store";
import { ItemType } from "@/lib/types";

const AudioPlayer = () => {
    const { currentItemID, currentItemType } = useItemStore();
    console.log(currentItemID, currentItemType);

    return currentItemID !== "" ? null : (
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