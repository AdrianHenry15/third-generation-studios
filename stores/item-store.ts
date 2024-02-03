"use client";

import { Category } from "@/lib/types";
import { create } from "zustand";

interface ItemStoreState {
    currentItemId: string; // Store id of currently playing item
    currentCategory: Category; // Store type of currently playing item
    currentItemTitle: string;
    currentItemImg: any;
    currentArtistName: string;

    setCurrentCategory: (currentTrackType: Category) => void;
    setCurrentItemId: (currentItemId: string) => void;
    setCurrentItemTitle: (currentItemTitle: string) => void;
    setCurrentItemImg: (currentItemImg: any) => void;
    setCurrentArtistName: (currentArtistName: string) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
    currentItemId: "",
    currentCategory: {} as Category,
    currentItemTitle: "",
    currentItemImg: null,
    currentArtistName: "",

    setCurrentCategory: (currentCategory: Category) => set({ currentCategory }),
    setCurrentItemId: (currentItemId: string) => set({ currentItemId }),
    setCurrentItemTitle: (currentItemTitle: string) => set({ currentItemTitle }),
    setCurrentItemImg: (currentItemImg: any) => set({ currentItemImg }),
    setCurrentArtistName: (currentArtistName: string) => set({ currentArtistName }),
}));
