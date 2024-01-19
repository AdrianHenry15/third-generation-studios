"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

import Logo from "@/public/logos/thirdgenstudios-logo.png";

import requests from "@/lib/movie-requests";
import { MovieType } from "@/lib/types";

const MovieSplash = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // get movies from api
    const [movies, setMovies] = useState<MovieType[]>([]);

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
        <div className="w-full h-[750px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[750px] bg-gradient-to-r from-black"></div>
                <Image
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover object-top"
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt={movie?.title}
                />
                <div className="absolute w-full top-[30%] p-4 md:p-8">
                    <Image src={Logo} alt="logo" className="w-24 py-2" />
                    <h1 className="text-white text-3x1 md:text-5xl">{movie?.title}</h1>
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
