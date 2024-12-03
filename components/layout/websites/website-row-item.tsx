"use client";

import React, { useState } from "react";
import Image from "next/image";

import { WebsiteType } from "@/lib/types";
import OpenLinkModal from "@/components/modals/open-link-modal";
import Logo from "@/public/logos/glowCircle-trans.png";

interface IWebsiteRowItemProps {
    currentWebsite: WebsiteType;
}

const WebsiteRowItem = (props: IWebsiteRowItemProps) => {
    const [openWebsiteModal, setOpenWebsiteModal] = useState(false);
    return (
        <div
            className="flex flex-col w-full relative hover:scale-105 scale-100 transition-transform duration-300 "
            onClick={() => setOpenWebsiteModal(true)}
        >
            {/* IMAGE */}
            <div className={`flex justify-center items-center relative w-full`}>
                <Image
                    loading="lazy"
                    className="w-full block object-center object-cover cursor-pointer h-[185px]"
                    src={props.currentWebsite.img}
                    alt={props.currentWebsite.title}
                />
                <Image src={Logo} alt="logo" className="flex absolute left-2 bottom-2 w-8 sm:w-12" />
            </div>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%] hover:text-zinc-500 transition-colors duration-300 cursor-pointer">
                {props.currentWebsite.title}
            </p>

            {/* MODAL */}
            {openWebsiteModal && (
                <OpenLinkModal
                    isOpen={true}
                    closeModal={() => setOpenWebsiteModal(false)}
                    title={props.currentWebsite.title}
                    link={props.currentWebsite.link}
                />
            )}
        </div>
    );
};

export default WebsiteRowItem;
