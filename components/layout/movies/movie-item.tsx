import Image from "next/image";
import React from "react";

import ActionOverlay from "@/components/action-overlay";
import ImageContainer from "@/components/containers/image-container";
import ItemContainer from "@/components/containers/item-container";

interface IMovieItemProps {
    // item: {
    //     backdrop_path: string;
    //     title: string;
    // };
    img: any;
    title: string;
}

const MovieItem = ({ img, title }: IMovieItemProps) => {
    return (
        // <ItemContainer className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    width={1000}
                    height={1000}
                    className="w-full h-auto block"
                    src={`https://image.tmdb.org/t/p/w500/${img}`}
                    alt={title}
                />
                {/* ACTION OVERLAY */}
                <ActionOverlay />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-white font-semibold text-sm w-[80%]">{title}</p>
        </ItemContainer>
    );
};

export default MovieItem;
