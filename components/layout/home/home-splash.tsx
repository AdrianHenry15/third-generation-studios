"use client";

import React from "react";
import Image from "next/image";
import "swiper/css";
import Link from "next/link";
import { motion } from "framer-motion";

import Logo from "@/public/logos/new-logo-trans.png";

const HomeSplash = () => {
    // Constants
    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the component is visible
            transition={{ duration: 2, delay: 0.1 }} // Adjust delay for fade-in effect
        >
            <div className="w-full self-center text-white h-screen flex">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Image className="w-[750px]" src={Logo} alt="logo" />
                    <Link
                        className="flex z-50 text-zinc-300 border-white border-2 text-lg px-12 py-[10px] rounded-sm self-center items-center justify-center ease-in-out duration-500 hover:bg-white"
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
