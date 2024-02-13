import React from "react";
import TrackRowItem from "./track-row-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { AllSearchTracks } from "@/lib/tracks";
import { SongType } from "@/lib/types";

interface ITrackRowProps {
    items: SongType[];
    title: string;
}

const TrackRow = (props: ITrackRowProps) => {
    return (
        <div className="py-24">
            {/* ROW TITLE */}
            <div>
                <h5 className="text-white text-3xl my-2 font-semibold">{props.title}</h5>
            </div>
            {/* ROW ITEMS */}
            <Swiper
                slidesPerView={5}
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
                <div>
                    {props.items.map((track) => {
                        return (
                            <SwiperSlide key={track.id}>
                                <TrackRowItem currentTrack={track} />
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
        </div>
    );
};

export default TrackRow;
