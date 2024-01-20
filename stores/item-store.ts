import { create } from "zustand";

interface ItemStoreState {
    itemId: string | null; // Store id of currently playing item
    setItemId: (itemId: string) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
    itemId: null,
    setItemId: (itemId: string) => set({ itemId: itemId }),
}));
