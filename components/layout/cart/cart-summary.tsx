import React from "react";
import { useCartStore } from "stores/cart-store";
import CartSummaryItem from "./cart-summary-item";

const CartSummary = () => {
    const { items, getTotalPrice } = useCartStore();
    return (
        <div className="flex flex-col bg-slate-900 h-min p-6 w-full rounded-lg">
            <h5 className="text-white font-semibold text-xl">Cart Summary</h5>
            <div className="flex flex-col w-full h-full">
                {items.length < 1 ? (
                    <div>
                        <h5 className="text-white text-xl text-center pb-4 border-b-[1px] border-zinc-700">Cart is Empty.</h5>
                    </div>
                ) : (
                    items.map((item) => {
                        return <CartSummaryItem key={item.id} title={item.title} img={item.img} price={item.price} />;
                    })
                )}
            </div>
            <div>
                <div className="w-full flex justify-between border-t-[1px] border-zinc-600">
                    <p className="text-white text-lg">Estimate Total: ( {items.length} items )</p>
                    <p className="text-white">${getTotalPrice().toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
