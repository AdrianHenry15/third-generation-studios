import Image from "next/image";
import React from "react";
import Link from "next/link";

import { BsDot } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";

import PlayButton from "@/components/action-overlay/play-button";
import { SongType } from "@/lib/types";
import ImageContainer from "@/components/containers/image-container";
import { useTrackStore } from "stores/track-store";

interface ITrackRowItemProps {
    currentTrack: SongType;
}

const TrackRowItem = (props: ITrackRowItemProps) => {
    const { setCurrentTrack } = useTrackStore();
    return (
        <figure className="flex flex-col">
            {/* HOVER CONTAINER */}
            <div className="p-4 ease-in-out transition-colors duration-300 hover:bg-gray-900 rounded-lg">
                {/* IMAGE CONTAINER  */}
                <div className="relative">
                    {/* IMAGE */}
                    <ImageContainer>
                        <Link onClick={() => setCurrentTrack(props.currentTrack)} href={`/music/track/${props.currentTrack.id}`}>
                            <Image className="object-cover rounded-md" src={props.currentTrack.img} alt={props.currentTrack.title} />
                        </Link>
                    </ImageContainer>
                    {/* PLAY BUTTON */}
                    <span className="cursor-pointer">
                        <PlayButton currentTrack={props.currentTrack} />
                    </span>
                </div>
                {/* ITEM INFO */}
                <figcaption className="flex flex-col">
                    {/* ROW 1 */}
                    <div className="flex flex-col justify-start mt-2 lg:items-center lg:flex-row">
                        <div className="flex">
                            {/* PRICE */}
                            <p className="text-blue-600 font-semibold">{"$" + props.currentTrack.price + ".00"}</p>
                            {/* DOT DIVIDER */}
                            <BsDot size={20} className="text-gray-500 hidden md:flex" />
                            {/* TODO: IF FREE RENDER FREE ICON */}
                            {props.currentTrack.isFree && (
                                <div className="flex items-center ml-2 text-[8px] font-semibold hover:border-zinc-700 hover:border-[1px] transition-all duration-300 ease-in-out  px-2 rounded-full md:ml-0">
                                    <IoMdDownload className="mr-[1px] text-red-400" size={10} />
                                    <p className="text-red-400">FREE</p>
                                </div>
                            )}
                        </div>
                        {/* DOT DIVIDER */}
                        <div>
                            <BsDot size={20} className="text-gray-500 hidden md:flex" />
                        </div>
                        {/* TEMPO */}
                        <div>
                            <p className="text-gray-600 hidden md:flex">{props.currentTrack.bpm}</p>
                        </div>
                    </div>
                    {/* ROW 2 */}
                    <div className="flex items-start my-2 flex-col md:items-center md:flex-row">
                        {/* TRACK TITLE */}
                        <Link href={`/music/track/${props.currentTrack.id}`}>
                            <h5 className="text-white font-semibold hover:underline underline-offset-4">{props.currentTrack.title}</h5>
                        </Link>
                        {/* DOT DIVIDER */}
                        <BsDot size={20} className="text-gray-500 hidden md:flex" />
                        {/* KEY */}
                        <div className="items-center hidden md:flex">
                            <p className="text-gray-600 text-xs underline-offset-4 underline">{props.currentTrack.key}</p>
                        </div>
                    </div>
                    {/* ROW 3 */}
                    <Link className="w-min flex" href={`/music/${props.currentTrack.artist.title}`}>
                        <p className="text-sm font-semibold hover:underline underline-offset-4">{props.currentTrack.artist.title}</p>
                    </Link>
                </figcaption>
            </div>
        </figure>
    );
};

export default TrackRowItem;
