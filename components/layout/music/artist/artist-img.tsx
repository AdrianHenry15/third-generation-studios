import Image from "next/image";
import React from "react";

import logo from "@/public/logos/triangle.png";

interface IArtistImageProps {
    img: any;
    artist: string;
}

const ArtistImage = (props: IArtistImageProps) => {
    return (
        <div className="relative w-24 h-24 md:w-36 md:h-36">
            <Image src={props.img} alt="pic" className="rounded-full w-full h-full object-cover" />
            {/* {props.artist.toLowerCase() === "search" ? <Image src={logo} alt="logo" className="absolute w-4 top-0" /> : null} */}
        </div>
    );
};

export default ArtistImage;
