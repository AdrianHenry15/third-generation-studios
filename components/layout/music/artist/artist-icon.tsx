import React from "react";

import { ArtistType } from "@/lib/types";
import ArtistImage from "./artist-img";

interface IArtistIconProps {
    className?: string;
    artist: ArtistType;
}

const ArtistIcon = (props: IArtistIconProps) => {
    return (
        <div className={`${props.className} my-4 mr-10 min-w-[120px]`}>
            {/* {props.artist.toLowerCase() === "search" ? <MusicImage img={props.img} /> : <Image src={props.img} alt="" />} */}
            <ArtistImage artist={props.artist.title} img={props.artist.img} />
            <div>
                <p className="text-white">{props.artist.title}</p>
            </div>
        </div>
    );
};

export default ArtistIcon;
