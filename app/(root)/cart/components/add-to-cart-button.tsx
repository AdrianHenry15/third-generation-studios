"use client";

import { PrintfulSyncVariant } from "@/lib/types/printful-product-types";
import useCartStore from "@/stores/cart-store";
import React, { useEffect, useState } from "react";

interface AddToCartButtonProps {
    product: PrintfulSyncVariant; // Expecting PrintfulSyncVariant type here
    disabled?: boolean; // Optional disabled prop
}

const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
    const { addItem, removeItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(product.id); // Using product._id to identify the item in the cart
    const [isClient, setIsClient] = useState(false);

    // This effect ensures the component only renders on the client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Skip rendering until the component is mounted (to prevent hydration errors)
    if (!isClient) {
        return null;
    }

    return (
        <div className="flex items-center justify-center z-10 space-x-2">
            {/* Button to remove the item */}
            <button
                onClick={() => removeItem(product.id)} // Using product._id to remove the item
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
                ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
                disabled={itemCount === 0 || disabled}
            >
                <span className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>-</span>
            </button>

            {/* Display current item count in the cart */}
            <span className="w-8 text-center font-semibold">{itemCount}</span>

            {/* Button to add the item */}
            <button
                onClick={() => addItem(product)} // Passing the entire product for adding
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
                ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-zinc-800"}`}
                disabled={disabled}
            >
                <span className="text-xl font-bold text-white">+</span>
            </button>
        </div>
    );
};

export default AddToCartButton;
