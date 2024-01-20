import { create } from "zustand";

interface PlayButtonState {
    isPlaying: boolean;
    itemId: string | null; // Store id of currently playing item
    play: (itemId: string) => void;
    pause: () => void;
}

export const usePlayButtonStore = create<PlayButtonState>((set) => ({
    isPlaying: false,
    itemId: null,
    play: (itemId: string) => set({ isPlaying: true, itemId: itemId }),
    pause: () => set({ isPlaying: false }),
}));
