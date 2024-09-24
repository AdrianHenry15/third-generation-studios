"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import Link from "next/link";

import { ClientWebsites } from "@/lib/websites";

import Logo from "@/public/logos/new-logo-trans.png";

import "swiper/css";

const WebsiteSplash = () => {
    return (
        <div className="w-full self-center text-white md:h-screen">
            <div className="w-full md:h-full">
                <Swiper
                    modules={[A11y, Autoplay]}
                    centeredSlides={true}
                    className="w-full h-full"
                    navigation
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                >
                    {ClientWebsites.map((website) => (
                        <SwiperSlide key={website.id}>
                            <div className="hidden absolute w-full bg-gradient-to-r from-black h-screen md:flex"></div>
                            <div className="flex justify-center items-center self-center w-full md:h-full">
                                <Image
                                    className="object-cover w-full h-[300px] md:w-full md:h-full"
                                    src={website.img}
                                    alt={website.title}
                                />
                            </div>

                            <div className="w-full top-[35%] p-4 left-10 md:absolute md:top[35%] md:p-8">
                                <span>
                                    <Image src={Logo} alt="logo" className="w-24 py-2" />
                                </span>
                                <h1 className="text-white text-[30px] md:text-5xl">{website.title}</h1>
                                <div className="my-4">
                                    <Link
                                        target="_blank"
                                        href={website.link}
                                        className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
                                    >
                                        Go To Website
                                    </Link>
                                    <Link href={"/contact-us"} className="border text-white border-gray-300 py-2 px-5 ml-4">
                                        Make Inquiry
                                    </Link>
                                </div>
                                <p className="text-gray-400 text-sm">{website.release_date}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default WebsiteSplash;
