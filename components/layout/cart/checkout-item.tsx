import { SongType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

interface ICheckoutItemProps {
    item: SongType;
    removeItem: () => void;
}

const CheckoutItem = (props: ICheckoutItemProps) => {
    return (
        <div className="flex flex-col py-10 border-b-[1px] border-zinc-600 mx-4">
            {/* ARTIST */}
            <div className="flex items-center mb-4">
                <div className="w-8 h-8">
                    <Image className="object-cover w-full h-full rounded-full" src={props.item.artist.img} alt="artist-img" />
                </div>
                <h5 className="text-zinc-400 text-lg ml-2">{props.item.artist.title}</h5>
            </div>
            {/* TRACK ITEM */}
            <div className="flex items-center my-2 w-full">
                <div className="w-24">
                    <Image className="object-cover aspect-square w-full h-full" src={props.item.img} alt={props.item.title} />
                </div>
                <div className="flex flex-col ml-4">
                    <p className="text-white">{props.item.title}</p>
                    <p>${props.item.price.toFixed(2)}</p>
                </div>
                <button className="flex w-full justify-end" onClick={() => props.removeItem}>
                    <IoClose
                        className="text-white
                    "
                        size={20}
                    />
                </button>
            </div>
        </div>
    );
};

export default CheckoutItem;
