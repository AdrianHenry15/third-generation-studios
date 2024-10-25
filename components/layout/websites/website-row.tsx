"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { motion } from "framer-motion";

import WebsiteRowItem from "./website-row-item";

import logoImage from "@/public/logos/glowCircle-trans.png";

interface IWebsiteRowProps {
    title: string;
    items: any[];
}

const WebsiteRow = (props: IWebsiteRowProps) => {
    // Variants for animation
    const itemVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="relative h-max py-4">
            <div className="flex flex-col justify-center items-center w-full py-24 md:py-48">
                {/* Description Title for specific category */}
                <h5 className="text-4xl flex items-center justify-center text-white w-full px-10 text-center font-semibold md:px-[300px]  ">
                    {props.title}
                </h5>
                {/* Brite Logo */}
                <div className="flex items-center justify-center w-full">
                    <div className="flex-shrink-0 p-4">
                        <Image src={logoImage} alt={`logo`} width={50} height={50} />
                    </div>
                </div>
            </div>
            <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.01 }} // Trigger when 10% of the component is visible
                transition={{ duration: 0.8, delay: 0.1 }} // Adjust delay for staggered effect
            >
                <Swiper
                    slidesPerView={5.3}
                    spaceBetween={10}
                    className="flex items-center overflow-x-hidden overflow-y-hidden px-6"
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        // For mobile screens smaller than 576px (very small mobile)
                        320: {
                            slidesPerView: 1,
                        },
                        // For mobile screens between 576px and 639px
                        576: {
                            slidesPerView: 1.5,
                        },
                        // When the window is 640px to 767px (small tablets or large mobile devices)
                        640: {
                            slidesPerView: 2,
                        },
                        // For screens between 768px and 1023px (medium to large tablets)
                        768: {
                            slidesPerView: 2.5,
                        },
                        // For screens between 1024px and 1279px (small desktops or laptops)
                        1024: {
                            slidesPerView: 3,
                        },
                        // For screens between 1280px and 1535px (larger desktops)
                        1280: {
                            slidesPerView: 4,
                        },
                        // For extra-large screens (1536px and up)
                        1536: {
                            slidesPerView: 4.5,
                        },
                    }}
                >
                    <ul>
                        {props.items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="flex-shrink-0">
                                    <WebsiteRowItem currentWebsite={item} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </ul>
                </Swiper>
            </motion.div>
        </div>
    );
};

export default WebsiteRow;
