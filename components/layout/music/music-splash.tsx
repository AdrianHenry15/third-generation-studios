"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";

import { truncateString } from "@/lib/helpers";

import { AllSearchTracks } from "@/lib/tracks";
import Logo from "@/public/logos/thirdgenstudios-logo.png";

import "swiper/css";
import "swiper/css/navigation";

const MusicSplash = () => {
    const containerRef = useRef<HTMLDivElement>(null);

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
                <Swiper
                    modules={[Navigation, A11y, Autoplay]}
                    className="h-full"
                    navigation
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                >
                    {AllSearchTracks.map((track) => (
                        <SwiperSlide key={track.id}>
                            <div className="absolute w-full h-[750px] bg-gradient-to-r from-black"></div>
                            <div className="w-full h-full flex justify-center items-center">
                                <Image
                                    width={1000}
                                    height={1000}
                                    className="w-full object-cover h-[50%] md:h-[50%] md:w-[66%] lg:h-[60%] lg:w-[50%]"
                                    src={track?.img}
                                    alt={track?.title}
                                />
                            </div>
                            <div className="absolute w-full top-[30%] left-10 p-4 md:p-8">
                                <Image src={Logo} alt="logo" className="w-24 py-2" />
                                <h1 className="text-white text-3x1 md:text-5xl">{track?.title}</h1>
                                <div className="my-4">
                                    <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
                                    <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Watch Later</button>
                                </div>
                                <p className="text-gray-400 text-sm">Released: {track?.release_date}</p>
                                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                                    {truncateString(track.overview!, 150)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MusicSplash;
