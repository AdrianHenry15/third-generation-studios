"use client";

import { create } from "zustand";

import { Category, SongType } from "@/lib/types";

interface ItemStoreState {
    currentTrack: SongType;
    currentItemId: string; // Store id of currently playing item
    currentCategory: Category; // Store type of currently playing item
    currentItemTitle: string;
    currentItemImg: any;
    currentArtistName: string;
    currentAudioFile: string;

    setCurrentCategory: (currentTrackType: Category) => void;
    setCurrentItemId: (currentItemId: string) => void;
    setCurrentItemTitle: (currentItemTitle: string) => void;
    setCurrentItemImg: (currentItemImg: any) => void;
    setCurrentArtistName: (currentArtistName: string) => void;
    setCurrentAudioFile: (currentAudioFile: string) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
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
    currentItemId: "",
    currentCategory: {} as Category,
    currentItemTitle: "",
    currentItemImg: null,
    currentArtistName: "",
    currentAudioFile: "",

    setCurrentCategory: (currentCategory: Category) => set({ currentCategory }),
    setCurrentItemId: (currentItemId: string) => set({ currentItemId }),
    setCurrentItemTitle: (currentItemTitle: string) => set({ currentItemTitle }),
    setCurrentItemImg: (currentItemImg: any) => set({ currentItemImg }),
    setCurrentArtistName: (currentArtistName: string) => set({ currentArtistName }),
    setCurrentAudioFile: (currentAudioFile: string) => set({ currentAudioFile }),
}));
