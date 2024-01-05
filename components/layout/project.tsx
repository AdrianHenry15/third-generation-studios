import React, { useState } from "react";
import Image from "next/image";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import Inception from "@/public/music/inception.jpg";

const Project = () => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] cursor-pointer relative p-2 flex flex-col">
            <Image className="w-full h-[100px] object-cover md:h-[125px] lg:h-[150px]" src={Inception} alt="item" />
            {/* LIKE IS OVERLAY ON TOP OF IMAGE */}
            {/* ADD MORE ACTIONS IF NECESSARY */}
            <div className="absolute top-4 left-4 ">
                <p>{like ? <FaHeart className="text-gray-300" /> : <FaRegHeart className="text-gray-300" />}</p>
            </div>
            {/* PROJECT INFO */}
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col justify-between flex-1">
                    <h6 className="text-white font-semibold text-sm">Inception</h6>
                    <p className="text-gray-400 text-xs">Music</p>
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <p className="text-gray-400 text-xs">2021</p>
                    <p className="text-gray-400 text-xs">1:30</p>
                </div>
            </div>
        </div>
    );
};

export default Project;
