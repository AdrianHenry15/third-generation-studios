"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

import Logo from "@/public/logos/thirdgenstudios-logo.png";

import "swiper/css";

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
        <div className="w-full self-center text-white h-screen flex">
            <div ref={containerRef} className="fade-in w-full h-[80%] flex items-center justify-center">
                <Image className="px-14 md:px-64 lg:px-52 xl:px-[500px]" src={Logo} alt="logo" />
            </div>
        </div>
    );
};

export default HomeSplash;
