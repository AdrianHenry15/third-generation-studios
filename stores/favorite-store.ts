import { create } from "zustand";
import { ItemType } from "@/lib/types";

type FavoriteStore = {
    favoritedItems: Record<ItemType, string[]>;
    favoriteItem: (category: ItemType, id: string) => void;
    unFavoriteItem: (category: ItemType, id: string) => void;
};

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favoritedItems: {
        [ItemType.WEBSITE]: [],
        [ItemType.MUSIC]: [],
        [ItemType.ARTIST]: [],
        [ItemType.MOVIE]: [],
        [ItemType.NONE]: [],
    },
    favoriteItem: (category, id) => {
        set((state) => {
            const updatedState = {
                ...state,
                likedItems: {
                    ...state.favoritedItems,
                    [category]: Array.isArray(state.favoritedItems[category]) ? [...state.favoritedItems[category], id] : [id],
                },
            };
            return updatedState;
        });
    },
    unFavoriteItem: (category, id) => {
        set((state) => {
            const updatedItems = Array.isArray(state.favoritedItems[category])
                ? state.favoritedItems[category].filter((itemId) => itemId !== id)
                : [];
            const updatedState = { ...state, likedItems: { ...state.favoritedItems, [category]: updatedItems } };
            return updatedState;
        });
    },
}));
