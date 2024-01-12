"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import requests from "@/lib/movie-requests";

interface Movie {
    backdrop_path: string;
    title: string;
    release_date: string;
    overview: string;
}

interface IMovieSplashProps {
    // item: any;
    imgClass?: string;
}

const MovieSplash = (props: IMovieSplashProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // get movies from api
    const [movies, setMovies] = useState<Movie[]>([]);

    // randomly choose which movie to get data from
    const movie = movies[Math.floor(Math.random() * movies.length)];

    // get data for movies from api
    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results);
        });
    }, []);

    useEffect(() => {
        const options = {
            threshold: 0.1, // Adjust the threshold as needed (percentage of element visibility)
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    containerRef.current?.classList.add("show");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);

    // no full paragraph, includes elipsis
    const truncateString = (str: string, num: number) => {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        }
    };

    return (
        // <section ref={containerRef} className="fade-in relative flex w-full overflow-hidden bg-black h-[550px] bg-gradient-to-r from-black">
        //     {/* <Swiper spaceBetween={0} slidesPerView={1} navigation modules={[Navigation, A11y]}> */}
        //     {/* <SwiperSlide> */}
        //     <div>
        //         <Image
        //             width={1000}
        //             height={1000}
        //             quality={100}
        //             className="object-fit object-top"
        //             loading="eager"
        //             // className={`${props.imgClass} `}
        //             src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        //             alt={movie?.title}
        //         />
        //     </div>

        //     {/* Text overlay */}
        //     <div
        //         className={`absolute w-full flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-around flex-col items-center`}
        //     >
        //         <h5 className={`font-semibold tracking-wider underline-offset-2 italic text-5xl p-4 text-white drop-shadow-xl`}>
        //             {movie?.title}
        //         </h5>
        //     </div>
        //     {/* </SwiperSlide> */}
        //     {/* </Swiper> */}
        // </section>
        <div className="w-full h-[550px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                {/* src=backdrop path */}
                <Image
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt={movie?.title}
                />
                <div className="absolute w-full top-[20%] p-4 md:p-8">
                    <h1 className="text-3x1 md:text-5xl">{movie?.title}</h1>
                    <div className="my-4">
                        <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
                        <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Watch Later</button>
                    </div>
                    <p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                        {truncateString(movie?.overview, 150)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieSplash;
