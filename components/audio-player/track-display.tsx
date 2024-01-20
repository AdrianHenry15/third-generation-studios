import Image from "next/image";
import React from "react";

import Pic from "@/public/music/jack.jpg";
import { FaHeart } from "react-icons/fa6";

const TrackDisplay = () => {
    return (
        <div className="relative flex items-center">
            {/* IMAGE */}
            <div className="relative h-min">
                <Image className="w-14" src={Pic} alt="artwork" />
            </div>
            {/* ARTIST/SONG */}
            <div className="text-sm mx-4">
                <h5 className="text-white font-semibold">Track Name</h5>
                <p className="text-gray-400 text-xs">Artist Name</p>
            </div>
            {/* LIKE BUTTON */}
            <div>
                <FaHeart />
            </div>
        </div>
    );
};

export default TrackDisplay;
