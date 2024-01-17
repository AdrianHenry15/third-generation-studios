import React, { useState } from "react";
import Image from "next/image";

import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import OpenLinkModal from "../../modals/open-link-modal";
import { WebsiteProjectType } from "@/lib/types";

interface IWebsiteItemProps {
    item: WebsiteProjectType;
}

const WebsiteItem = (props: IWebsiteItemProps) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [openLinkModal, setOpenLinkModal] = useState(false);

    const HoverClass = "transition-all ease-in-out duration-300 hover:text-red-600 focus:text-red-600";

    return (
        <div
            onClick={() => setOpenLinkModal(true)}
            className="hover:scale-105 transition duration-300 ease-in-out w-[160px] sm:w-[200px] md:w-[250px] lg:w-[280px] cursor-pointer relative p-2 flex flex-col"
        >
            {/* IMAGE */}
            <Image className="w-full h-[100px] object-cover md:h-[125px] lg:h-[150px]" src={props.item.img} alt={props.item.title} />
            {/* ACTION OVERLAY */}
            <div className="absolute top-4 left-4 flex">
                <p>{like ? <FaHeart className="text-gray-300" /> : <FaRegHeart className="text-gray-300" />}</p>
                <p className="ml-4">{saved ? <FaBookmark className="text-gray-300" /> : <FaRegBookmark className="text-gray-300" />}</p>
            </div>
            {/* PROJECT INFO */}
            <div className="flex flex-col justify-between flex-1">
                {/* TITLE */}
                <h6 className={`${HoverClass} text-white font-semibold text-sm`}>{props.item.title}</h6>
            </div>
            {/* LINK MODAL */}
            <OpenLinkModal
                title={props.item.title}
                link={props.item.link}
                isOpen={openLinkModal}
                closeModal={() => setOpenLinkModal(false)}
            />
        </div>
    );
};

export default WebsiteItem;
