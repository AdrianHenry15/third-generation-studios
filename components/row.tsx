"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./item";
import axios from "axios";
import { Category } from "@/lib/types";

interface IMusicRowProps {
    title: string;
    item?: any[];
    fetchURL?: string;
    category: Category;
}

const Row: React.FC<IMusicRowProps> = ({ title, item, fetchURL, category }) => {
    const [items, setItems] = useState<any[]>([]); // Adjust 'any' to the actual type of your movie data

    const ItemList = item ? item : [];

    useEffect(() => {
        if (fetchURL) {
            axios.get(fetchURL).then((response) => {
                setItems(response.data.results);
            });
        }
    }, [fetchURL]);

    return (
        <div className="relative h-max px-4 py-4 md:px-10">
            <h2 className="text-white font-bold text-xl lg:text-2xl py-2">{title}</h2>
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
                        {/* MOVIE ITEM */}
                        {category === Category.MOVIE ? (
                            <ul>
                                {items.map((item, id) => (
                                    <SwiperSlide key={id}>
                                        <Item itemID={item.id} itemType={category} title={item.title} img={item.backdrop_path} />
                                    </SwiperSlide>
                                ))}
                            </ul>
                        ) : (
                            // MUSIC, WEBSITE ITEM (DEFAULT)
                            <ul>
                                {ItemList.map((item, id) => (
                                    <SwiperSlide key={id}>
                                        <Item
                                            websiteLink={item.link}
                                            // artist={artist}
                                            // website={website}
                                            // music={music}
                                            title={item.title}
                                            img={item.img}
                                            itemID={item.id}
                                            itemType={category}
                                        />
                                    </SwiperSlide>
                                ))}
                            </ul>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Row;
