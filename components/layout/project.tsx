import React, { useState } from "react";
import Image from "next/image";

import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";

interface IProjectProps {
    img: any;
    title: string;
    genre: string;
    technologies: string;
    description: string;
    year: string;
    duration?: string;
}

const Project = (props: IProjectProps) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [openLinkModal, setOpenLinkModal] = useState(false);

    const HoverClass = "transition-all ease-in-out duration-300 hover:text-red-600 focus:text-red-600";

    return (
        <div
            onClick={() => setOpenLinkModal(true)}
            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] cursor-pointer relative p-2 flex flex-col"
        >
            <Image className="w-full h-[100px] object-cover md:h-[125px] lg:h-[150px]" src={props.img} alt={props.title} />
            {/* LIKE IS OVERLAY ON TOP OF IMAGE */}
            {/* ADD MORE ACTIONS IF NECESSARY */}
            <div className="absolute top-4 left-4 flex">
                <p>{like ? <FaHeart className="text-gray-300" /> : <FaRegHeart className="text-gray-300" />}</p>
                <p className="ml-4">{saved ? <FaBookmark className="text-gray-300" /> : <FaRegBookmark className="text-gray-300" />}</p>
            </div>
            {/* PROJECT INFO */}
            <div className="flex flex-col justify-between flex-1">
                {/* TITLE */}
                <h6 className={`${HoverClass} text-white font-semibold text-sm`}>{props.title}</h6>
                {/* DESCRIPTION */}
                <p className="text-xs text-gray-300">{props.description}</p>
                {/* GENRE */}
                <p className="text-gray-400 text-xs">{props.genre}</p>
                {/* FOR WEBSITE & MOVIES => TECHNOLOGIES */}
                <p className="text-xs">{props.technologies}</p>
                {/* YEAR CREATED */}
                <p className="text-gray-400 text-xs">{props.year}</p>
                {/* DURATION */}
                <p className="text-gray-400 text-xs">{props.duration}</p>
            </div>
        </div>
    );
};

export default Project;
