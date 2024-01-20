"use client";

import { create } from "zustand";
import { useItemStore } from "./item-store";

const { setCurrentItemID } = useItemStore.getState();

interface AudioPlayerState {
    isPlaying: boolean;
    play: (itemID: string) => void;
    pause: () => void;
    isShuffled: boolean;
    isRepeat: boolean;
    playlist: any[];
    currentTrackIndex: number;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    playNextTrack: () => void;
    playPreviousTrack: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
    isPlaying: false,
    play: (itemID: string) => {
        setCurrentItemID(itemID);
        set({ isPlaying: true });
    },
    pause: () => set({ isPlaying: false }),
    isShuffled: false,
    isRepeat: false,
    playlist: [], // Your playlist items here
    currentTrackIndex: 0,
    toggleShuffle: () =>
        set((state) => {
            const clonedPlaylist = [...state.playlist];
            if (state.isShuffled) {
                // If shuffling is disabled, restore the original playlist order
                return { isShuffled: false, playlist: clonedPlaylist.sort((a, b) => a.localeCompare(b)) };
            } else {
                // If shuffling is enabled, shuffle the playlist
                for (let i = clonedPlaylist.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [clonedPlaylist[i], clonedPlaylist[j]] = [clonedPlaylist[j], clonedPlaylist[i]];
                }
                return { isShuffled: true, playlist: clonedPlaylist };
            }
        }),
    toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
    playNextTrack: () => {
        // Implement logic to play the next track based on shuffle and repeat settings
        // Update currentTrackIndex accordingly
    },
    playPreviousTrack: () => {
        // Implement logic to play the previous track based on shuffle and repeat settings
        // Update currentTrackIndex accordingly
    },
}));
