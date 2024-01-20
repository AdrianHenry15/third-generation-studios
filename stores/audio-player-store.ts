import { create } from "zustand";

interface AudioPlayerState {
    isPlaying: boolean;
    isShuffled: boolean;
    isRepeat: boolean;
    playlist: string[];
    currentTrackIndex: number;
    trackStates: Record<string, boolean>;
    play: (itemId?: string) => void;
    pause: (itemId?: string) => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    playNextTrack: () => void;
    playPreviousTrack: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
    isPlaying: false,
    isShuffled: false,
    isRepeat: false,
    playlist: [], // Your playlist items here
    currentTrackIndex: 0,
    trackStates: {}, // Your track states here
    play: (itemId) =>
        set((state) => {
            const updatedTrackStates = { ...state.trackStates, [itemId || state.playlist[state.currentTrackIndex]]: true };
            return { isPlaying: true, trackStates: updatedTrackStates };
        }),
    pause: (itemId) =>
        set((state) => {
            const updatedTrackStates = { ...state.trackStates, [itemId || state.playlist[state.currentTrackIndex]]: false };
            return { isPlaying: false, trackStates: updatedTrackStates };
        }),
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

interface PlayButtonState {
    isPlaying: boolean;
    play: (trackId?: string) => void;
    pause: (trackId?: string) => void;
}

type PlayButtonStores = Record<string, PlayButtonState>;

export const usePlayButtonInstanceStore = (itemId: string) =>
    create<PlayButtonState>((set) => ({
        isPlaying: false,
        play: () => set({ isPlaying: true }),
        pause: () => set({ isPlaying: false }),
    }));
