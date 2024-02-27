"use client";

import React from "react";
import Image from "next/image";

import { SongType } from "@/lib/types";

interface CartItemProps {
    track: SongType;
    removeItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ track, removeItem }) => {
    return (
        <div className="flex flex-col items-center p-4 my-1">
            <div className="flex items-center justify-start w-full">
                {/* IMAGE */}
                <span className="flex items-center mr-2">
                    <Image className="items-start aspect-square object-cover w-16 rounded-md" src={track.img} alt={track.title} />
                </span>
                {/* ITEM INFO */}
                <div className="flex flex-col justify-center items-center">
                    <div className="details">
                        <h3 className="text-white">{track.title}</h3>
                        <p>Price: ${track.price}</p>
                    </div>
                </div>
            </div>
            {/* CART ACTIONS */}
            <div className="flex w-full justify-start mt-4">
                <button onClick={() => removeItem(track.id)}>
                    <p className="text-white hover:text-red-600 duration-300 ease-in-out transition-colors">Remove</p>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
