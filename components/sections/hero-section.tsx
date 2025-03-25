"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/button";
import Image from "next/image";
import Splash from "@/public/earth-splash.jpg";

const HeroSection = () => {
    return (
        <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center p-6 space-y-6">
            {/* Background Image and Animation */}
            <div className="absolute inset-0 z-0">
                {/* Background Image using Next.js Image component */}
                <div className="w-full h-full relative">
                    <Image
                        src={Splash} // Replace with your image path
                        alt="bg-image"
                        className="opacity-50 object-cover object-center h-full"
                        quality={100} // Optional: controls image quality
                    />
                    {/* Background Animation */}
                    <motion.div
                        className="w-full h-full bg-gradient-to-b from-gray-900 to-black"
                        animate={{ opacity: [0.6, 0.8, 0.6] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                </div>
            </div>
            <motion.h1
                className="text-6xl z-10 font-extrabold tracking-wide text-gray-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Third Generation Studios
            </motion.h1>
            <motion.p
                className="text-xl z-10 max-w-2xl leading-relaxed font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Elevate your brand with
                <span className="text-white font-semibold"> cutting-edge website development</span> and
                <span className="text-white font-semibold"> world-class music production.</span>
            </motion.p>
            <motion.div
                className="mt-8 z-10 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <Button className="bg-white text-black" name="Websites" />
                <Button className="bg-gray-800 ml-4 text-white border-gray-900 border-[1px]" name="Music" />
            </motion.div>
        </section>
    );
};

export default HeroSection;
