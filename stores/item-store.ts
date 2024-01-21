import { ItemType } from "@/lib/types";
import { create } from "zustand";

interface ItemStoreState {
    currentItemID: string; // Store id of currently playing item
    currentItemType: ItemType; // Store type of currently playing item
    setCurrentItemType: (currentTrackType: ItemType) => void;
    setCurrentItemID: (currentItemId: string) => void;
}

export const useItemStore = create<ItemStoreState>((set) => ({
    currentItemID: "",
    currentItemType: {} as ItemType,
    setCurrentItemType: (currentItemType: ItemType) => set({ currentItemType: currentItemType }),
    setCurrentItemID: (currentItemID: string) => set({ currentItemID: currentItemID }),
}));
