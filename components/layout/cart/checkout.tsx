"use client";

import React from "react";
import { useCartStore } from "stores/cart-store";
import CheckoutItem from "./checkout-item";
import CartSummary from "./cart-summary";
import { IoCartOutline } from "react-icons/io5";

const Checkout = () => {
    const { items, removeItem } = useCartStore();
    return (
        <div className="flex px-4 h-screen bg-black w-full flex-col lg:flex-row">
            <div className="flex flex-col flex-auto lg:w-3/12">
                <h2 className="text-white font-semibold text-3xl">Shopping Cart Checkout</h2>
                <div className="w-full h-full flex flex-col">
                    {items.length < 1 ? (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <span>
                                <IoCartOutline className="text-white" size={50} />
                            </span>
                            <h5 className="text-white text-lg text-center">Cart is Empty.</h5>
                        </div>
                    ) : (
                        items.map((item) => <CheckoutItem key={item.id} item={item} removeItem={() => removeItem(item.id)} />)
                    )}
                </div>
            </div>
            <div className="flex flex-auto md:flex-1 lg:w-1/3">
                <CartSummary />
            </div>
        </div>
    );
};

export default Checkout;
