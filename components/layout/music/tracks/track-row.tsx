import React from "react";
import TrackItem from "./track-item";
import { Category } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { AllSearchTracks } from "@/lib/projects";

const TrackRow = () => {
    return (
        <div>
            {/* ROW TITLE */}
            <div>
                <h5 className="text-white text-2xl my-2 font-bold">All Tracks By Search</h5>
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
                    {AllSearchTracks.map((track) => {
                        return (
                            <SwiperSlide key={track.id}>
                                <TrackItem
                                    category={Category.TRACK}
                                    trackId={track.id}
                                    audioFile={track.audio_file}
                                    artistName={track.artist.title}
                                    trackImg={track.img}
                                    trackTitle={track.title}
                                    isFree={track.isFree}
                                    price={track.price}
                                    bpm={track.bpm}
                                    trackScale={track.key}
                                />
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
        </div>
    );
};

export default TrackRow;
