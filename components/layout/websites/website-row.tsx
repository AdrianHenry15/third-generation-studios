"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import { Category } from "@/lib/types";
import WebsiteRowItem from "./website-row-item";

interface IWebsiteRowProps {
    title: string;
    item?: any[];
    fetchURL?: string;
    category: Category;
}

const WebsiteRow: React.FC<IWebsiteRowProps> = ({ title, item, fetchURL, category }) => {
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
        <div className="relative h-max py-4">
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
                                        <WebsiteRowItem
                                            currentItemId={item.id}
                                            currentItemCategory={category}
                                            currentItemTitle={item.title}
                                            currentItemImg={item.backdrop_path}
                                        />
                                    </SwiperSlide>
                                ))}
                            </ul>
                        ) : (
                            // MUSIC, WEBSITE ITEM (DEFAULT)
                            <ul>
                                {ItemList.map((item, id) => (
                                    <SwiperSlide className="py-10 mx-2" key={id}>
                                        <WebsiteRowItem
                                            websiteLink={item.link}
                                            currentItemTitle={item.title}
                                            currentItemImg={item.img}
                                            currentItemId={item.id}
                                            currentItemCategory={category}
                                        />
                                    </SwiperSlide>
                                ))}
                            </ul>
                        )}
                    </Swiper>
                </div>
            </div>
            {/* <div>
                <h5>Create Item</h5>
                <EmptyRowItem />
            </div> */}
        </div>
    );
};

export default WebsiteRow;
