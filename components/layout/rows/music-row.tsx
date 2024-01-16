"use client";

import React from "react";
import MusicProject from "../music/music-project";

import { MusicProjectType } from "@/lib/types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

interface IMusicRowProps {
    className?: string;
    projects: MusicProjectType[];
    title: string;
}

const MusicRow = (props: IMusicRowProps) => {
    return (
        <div className={`${props.className} flex flex-col overflow-x-scroll pb-10 my-10`}>
            <h5 className="text-white font-semibold mt-4 text-2xl">{props.title}</h5>
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
                        {props.projects.map((project) => (
                            <SwiperSlide key={project.id}>
                                <li className="relative max-w-[450px] flex-none xs:w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px]">
                                    <MusicProject project={project} />
                                </li>
                            </SwiperSlide>
                        ))}
                    </ul>
                </Swiper>
            </div>
        </div>
    );
};

export default MusicRow;
