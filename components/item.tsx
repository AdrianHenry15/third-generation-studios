import React from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import ActionOverlay from "@/components/action-overlay";
import { ItemType } from "@/lib/types";

interface ItemProps {
    title: string;
    img: any;
    // movie?: boolean;
    // music?: boolean;
    // website?: boolean;
    // artist?: boolean;
    websiteLink?: string;
    itemID: string;
    itemType: ItemType;
}

const Item = (props: ItemProps) => {
    return (
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    width={props.itemType === ItemType.MOVIE ? 1000 : 0}
                    height={props.itemType === ItemType.MOVIE ? 1000 : 0}
                    className="w-full block object-center object-cover md:max-h-[130px] xl:max-h-[200px]"
                    src={props.itemType === ItemType.MOVIE ? `https://image.tmdb.org/t/p/w500/${props.img}` : props.img}
                    alt={props.title}
                />
                {/* ACTION OVERLAY */}
                <ActionOverlay itemType={props.itemType} websiteTitle={props.title} websiteLink={props.websiteLink} itemID={props.itemID} />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%] hover:text-red-500 transition-colors duration-300 cursor-pointer">
                {props.title}
            </p>
        </ItemContainer>
    );
};

export default Item;
