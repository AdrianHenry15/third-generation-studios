"use client";

import Image from "next/image";
import React, { useState } from "react";

import { IoShareOutline } from "react-icons/io5";

import PlayButton from "@/components/action-overlay/play-button";
import { useTrackStore } from "stores/track-store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const TrackItem = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { currentTrack } = useTrackStore();
    return (
        <article className="flex flex-col">
            {/* TRACK INFO */}
            <header className="">
                {/* TRACK IMAGE AND INFO */}
                <figure className="relative">
                    {/* BG SHADOW OVERLAY  */}
                    <div className="absolute w-full h-full bg-gradient-to-r from-black lg:hidden"></div>
                    <Image className="object-cover w-full h-[50%]" src={currentTrack.img} alt="track-image" />
                    {/* TRACK INFO MOBILE OVERLAY */}
                    <div>
                        {/* PLAY BUTTON */}
                        <PlayButton className="" currentTrack={currentTrack} />
                        <figcaption className="absolute bottom-0">
                            {/* TRACK TITLE */}
                            <h1 className="text-white text-4xl">{currentTrack.title}</h1>
                            {/* ARTIST */}
                            <p className="text-gray-400 font-semibold">{currentTrack.artist.title}</p>
                        </figcaption>
                    </div>
                </figure>
            </header>
            {/* ACTION SECTION */}
            <div className="flex justify-center items-center py-10 px-4 lg:hidden">
                <div className="flex">
                    {/* TODO: SHARE BUTTON */}
                    <IoShareOutline className="text-white mr-2" size={25} />
                </div>
            </div>
            {/* BUY BUTTON */}
            {/* <button className="flex justify-center items-center bg-blue-500 w-11/12 self-center py-2 rounded-lg my-2">
                <AiOutlineShoppingCart className="text-white mr-2" />
                <p className="text-white">Buy For ${currentTrack.price}.00</p>
            </button> */}
            {/* TRACK DETAILS */}
            <div className="bg-zinc-900 text-white flex flex-col p-4 m-2 rounded-md lg:hidden">
                <div className="flex items-center justify-between border-b-[1px] border-zinc-700 pb-2">
                    <h5 className="text-xl text-white">Track Details</h5>
                    {dropdownOpen ? (
                        <BiChevronUp onClick={() => setDropdownOpen(false)} size={35} />
                    ) : (
                        <BiChevronDown onClick={() => setDropdownOpen(true)} size={35} />
                    )}
                </div>
                {dropdownOpen && (
                    <div className="border-b-[1px] border-zinc-700 py-4">
                        <h5 className="text-xs text-zinc-700 mb-4 font-semibold">INFORMATION</h5>
                        {/* PUBLISH/RELEASE DATE */}
                        <div className="flex justify-between my-2">
                            <h4 className="text-white">Published</h4>
                            <p>{currentTrack.release_date}</p>
                        </div>
                        {/* BPM */}
                        <div className="flex justify-between my-2">
                            <h4 className="text-white">BPM</h4>
                            <p>{currentTrack.bpm}</p>
                        </div>
                        {/* KEY */}
                        <div className="flex justify-between my-2">
                            <h4 className="text-white">Key</h4>
                            <p>{currentTrack.key}</p>
                        </div>
                        {/* TODO:PLAYS */}
                    </div>
                )}
            </div>
            {/* INFORMATION */}
            <div>
                <h5 className="text-white">INFORMATION</h5>
                {/* PUBLISHED */}
                <div></div>
                {/* BPM */}
                <div></div>
                {/* KEY */}
                <div></div>
                {/* PLAYS */}
                <div></div>
            </div>
            {/* ABOUT */}
            <div>
                <h5 className="text-white">ABOUT</h5>
            </div>
        </article>
    );
};

export default TrackItem;
