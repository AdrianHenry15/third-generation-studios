import Image from "next/image";
import React from "react";

import { BsDot } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";

import PlayButton from "@/components/action-overlay/play-button";
import { Category } from "@/lib/types";
import ImageContainer from "@/components/containers/image-container";

interface ITrackItemProps {
    category: Category;
    trackId: string;
    audioFile: string;
    artistName: string;
    trackImg: any;
    trackTitle: string;
    isFree: boolean;
    price: number;
    bpm: string;
    trackScale: string;
}

const TrackItem = (props: ITrackItemProps) => {
    return (
        <figure className="flex flex-col">
            {/* HOVER CONTAINER */}
            <div className="p-4 ease-in-out transition-colors duration-300 hover:bg-gray-900 rounded-lg cursor-pointer">
                {/* IMAGE CONTAINER  */}
                <div className="relative">
                    {/* IMAGE */}
                    <ImageContainer>
                        <Image className="object-cover rounded-md" src={props.trackImg} alt={props.trackId} />
                    </ImageContainer>
                    {/* PLAY BUTTON */}
                    <span className="cursor-pointer">
                        <PlayButton
                            currentCategory={props.category}
                            currentItemId={props.trackId}
                            currentAudioFile={props.audioFile}
                            currentArtistName={props.artistName}
                            currentItemImg={props.trackImg}
                            currentItemTitle={props.trackTitle}
                        />
                    </span>
                </div>
                {/* ITEM INFO */}
                <figcaption className="flex flex-col">
                    {/* ROW 1 */}
                    <div className="flex flex-col justify-start mt-2 md:items-center md:flex-row">
                        <div className="flex">
                            {/* PRICE */}
                            <p className="text-blue-600 font-semibold">{"$" + props.price + ".00"}</p>
                            {/* DOT DIVIDER */}
                            <BsDot size={20} className="text-gray-500" />
                            {/* TODO: IF FREE RENDER FREE ICON */}
                            {props.isFree && (
                                <div className="flex items-center text-[10px] font-semibold bg-red-900 bg-transparent-75 px-2 rounded-full">
                                    <IoMdDownload className="mr-[1px] text-red-400" size={10} />
                                    <p className="text-red-400">FREE</p>
                                </div>
                            )}
                        </div>
                        {/* DOT DIVIDER */}
                        <BsDot size={20} className="text-gray-500" />
                        {/* TEMPO */}
                        <div>
                            <p className="text-gray-600">{props.bpm}</p>
                        </div>
                    </div>
                    {/* ROW 2 */}
                    <div className="flex items-start my-2 flex-col md:items-center md:flex-row">
                        {/* TRACK TITLE */}
                        <h5 className="text-white font-semibold">{props.trackTitle}</h5>
                        {/* DOT DIVIDER */}
                        <BsDot size={20} className="text-gray-500 hidden md:flex" />
                        {/* KEY */}
                        <div className="flex items-center">
                            <p className="text-gray-600 text-xs underline-offset-4 underline">{props.trackScale}</p>
                        </div>
                    </div>
                    {/* ROW 3 */}
                    <div>
                        <p className="text-sm font-semibold">{props.artistName}</p>
                    </div>
                </figcaption>
            </div>
        </figure>
    );
};

export default TrackItem;
