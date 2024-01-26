import { Category } from "@/lib/types";
import { create } from "zustand";

interface ItemStoreState {
    currentItemId: string; // Store id of currently playing item
    currentCategory: Category; // Store type of currently playing item
    setCurrentCategory: (currentTrackType: Category) => void;
    setCurrentItemId: (currentItemId: string) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
    currentItemId: "",
    currentCategory: {} as Category,
    setCurrentCategory: (currentCategory: Category) => set({ currentCategory: currentCategory }),
    setCurrentItemId: (currentItemId: string) => set({ currentItemId: currentItemId }),
}));
