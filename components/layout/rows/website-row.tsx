"use client";

import React from "react";

import { WebsiteProjectType } from "@/lib/types";
import WebsiteItem from "../websites/website-item";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

interface IWebsiteRowProps {
    item: WebsiteProjectType[];
    name: string;
}

const WebsiteRow = (props: IWebsiteRowProps) => {
    return (
        <section className="bg-black relative text-white flex flex-col h-min-content p-10">
            <h5 className="text-white font-semibold text-3xl">{props.name}</h5>
            <div className="w-full overflow-x-auto scrollbar-hide">
                <Swiper
                    slidesPerView={1}
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
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1043: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1490: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <ul className="flex">
                        {props.item.map((project) => (
                            <SwiperSlide key={project.title}>
                                <li className="relative max-w-[450px] flex-none xs:w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px]">
                                    <WebsiteItem item={project} />
                                </li>
                            </SwiperSlide>
                        ))}
                    </ul>
                </Swiper>
            </div>
        </section>
    );
};

export default WebsiteRow;
