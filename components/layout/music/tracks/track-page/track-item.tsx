"use client";

import Image from "next/image";
import React from "react";
import { useTrackStore } from "stores/track-store";

const TrackItem = () => {
    const { currentTrack } = useTrackStore();
    return (
        <article className="flex flex-col">
            {/* TRACK INFO */}
            <header>
                {/* TRACK IMAGE */}
                <figure>
                    <Image src={currentTrack.img} alt="track-image" />
                </figure>
                {/* TRACK TITLE */}
                <h1 className="text-white">{currentTrack.title}</h1>
                {/* ARTIST */}
                <p className="text-white">{currentTrack.artist.title}</p>
                <div>
                    {/* LIKE */}
                    <div></div>
                    {/* DOWNLOAD */}
                    <div></div>
                </div>
            </header>
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
