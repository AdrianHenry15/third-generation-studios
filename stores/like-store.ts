import { create } from "zustand";
import { ItemType } from "@/lib/types";

type LikeStore = {
    likedItems: Record<ItemType, string[]>;
    likeItem: (category: ItemType, id: string) => void;
    unlikeItem: (category: ItemType, id: string) => void;
};

export const useLikeStore = create<LikeStore>((set) => ({
    likedItems: {
        [ItemType.WEBSITE]: [],
        [ItemType.MUSIC]: [],
        [ItemType.ARTIST]: [],
        [ItemType.MOVIE]: [],
        [ItemType.NONE]: [],
    },
    likeItem: (category, id) => {
        set((state) => {
            const updatedState = {
                ...state,
                likedItems: {
                    ...state.likedItems,
                    [category]: Array.isArray(state.likedItems[category]) ? [...state.likedItems[category], id] : [id],
                },
            };
            return updatedState;
        });
    },
    unlikeItem: (category, id) => {
        set((state) => {
            const updatedItems = Array.isArray(state.likedItems[category])
                ? state.likedItems[category].filter((itemId) => itemId !== id)
                : [];
            const updatedState = { ...state, likedItems: { ...state.likedItems, [category]: updatedItems } };
            return updatedState;
        });
    },
}));
