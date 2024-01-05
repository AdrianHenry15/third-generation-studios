"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Project from "./project";

const Row = () => {
    return (
        <section className="bg-black text-white flex flex-col h-[300px] p-10">
            <h5 className="text-white font-semibold text-3xl">Websites</h5>
            <Swiper
                modules={[Navigation, A11y]}
                navigation
                className="overflow-scroll w-full"
                spaceBetween={0}
                slidesPerView={2}
                breakpoints={{
                    499: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                    1300: {
                        slidesPerView: 6,
                        spaceBetween: 50,
                    },
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <Project />
                </SwiperSlide>
                <SwiperSlide>
                    <Project />
                </SwiperSlide>
                <SwiperSlide>
                    <Project />
                </SwiperSlide>
                <SwiperSlide>
                    <Project />
                </SwiperSlide>
                ...
            </Swiper>
        </section>
    );
};

export default Row;
