"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

import { truncateString } from "@/lib/helpers";

import Logo from "@/public/logos/thirdgenstudios-logo.png";

import { useAudioPlayerStore } from "stores/audio-player-store";
import { useTrackStore } from "stores/track-store";
import { ArtistType, SongType } from "@/lib/types";

interface IArtistSplashProps {
    artist: ArtistType;
}

const ArtistSplash = (props: IArtistSplashProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { isPlaying, play, pause } = useAudioPlayerStore();
    const { setCurrentTrack } = useTrackStore();

    const handleClick = (currentTrack: SongType) => {
        if (isPlaying && currentTrack.id === currentTrack.id) {
            pause();
        } else {
            play(currentTrack);
            setCurrentTrack(currentTrack);
        }
    };

    useEffect(() => {
        const options = {
            threshold: 0.1, // Adjust the threshold as needed (percentage of element visibility)
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    containerRef.current?.classList.add("show");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);

    return (
        <div ref={containerRef} className="fade-in w-[100%] h-[750px] self-center text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[750px] bg-gradient-to-r from-black"></div>
                <div className="w-full h-full flex justify-center items-center">
                    <Image
                        className="w-full object-cover h-[50%] md:h-[50%] md:w-[66%] lg:h-[60%] lg:w-[50%]"
                        src={props.artist.img!}
                        alt={props.artist.title}
                    />
                </div>
                <div className="absolute w-full top-[37%] left-10 p-4 md:p-8">
                    <span>
                        <Image src={Logo} alt="logo" className="w-24 py-2" />
                    </span>
                    <h1 className="text-white text-3x1 md:text-5xl">{props.artist.title}</h1>
                    <div className="my-4">
                        <button
                            // onClick={() => handleClick()}
                            className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                        <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Watch Later</button>
                    </div>
                    <p className="text-gray-400 text-sm">Released: {props.artist.release_date}</p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                        {truncateString(props.artist.overview!, 150)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArtistSplash;
