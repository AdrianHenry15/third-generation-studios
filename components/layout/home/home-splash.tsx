"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

import { ClientWebsites } from "@/lib/websites";

import Logo from "@/public/logos/thirdgenstudios-logo.png";

import "swiper/css";
import Link from "next/link";

const HomeSplash = () => {
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
        <div className="w-full self-center text-white h-screen">
            <div className="w-full h-full">
                <Swiper
                    modules={[A11y, Autoplay]}
                    centeredSlides={true}
                    className="w-full h-full"
                    navigation
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                >
                    {ClientWebsites.map((website) => (
                        <SwiperSlide key={website.id}>
                            <div className="absolute w-full bg-gradient-to-r from-black h-screen"></div>
                            <div className="w-full h-full flex justify-center items-center">
                                <Image className="w-full h-full object-cover" src={website.img} alt={website.title} />
                            </div>
                            <div className="absolute w-full top-[35%] p-4 left-10 md:top[35%] md:p-8">
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
                                <p className="text-gray-400 text-sm">{website.release_date}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSplash;
