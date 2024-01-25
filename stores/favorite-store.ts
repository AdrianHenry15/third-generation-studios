import { create } from "zustand";
import { Category } from "@/lib/types";

type FavoriteStore = {
    favoritedItems: Record<Category, string[]>;
    favoriteItem: (category: Category, id: string) => void;
    unFavoriteItem: (category: Category, id: string) => void;
};

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favoritedItems: {
        [Category.WEBSITE]: [],
        [Category.MUSIC]: [],
        [Category.ARTIST]: [],
        [Category.MOVIE]: [],
        [Category.NONE]: [],
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
