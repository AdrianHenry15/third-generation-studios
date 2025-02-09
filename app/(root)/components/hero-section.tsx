import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/button";

const HeroSection = () => {
    return (
        <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center p-6 space-y-6">
            <motion.h1
                className="text-6xl font-extrabold tracking-wide text-gray-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Third Generation Studios
            </motion.h1>
            <motion.p
                className="text-xl max-w-2xl leading-relaxed text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Elevate your brand with
                <span className="text-white font-semibold"> cutting-edge website development</span> and
                <span className="text-white font-semibold"> world-class music production.</span>
            </motion.p>
            <motion.div
                className="mt-8 flex items-center"
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
