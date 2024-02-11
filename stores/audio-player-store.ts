"use client";

import { create } from "zustand";
import React from "react";

import { useTrackStore } from "./track-store";
import { SongType } from "@/lib/types";

const { setCurrentTrack } = useTrackStore.getState();

interface AudioPlayerState {
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
    play: (track: SongType) => void;
    pause: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
    isPlaying: false,
    audioRef: React.createRef(),
    play: async (track) => {
        await setCurrentTrack(track);

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
