"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieItem from "./movie-item";

interface RowProps {
    title: string;
    fetchURL: string;
}

const MovieRow: React.FC<RowProps> = ({ title, fetchURL }) => {
    const [movies, setMovies] = useState<any[]>([]); // Adjust 'any' to the actual type of your movie data

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results);
        });
    }, [fetchURL]);

    return (
        <div className="relative h-max px-10">
            <h2 className="text-white font-bold text-xl lg:text-2xl py-2">{title}</h2>
            <div className="relative flex group items-center">
                <div className="w-full h-full overflow-hidden flex scroll-smooth relative">
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
                            {movies.map((item, id) => (
                                <SwiperSlide key={id}>
                                    <MovieItem img={item.backdrop_path} title={item.title} />
                                </SwiperSlide>
                            ))}
                        </ul>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MovieRow;
