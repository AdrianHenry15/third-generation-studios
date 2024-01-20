"use client";

import { create } from "zustand";
import { useItemStore } from "./item-store";

interface SongActionState {
    isSongLiked: boolean;
    isSongSaved: boolean;
    likeSong: (itemID: string) => void;
    saveSong: (itemID: string) => void;
}

export const useSongActionStore = create<SongActionState>((set) => {
    const { setCurrentItemID } = useItemStore.getState();

    return {
        isSongLiked: false,
        isSongSaved: false,
        likeSong: (itemID: string) => {
            setCurrentItemID(itemID);
            set((state) => ({ isSongLiked: !state.isSongLiked }));
        },
        saveSong: (itemID: string) => {
            setCurrentItemID(itemID);
            set((state) => ({ isSongSaved: !state.isSongSaved }));
        },
    };
});
