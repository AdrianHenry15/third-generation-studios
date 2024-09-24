"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "swiper/css";
import Link from "next/link";
import { motion } from "framer-motion";

import Logo from "@/public/logos/thirdgenstudios-logo.png";

const HomeSplash = () => {
    // Constants
    const itemVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger when 30% of the component is visible
            transition={{ duration: 0.8, delay: 0.1 }} // Adjust delay for staggered effect
        >
            <div className="w-full self-center text-white h-screen flex">
                <div className="w-full h-[80%] flex flex-col items-center justify-center">
                    <Image className="px-14 md:px-64 lg:px-52 xl:px-[500px]" src={Logo} alt="logo" />
                    <Link
                        className="flex mt-48 text-zinc-300 border-white border-2 text-lg px-12 py-[10px] absolute rounded-sm self-center items-center justify-center ease-in-out duration-200 hover:bg-gray-900"
                        href={"/websites"}
                    >
                        Enter
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default HomeSplash;
