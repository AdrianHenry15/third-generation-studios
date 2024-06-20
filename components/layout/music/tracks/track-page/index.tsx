"use client";

import Image from "next/image";
import React from "react";

import TrackDetails from "./track-details";
import TrackInfoMobileOverlay from "./track-info-mobile-overlay";
import PlayButton from "@/components/action-overlay/play-button";
import { SongType } from "@/lib/types";
import Licensing from "@/components/licensing";

interface ITrackItemProps {
    track: SongType;
}

const TrackItem = (props: ITrackItemProps) => {
    return (
        <article className="flex flex-col">
            {/* TRACK INFO */}
            <header className="md:bg-zinc-900 md:my-2 md:rounded-lg p-4 mx-6">
                {/* TRACK IMAGE AND INFO */}
                <figure className="relative md:h-[50%]">
                    {/* BG SHADOW OVERLAY  */}
                    <div className="flex items-center justify-center md:justify-normal">
                        <div className="relative lg:mr-4">
                            <div className="absolute w-full h-full bg-gradient-to-r from-black md:w-[95%] md:hidden"></div>
                            <Image
                                loading="lazy"
                                className="object-cover w-full h-[50%] md:w-[175px] md:h-min"
                                src={props.track.img}
                                alt="track-image"
                            />
                            <PlayButton className="hidden md:flex" currentTrack={props.track} />
                        </div>
                        {/* TRACK INFO ON MED AND ABOVE SCREENS */}
                        <figcaption className="hidden md:flex md:flex-col md:ml-4">
                            {/* TRACK TITLE */}
                            <h1 className="text-white text-4xl">{props.track.title}</h1>
                            {/* ARTIST */}
                            <p>{props.track.artist.title}</p>
                        </figcaption>
                    </div>

                    {/* TRACK INFO MOBILE OVERLAY */}
                    <TrackInfoMobileOverlay />
                </figure>
            </header>
            <div className="p-6">
                {/* TRACK DETAILS HEADER */}
                <TrackDetails track={props.track} />
                {/* LICENSING */}
                <Licensing />
            </div>
        </article>
    );
};

export default TrackItem;
