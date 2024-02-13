"use client";

import Image from "next/image";
import React from "react";

import { IoShareOutline } from "react-icons/io5";

import TrackDetails from "./track-details";
import TrackInfoMobileOverlay from "./track-info-mobile-overlay";
import PlayButton from "@/components/action-overlay/play-button";
import { useTrackStore } from "stores/track-store";
import Licensing from "./licensing";

const TrackItem = () => {
    const { currentTrack } = useTrackStore();
    return (
        <article className="flex flex-col lg:px-4">
            {/* TRACK INFO */}
            <header className="md:bg-zinc-900 md:my-2 md:rounded-lg md:p-4 md:m-4">
                {/* TRACK IMAGE AND INFO */}
                <figure className="relative md:h-[50%]">
                    {/* BG SHADOW OVERLAY  */}
                    <div className="flex items-center justify-center md:justify-normal">
                        <div className="relative lg:mr-4">
                            <div className="absolute w-full h-full bg-gradient-to-r from-black md:w-[95%] md:hidden"></div>
                            <Image
                                loading="lazy"
                                className="object-cover w-full h-[50%] md:w-[175px] md:h-min"
                                src={currentTrack.img}
                                alt="track-image"
                            />
                            <PlayButton className="hidden md:flex" currentTrack={currentTrack} />
                        </div>
                        {/* TRACK INFO ON MED AND ABOVE SCREENS */}
                        <figcaption className="hidden md:flex md:flex-col md:ml-4">
                            {/* TRACK TITLE */}
                            <h1 className="text-white text-4xl">{currentTrack.title}</h1>
                            {/* ARTIST */}
                            <p>{currentTrack.artist.title}</p>
                        </figcaption>
                    </div>

                    {/* TRACK INFO MOBILE OVERLAY */}
                    <TrackInfoMobileOverlay />
                </figure>

                {/* ACTION SECTION */}
                {/* <div className="flex justify-center items-center py-10 px-4 lg:hidden">
                    <div className="flex"> */}
                {/* TODO: SHARE BUTTON */}
                {/* <IoShareOutline className="text-white mr-2" size={25} />
                    </div>
                </div> */}
            </header>
            {/* BUY BUTTON */}
            {/* <button className="flex justify-center items-center bg-blue-500 w-11/12 self-center py-2 rounded-lg my-2">
                <AiOutlineShoppingCart className="text-white mr-2" />
                <p className="text-white">Buy For ${currentTrack.price}.00</p>
            </button> */}
            {/* TRACK DETAILS HEADER */}
            <TrackDetails />
            {/* LICENSING */}
            {/* <Licensing /> */}
        </article>
    );
};

export default TrackItem;
