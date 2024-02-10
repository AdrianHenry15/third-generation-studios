"use client";

import { create } from "zustand";
import React from "react";

import { useItemStore } from "./item-store";
import { Category } from "@/lib/types";

const { setCurrentItemId, setCurrentCategory } = useItemStore.getState();

interface AudioPlayerState {
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
    play: (trackId: string) => void;
    pause: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
    isPlaying: false,
    audioRef: React.createRef(),
    play: async (trackId) => {
        await setCurrentItemId(trackId);

        const audioRef = useAudioPlayerStore.getState().audioRef.current;
        if (audioRef) {
            audioRef.play().then(() => {
                set({ isPlaying: true });
            });
        }
    },
    pause: () => {
        useAudioPlayerStore.getState().audioRef.current!.pause();
        set({ isPlaying: false });
    },
}));
