"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";

import { ClientWebsites } from "@/lib/websites";
import Logo from "@/public/logos/thirdgenstudios-logo.png";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { truncateString } from "@/lib/helpers";

const WebsiteSplash = () => {
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
                    {ClientWebsites.map((website) => (
                        <SwiperSlide key={website.id}>
                            <div className="absolute w-full h-[750px] bg-gradient-to-r from-black"></div>
                            <div className="w-full h-full flex justify-center items-center">
                                <Image
                                    width={1000}
                                    height={1000}
                                    className="w-full object-cover h-[50%] md:h-[50%] md:w-[66%] lg:h-[60%] lg:w-[50%]"
                                    src={website.img}
                                    alt={website.title}
                                />
                            </div>
                            <div className="absolute w-full top-[37%] left-10 p-4 md:top-[35%] md:p-8">
                                <Image src={Logo} alt="logo" className="w-24 py-2" />
                                <h1 className="text-white text-[30px] md:text-5xl">{website.title}</h1>
                                <div className="my-4">
                                    <Link
                                        target="_blank"
                                        href={website.link}
                                        className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
                                    >
                                        Go To Website
                                    </Link>
                                    <Link href={"/contact-us"} className="border text-white border-gray-300 py-2 px-5 ml-4">
                                        Make Inquiry
                                    </Link>
                                </div>
                                <p className="text-gray-400 text-sm">Released: {website.release_date}</p>
                                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                                    {truncateString(website.overview!, 150)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default WebsiteSplash;
