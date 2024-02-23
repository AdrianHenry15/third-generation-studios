"use client";

import React from "react";
import { useCartStore } from "stores/cart-store";

const Checkout = () => {
    const { items, addItem, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    return (
        <div>
            <h2 className="text-white font-semibold text-4xl">Shopping Cart</h2>
            {items.map((item) => {
                if (item.id < 1) {
                    return (
                        <div key={item.id}>
                            <h5 className="text-white text-2xl">Cart is Empty.</h5>
                        </div>
                    );
                } else {
                    return (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    );
                }
            })}
            <h3>Total Price: ${getTotalPrice()}</h3>
        </div>
    );
};

export default Checkout;
