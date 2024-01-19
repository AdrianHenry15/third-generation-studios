import React from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import ActionOverlay from "@/components/action-overlay";

interface ItemProps {
    title: string;
    img: any;
    movie?: boolean;
    music?: boolean;
    website?: boolean;
    artist?: boolean;
    websiteLink?: string;
}

const Item = (props: ItemProps) => {
    return (
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    width={props.movie ? 1000 : 0}
                    height={props.movie ? 1000 : 0}
                    className="w-full max-h-[200px] block object-center object-cover md:max-h-[130px] xl:max-h-[200px]"
                    src={props.movie ? `https://image.tmdb.org/t/p/w500/${props.img}` : props.img}
                    alt={props.title}
                />
                {/* ACTION OVERLAY */}
                <ActionOverlay
                    artist={props.artist}
                    movie={props.movie}
                    website={props.website}
                    music={props.music}
                    websiteTitle={props.title}
                    websiteLink={props.websiteLink}
                />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%] hover:text-red-500 transition-colors duration-300 cursor-pointer">
                {props.title}
            </p>
        </ItemContainer>
    );
};

export default Item;
