"use client";

import React, { useState } from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import { WebsiteType } from "@/lib/types";
import OpenLinkModal from "@/components/modals/open-link-modal";

interface IWebsiteRowItemProps {
    currentWebsite: WebsiteType;
}

const WebsiteRowItem = (props: IWebsiteRowItemProps) => {
    const [openWebsiteModal, setOpenWebsiteModal] = useState(false);
    return (
        <ItemContainer onClick={() => setOpenWebsiteModal(true)}>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    loading="lazy"
                    className="w-full block object-center object-cover cursor-pointer h-[90px] md:h-[130px] xl:h-[175px]"
                    src={props.currentWebsite.img}
                    alt={props.currentWebsite.title}
                />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%] hover:text-red-500 transition-colors duration-300 cursor-pointer">
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
        </ItemContainer>
    );
};

export default WebsiteRowItem;
