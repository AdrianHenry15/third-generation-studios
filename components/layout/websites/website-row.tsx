"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import WebsiteRowItem from "./website-row-item";
import { ClientWebsites } from "@/lib/websites";

const WebsiteRow = () => {
    return (
        <div className="relative h-max py-4">
            <h2 className="text-white font-bold text-xl lg:text-2xl py-2">All Websites</h2>
            <div className="relative flex group items-center">
                <div className="w-full h-max overflow-hidden flex scroll-smooth relative">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            375: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            580: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            1043: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            1490: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <ul>
                            {ClientWebsites.map((item) => (
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
