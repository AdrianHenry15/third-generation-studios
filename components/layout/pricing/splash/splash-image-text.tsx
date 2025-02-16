"use client";

import React from "react";
import { motion } from "framer-motion";

const SplashImageText = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full z-50 text-center space-y-8">
            <motion.h5
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white text-6xl md:text-7xl font-bold"
            >
                Studio Commerce
            </motion.h5>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black rounded-full w-[70%] md:w-[40%] lg:w-[20%] py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
                Get Studio Commerce
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white border border-white rounded-full w-[70%] md:w-[40%] lg:w-[20%] py-3 font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
                See All Plans
            </motion.button>
        </div>
    );
};

export default SplashImageText;
