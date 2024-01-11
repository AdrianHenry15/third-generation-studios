"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface IMovieSplashProps {
    item: any;
    imgClass?: string;
}

const MovieSplash = (props: IMovieSplashProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

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

    return (
        <section ref={containerRef} className="fade-in relative flex w-full bg-black">
            <Swiper spaceBetween={0} slidesPerView={1} navigation modules={[Navigation, A11y]}>
                <SwiperSlide>
                    <Image
                        width={1000}
                        height={1000}
                        priority
                        loading="eager"
                        className={`${props.imgClass} object-cover w-full h-[80vh] md:h-[80vh] lg:h-[75vh] opacity-75`}
                        src={`https://image.tmdb.org/t/p/w500/${props.item?.backdrop_path}`}
                        alt={props.item.name}
                    />

                    {/* Text overlay */}
                    <div
                        className={`absolute w-full flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-around flex-col items-center`}
                    >
                        <h5 className={`font-semibold tracking-wider underline-offset-2 italic text-5xl p-4 text-white drop-shadow-xl`}>
                            {props.item.name}
                        </h5>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default MovieSplash;
