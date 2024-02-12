import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SongType } from "@/lib/types";
import { AllSearchTracks } from "@/lib/tracks";

interface TrackStoreState {
    currentTrack: SongType;
    setCurrentTrack: (currentTrack: SongType) => void;
}

export const useTrackStore = create<TrackStoreState>()(
    // persist(
    (set) => ({
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
        setCurrentTrack: (currentTrack: SongType) => set(() => ({ currentTrack: currentTrack })),
    })
    // {
    //     name: "track-store", // Name for the persisted data
    //     storage: createJSONStorage(() => sessionStorage),
    // }
    // )
);
