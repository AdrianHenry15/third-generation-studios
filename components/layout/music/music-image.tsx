import Image from "next/image";
import React from "react";

import logo from "@/public/logos/triangle.png";

interface IMusicImageProps {
    img: any;
    artist: string;
}

const MusicImage = (props: IMusicImageProps) => {
    return (
        <div className="relative">
            <Image width={1000} height={1000} src={props.img} alt="pic" />
            {props.artist.toLowerCase() === "search" ? <Image src={logo} alt="logo" className="absolute w-4 m-2 top-0" /> : null}
        </div>
    );
};

export default MusicImage;
