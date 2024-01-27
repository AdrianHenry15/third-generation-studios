import React, { useState } from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import ActionOverlay from "@/components/action-overlay";
import { Category } from "@/lib/types";
import EmptyRowItem from "./empty-row-item";

interface IRowItemProps {
    title: string;
    img: any;
    websiteLink?: string;
    itemId: string;
    category: Category;
}

const RowItem = (props: IRowItemProps) => {
    const [emptyImage, setEmptyImage] = useState(false);

    const getImageSrc = () => {
        const Image = props.img === "" ? "" : props.img;
        const ImageUrl = props.img === "" ? "" : `https://image.tmdb.org/t/p/w500/${props.img}`;

        if (props.category === Category.MOVIE) {
            ImageUrl === "" ? setEmptyImage(false) : setEmptyImage(true);
            return ImageUrl;
        } else {
            Image === "" ? setEmptyImage(false) : setEmptyImage(true);
            return Image;
        }
    };
    return (
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    width={props.category === Category.MOVIE ? 1000 : 0}
                    height={props.category === Category.MOVIE ? 1000 : 0}
                    className="w-full block object-center object-cover md:max-h-[130px] xl:max-h-[200px]"
                    src={props.category === Category.MOVIE ? `https://image.tmdb.org/t/p/w500/${props.img}` : props.img}
                    // src={getImageSrc()}
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

export default RowItem;
