"use client";

import { useEffect, useRef } from "react";

import HomeSplash from "@/components/layout/home/home-splash";
import Link from "next/link";

export default function HomePage() {
    const LinkClass = "text-white text-[100px] transition-all duration-300 ease-in-out hover:scale-105 hover:text-red-600 font-bold";
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
        <section className="bg-black flex flex-col">
            {/* SPLASH */}
            <HomeSplash />
            <div ref={containerRef} className="fade-in flex items-center justify-evenly pb-48">
                <Link href={"/websites"}>
                    <h1 className={LinkClass}>Websites</h1>
                </Link>
                <Link href={"/music"}>
                    <h1 className={LinkClass}>Music</h1>
                </Link>
            </div>
        </section>
    );
}
