"use client";

import { create } from "zustand";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: Product[];
}

interface CartActions {
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    getTotalPrice: () => number;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>((set) => {
    const initialState: CartState = {
        items: [],
    };

    return {
        ...initialState,
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (id) =>
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),
        updateQuantity: (id, quantity) =>
            set((state) => ({
                items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
            })),
        getTotalPrice: () => initialState.items.reduce((total, item) => total + item.price * item.quantity, 0),
    };
});
