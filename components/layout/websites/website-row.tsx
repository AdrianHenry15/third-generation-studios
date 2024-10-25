"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import WebsiteRowItem from "./website-row-item";

import logoImage from "@/public/logos/new-logo-trans.png";
import Image from "next/image";

interface IWebsiteRowProps {
    title: string;
    items: any[];
}

const WebsiteRow = (props: IWebsiteRowProps) => {
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
            <div className="relative flex group items-center">
                <div className="w-full h-max overflow-hidden flex scroll-smooth relative">
                    <Swiper
                        slidesPerView={5.3}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            375: {
                                slidesPerView: 2.3,
                                spaceBetween: 10,
                            },
                            580: {
                                slidesPerView: 3.3,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4.3,
                                spaceBetween: 10,
                            },
                            1043: {
                                slidesPerView: 5.3,
                                spaceBetween: 10,
                            },
                            1490: {
                                slidesPerView: 5.3,
                                spaceBetween: 10,
                            },
                        }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <ul>
                            {props.items.map((item) => (
                                <SwiperSlide className="py-10 mx-2" key={item.id}>
                                    <WebsiteRowItem currentWebsite={item} />
                                </SwiperSlide>
                            ))}
                        </ul>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default WebsiteRow;
