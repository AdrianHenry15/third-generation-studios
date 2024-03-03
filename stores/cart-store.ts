// cart-store.ts
import { create } from "zustand";
import { SongType } from "@/lib/types";

interface CartState {
    items: SongType[];
    isCartModalOpen: boolean; // Add a new state variable to manage modal state
}

interface CartActions {
    addItem: (item: SongType) => void;
    removeItem: (id: string) => void;
    getTotalPrice: () => number;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>((set, get) => {
    const initialState: CartState = {
        items: [],
        isCartModalOpen: false, // Initialize modal state to closed
    };

    return {
        ...initialState,
        addItem: (item) =>
            set((state) => {
                // Check if the item already exists in the cart
                const existingItemIndex = state.items.findIndex((cartItem) => cartItem.id === item.id);

                // If the item already exists in the cart, don't add it again
                if (existingItemIndex !== -1) {
                    return state;
                }

                // Otherwise, add the item to the cart
                return { items: [...state.items, item] };
            }),
        removeItem: (id) =>
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),
        getTotalPrice: () => {
            const items = get().items;
            return items.reduce((total, item) => total + item.price, 0);
        },
    };
});
