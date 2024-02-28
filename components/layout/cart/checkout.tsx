"use client";

import React from "react";
import { useCartStore } from "stores/cart-store";
import CheckoutItem from "./checkout-item";

const Checkout = () => {
    const { items, addItem, removeItem, getTotalPrice } = useCartStore();
    return (
        <div className="flex flex-col p-4 w-full h-full bg-black">
            <h2 className="text-white font-semibold text-4xl">Shopping Cart Checkout</h2>
            {items.map((item) => {
                if (items.length < 1) {
                    return (
                        <div key={"empty"}>
                            <h5 className="text-white text-2xl">Cart is Empty.</h5>
                        </div>
                    );
                } else {
                    return <CheckoutItem key={item.id} item={item} removeItem={() => removeItem(item.id)} />;
                }
            })}
        </div>
    );
};

export default Checkout;
