"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SongType } from "@/lib/types";

interface CartItemProps {
    track: SongType;
    removeItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ track, removeItem }) => {
    return (
        <div className="flex flex-col items-center p-4 mx-2">
            <Link
                href={"/cart/checkout"}
                className="flex items-center justify-start w-full p-2 hover:bg-slate-700 transition-colors duration-300 ease-in-out rounded-lg"
            >
                {/* IMAGE */}
                <span className="flex items-center mr-2">
                    <Image className="items-start aspect-square object-cover w-16 rounded-md" src={track.img} alt={track.title} />
                </span>
                {/* ITEM INFO */}
                <div className="flex flex-col justify-center items-center">
                    <div className="details">
                        <h3 className="text-white">{track.title}</h3>
                        <p>Price: ${track.price}.00</p>
                    </div>
                </div>
            </Link>
            {/* CART ACTIONS */}
            <div className="flex w-full justify-start">
                <button className="ml-2" onClick={() => removeItem(track.id)}>
                    <p className="text-white hover:text-red-600 duration-300 ease-in-out transition-colors">Remove</p>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
