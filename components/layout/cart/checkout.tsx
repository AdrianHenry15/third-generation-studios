"use client";

import React from "react";
import { useCartStore } from "stores/cart-store";
import CheckoutItem from "./checkout-item";

const Checkout = () => {
    const { items, addItem, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    return (
        <div>
            <h2 className="text-white font-semibold text-4xl">Shopping Cart Checkout</h2>
            {items.map((item) => {
                if (item.id < 1) {
                    return (
                        <div key={item.id}>
                            <h5 className="text-white text-2xl">Cart is Empty.</h5>
                        </div>
                    );
                } else {
                    return (
                        <CheckoutItem
                            key={item.id}
                            items={item}
                            decreaseQuantity={() => updateQuantity(item.id, item.quantity - 1)}
                            increaseQuantity={() => updateQuantity(item.id, item.quantity + 1)}
                            removeItem={() => removeItem(item.id)}
                        />
                    );
                }
            })}
            <h3>Total Price: ${getTotalPrice()}</h3>
        </div>
    );
};

export default Checkout;
