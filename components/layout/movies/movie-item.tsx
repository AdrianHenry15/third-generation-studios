import ActionOverlay from "@/components/action-overlay";
import ImageContainer from "@/components/containers/image-container";
import ItemContainer from "@/components/containers/item-container";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface IMovieItemProps {
    item: {
        backdrop_path: string;
        title: string;
    };
}

const MovieItem = ({ item }: IMovieItemProps) => {
    const [like, setLike] = useState(false);

    return (
        // <ItemContainer className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    width={1000}
                    height={1000}
                    className="w-full h-auto block"
                    src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                    alt={item.title}
                />
            </ImageContainer>
            {/* ACTION OVERLAY */}
            <ActionOverlay />
            {/* <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p>
                    {like ? (
                        <FaHeart className="absolute top-4 left-4 text-gray-300" />
                    ) : (
                        <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                    )}
                </p>
            </div> */}
            {/* TITLE AND INFO */}
            <p className="text-white text-sm font-bold">{item.title}</p>
        </ItemContainer>
    );
};

export default MovieItem;
