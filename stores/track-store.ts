import { create } from "zustand";
import { SongType } from "@/lib/types";

interface ITrackState {
    currentTrack: SongType;
}

interface ITrackActions {
    setCurrentTrack: (currentTrack: SongType) => void;
}

type TrackStore = ITrackState & ITrackActions;

export const useTrackStore = create<TrackStore>()(
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
