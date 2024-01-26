import React from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import ActionOverlay from "@/components/action-overlay";
import { Category } from "@/lib/types";

interface ItemProps {
    title: string;
    img: any;
    websiteLink?: string;
    itemId: string;
    category: Category;
}

const Item = (props: ItemProps) => {
    return (
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    width={props.category === Category.MOVIE ? 1000 : 0}
                    height={props.category === Category.MOVIE ? 1000 : 0}
                    className="w-full block object-center object-cover md:max-h-[130px] xl:max-h-[200px]"
                    src={props.category === Category.MOVIE ? `https://image.tmdb.org/t/p/w500/${props.img}` : props.img}
                    alt={props.title}
                />
                {/* ACTION OVERLAY */}
                <ActionOverlay category={props.category} websiteTitle={props.title} websiteLink={props.websiteLink} itemId={props.itemId} />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%] hover:text-red-500 transition-colors duration-300 cursor-pointer">
                {props.title}
            </p>
        </ItemContainer>
    );
};

export default Item;
