import { create } from "zustand";

import { SongType } from "@/lib/types";

interface TrackStoreState {
    currentTrack: SongType;
    setCurrentTrack: (currentTrack: SongType) => void;
}

export const useTrackStore = create<TrackStoreState>((set) => ({
    currentTrack: {
        id: "",
        img: {},
        title: "",
        overview: "",
        artist: {
            id: "",
            img: null,
            title: "",
            overview: "",
            release_date: "",
            songs: [],
            backdrop_path: null,
        },
        release_date: "",
        audio_file: "",
        backdrop_path: {},
        bpm: "",
        price: 0,
        key: "",
        isFree: false,
    },
    setCurrentTrack: (currentTrack) => set((state) => ({ currentTrack: currentTrack })),
}));
