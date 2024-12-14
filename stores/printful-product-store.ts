import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PrintfulSyncProductType } from "@/lib/types/printful/printful-product-types";

interface PrintfulProductState {
    products: PrintfulSyncProductType[];
    setProducts: (products: PrintfulSyncProductType[]) => void;
    fetchProducts: () => Promise<PrintfulSyncProductType[]>;
}

const usePrintfulProductStore = create<PrintfulProductState>()(
    persist(
        (set) => ({
            products: [],
            setProducts: (products) => set({ products }),
            fetchProducts: async () => {
                try {
                    const response = await fetch("http://localhost:3000/api/sync-products", {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-store", // Ensure fresh data on every request
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch products");
                    }

                    const { result } = await response.json();
                    set({ products: result }); // Store products in state
                    return result; // Return the fetched products
                } catch (error) {
                    console.error("Error fetching products:", error);
                    return []; // Return an empty array in case of error
                }
            },
        }),
        {
            name: "printful-products", // The key under which data is stored in localStorage
            getStorage: () => localStorage, // Using localStorage to persist the state
        }
    )
);

export default usePrintfulProductStore;
