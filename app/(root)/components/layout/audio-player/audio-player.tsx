"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useAudioPlayerStore } from "@/stores/audio-player-store";
import DesktopPlayer from "./desktop-player";
import MobileCollapsedBar from "./mobile-collapsed-bar";
import MobileExpandedSheet from "./mobile-expanded-sheet";

const AudioPlayer: React.FC = () => {
    const { currentTrack, showPlayer } = useAudioPlayerStore();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!showPlayer) setExpanded(false);
    }, [showPlayer]);

    useEffect(() => {
        if (expanded) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [expanded]);

    if (!showPlayer || !currentTrack) return null;

    return (
        <>
            <DesktopPlayer setExpanded={setExpanded} />
            <MobileCollapsedBar setExpanded={setExpanded} />
            <AnimatePresence>{expanded && <MobileExpandedSheet setExpanded={setExpanded} />}</AnimatePresence>
        </>
    );
};

export default AudioPlayer;
