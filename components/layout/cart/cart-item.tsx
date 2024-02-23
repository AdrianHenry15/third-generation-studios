"use client";

import React from "react";
import Image from "next/image";

import { Product } from "@/lib/types";

interface CartItemProps {
    item: Product;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
    const { id, name, img, price, quantity } = item;

    const handleQuantityChange = (newQuantity: number) => {
        updateQuantity(id, newQuantity);
    };

    const handleRemoveItem = () => {
        removeItem(id);
    };

    return (
        <div className="cart-item">
            <div className="item-info">
                <Image src={img} alt={name} />
                <div className="details">
                    <h3>{name}</h3>
                    <p>Price: ${price}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
            <div className="actions">
                <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
                    -
                </button>
                <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
                <button onClick={handleRemoveItem}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
