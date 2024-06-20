"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

import PlayButton from "@/components/action-overlay/play-button";
import { SongType } from "@/lib/types";
import { useTrackStore } from "stores/track-store";
import { useCartStore } from "stores/cart-store";

interface ITrackRowItemProps {
    track: SongType;
}

const TrackRowItem = (props: ITrackRowItemProps) => {
    const { setCurrentTrack } = useTrackStore();
    const { addItem, items } = useCartStore();

    return (
        <figure className="flex flex-col">
            {/* HOVER CONTAINER */}
            <div className="p-4 ease-in-out transition-colors duration-300 hover:bg-gray-900 rounded-lg">
                {/* IMAGE CONTAINER  */}
                <div className="relative flex aspect-square">
                    {/* IMAGE */}
                    <div>
                        <Link onClick={() => setCurrentTrack(props.track)} href={`/music/track/${props.track.id}`}>
                            <Image
                                loading="lazy"
                                className="object-cover w-full h-full rounded-md"
                                src={props.track.img}
                                alt={props.track.title}
                            />
                        </Link>
                    </div>
                    {/* PLAY BUTTON */}
                    <span className="cursor-pointer">
                        <PlayButton currentTrack={props.track} />
                    </span>
                </div>
                {/* ITEM INFO */}
                <figcaption className="flex flex-col">
                    {/* PRICE */}
                    <span className="flex justify-between items-center">
                        <h5 className="text-white">${props.track.price}.00</h5>
                        <span>
                            <p className="text-sm text-gray-500">{props.track.price === 0 ? "Free" : ""}</p>
                        </span>
                    </span>
                    {/* TRACK TITLE */}
                    <div className="flex items-start my-2 flex-col md:items-center md:flex-row">
                        <Link href={`/music/track/${props.track.id}`}>
                            <h5 className="text-white font-semibold hover:underline underline-offset-4">{props.track.title}</h5>
                        </Link>
                    </div>
                    {/* ARTIST NAME */}
                    <Link className="w-min flex" href={`/music/artist/${props.track.artist.id}`}>
                        <p className="text-sm font-semibold hover:underline underline-offset-4">{props.track.artist.title}</p>
                    </Link>
                    {/* ATTRIBUTES */}
                    <div className="flex flex-col justify-start my-2 py-2 border-t-[1px] border-zinc-900 items-start">
                        {/* KEY */}
                        <span className="items-center flex mr-2 mb-2 p-2 bg-zinc-900 rounded-lg text-xs">
                            <h5 className="text-white mr-2">Key: </h5>
                            <p className="text-gray-400 text-xs">{props.track.key}</p>
                        </span>
                        {/* TEMPO */}
                        <span className="flex items-center p-2 bg-zinc-900 rounded-lg text-xs">
                            <h5 className="mr-2 text-white">Bpm: </h5>
                            <p className="text-gray-400 text-xs flex">{props.track.bpm}</p>
                        </span>
                    </div>
                </figcaption>
                <div className="flex w-full items-center justify-center">
                    <button
                        className={`${
                            items.find((item) => item.id === props.track.id)
                                ? "bg-red-600/75 cursor-not-allowed"
                                : "bg-blue-600 hover:scale-105"
                        } w-full items-center justify-center rounded-lg py-2 flex self-center text-center transition-all ease-in-out duration-300`}
                        onClick={() => addItem(props.track)}
                    >
                        <p className="text-sm text-white items-center">Add To Cart</p>
                    </button>
                </div>
            </div>
        </figure>
    );
};

export default TrackRowItem;
