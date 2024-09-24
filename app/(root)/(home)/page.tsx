"use client";

import AnimatedDots from "@/components/animated-dots";
import HomeSplash from "@/components/layout/home/home-splash";

export default function HomePage() {
    return (
        <section className="bg-black flex flex-col">
            {/* SPLASH */}
            <HomeSplash />
            {/* <AnimatedDots /> */}
        </section>
    );
}
