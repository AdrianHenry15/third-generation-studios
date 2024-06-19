"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

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
        <div className="w-full self-center text-white h-screen flex">
            <div ref={containerRef} className="fade-in w-full h-[80%] flex flex-col items-center justify-center">
                <Image className="px-14 md:px-64 lg:px-52 xl:px-[500px]" src={Logo} alt="logo" />
                <Link
                    className="flex mt-48 text-zinc-300 border-white border-2 text-lg px-12 py-[10px] absolute rounded-xl self-center items-center justify-center ease-in-out duration-200 hover:bg-gray-900"
                    href={"/websites"}
                >
                    Enter
                </Link>
            </div>
        </div>
    );
};

export default HomeSplash;
