import Image from "next/image";
import React from "react";

import logo from "@/public/logos/triangle.png";

interface IArtistImageProps {
    img: any;
    artist: string;
}

const ArtistImage = (props: IArtistImageProps) => {
    return (
        <div className="relative">
            <Image width={200} height={200} src={props.img} alt="pic" className="rounded-md" />
            {props.artist.toLowerCase() === "search" ? <Image src={logo} alt="logo" className="absolute w-4 m-2 top-0" /> : null}
        </div>
    );
};

export default ArtistImage;
