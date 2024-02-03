import React, { useState } from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import ActionOverlay from "@/components/action-overlay";
import { Category } from "@/lib/types";

interface IRowItemProps {
    currentItemTitle: string;
    currentItemImg: any;
    websiteLink?: string;
    currentItemId: string;
    currentItemCategory: Category;
    currentAudioFile: string;
    currentArtistName: string;
}

const RowItem = (props: IRowItemProps) => {
    const [emptyImage, setEmptyImage] = useState(false);

    const getImageSrc = () => {
        const Image = props.currentItemImg === "" ? "" : props.currentItemImg;
        const ImageUrl = props.currentItemImg === "" ? "" : `https://image.tmdb.org/t/p/w500/${props.currentItemImg}`;

        if (props.currentItemCategory === Category.MOVIE) {
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
                    width={props.currentItemCategory === Category.MOVIE ? 1000 : 0}
                    height={props.currentItemCategory === Category.MOVIE ? 1000 : 0}
                    className="w-full block object-center object-cover md:max-h-[130px] xl:max-h-[200px]"
                    src={
                        props.currentItemCategory === Category.MOVIE
                            ? `https://image.tmdb.org/t/p/w500/${props.currentItemImg}`
                            : props.currentItemImg
                    }
                    // src={getImageSrc()}
                    alt={props.currentItemTitle}
                />
                {/* ACTION OVERLAY */}
                <ActionOverlay
                    currentCategory={props.currentItemCategory}
                    websiteTitle={props.currentItemTitle}
                    websiteLink={props.websiteLink!}
                    currentItemId={props.currentItemId}
                    currentArtistName={props.currentArtistName}
                    currentAudioFile={props.currentAudioFile}
                    currentItemImg={props.currentItemImg}
                    currentItemTitle={props.currentItemTitle}
                />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%] hover:text-red-500 transition-colors duration-300 cursor-pointer">
                {props.currentItemTitle}
            </p>
        </ItemContainer>
    );
};

export default RowItem;
