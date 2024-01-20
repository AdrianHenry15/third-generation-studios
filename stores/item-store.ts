import { create } from "zustand";

interface ItemStoreState {
    currentItemID: string | null; // Store id of currently playing item
    setCurrentItemID: (currentItemId: string) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
    currentItemID: null,
    setCurrentItemID: (currentItemID: string) => set({ currentItemID: currentItemID }),
}));
