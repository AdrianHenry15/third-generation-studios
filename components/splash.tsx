"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Category } from "@/lib/types";
import Logo from "@/public/logos/thirdgenstudios-logo.png";

interface ISplashProps {
    items: [];
    category: Category;
    fetchUrl: string;
    img: any;
}

const Splash = (props: ISplashProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // get movies from api
    const [items, setItems] = useState<any[]>([]);

    // get data for movies from api
    useEffect(() => {
        axios.get(props.fetchUrl).then((response) => {
            setItems(response.data.results);
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
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="absolute w-full h-[750px] bg-gradient-to-r from-black"></div>
                            <Image
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover object-top"
                                src={`${
                                    props.category === Category.MOVIE
                                        ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}`
                                        : props.img
                                }`}
                                alt={item?.title}
                            />
                            <div className="absolute w-full top-[30%] p-4 md:p-8">
                                <Image src={Logo} alt="logo" className="w-24 py-2" />
                                <h1 className="text-white text-3xl md:text-5xl">{item?.title}</h1>
                                <div className="my-4">
                                    <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
                                    <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Watch Later</button>
                                </div>
                                <p className="text-gray-400 text-sm">Released: {item?.release_date}</p>
                                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                                    {truncateString(item?.overview, 150)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Splash;
