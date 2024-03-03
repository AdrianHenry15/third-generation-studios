"use client";

import { create } from "zustand";
import React from "react";

import { useTrackStore } from "./track-store";
import { SongType } from "@/lib/types";

const { setCurrentTrack } = useTrackStore.getState();

interface IAudioPlayerState {
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
}

interface IAudioPlayerActions {
    play: (track: SongType) => void;
    pause: () => void;
}

type AudioPlayerStore = IAudioPlayerState & IAudioPlayerActions;

export const useAudioPlayerStore = create<AudioPlayerStore>((set) => ({
    // STATE
    isPlaying: false,
    audioRef: React.createRef(),
    // ACTIONS
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
