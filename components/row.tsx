"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./item";

interface IMusicRowProps {
    title: string;
    item: any[];
}

const Row: React.FC<IMusicRowProps> = ({ title, item }) => {
    return (
        <div className="relative h-max px-10 py-6">
            <h2 className="text-white font-bold md:text-xl py-2">{title}</h2>
            <div className="relative flex group items-center">
                <div className="w-full h-max overflow-hidden flex scroll-smooth relative">
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
                            {item.map((item, id) => (
                                <SwiperSlide key={id}>
                                    <Item title={item.title} img={item.img} />
                                </SwiperSlide>
                            ))}
                        </ul>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Row;
