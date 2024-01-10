import React from "react";

import { ArtistType } from "@/lib/types";
import ArtistImage from "./artist-img";

interface IArtistIconProps {
    className?: string;
    artist: ArtistType;
}

const ArtistIcon = (props: IArtistIconProps) => {
    return (
        <div className={`${props.className} my-4 mr-10 min-w-[150px]`}>
            {/* {props.artist.toLowerCase() === "search" ? <MusicImage img={props.img} /> : <Image src={props.img} alt="" />} */}
            <ArtistImage artist={props.artist.name} img={props.artist.img} />
            <div>
                <p className="text-white">{props.artist.name}</p>
                {/* <p className="text-sm">{props.project.duration}</p> */}
                {/* <p className="text-sm">{props.project.genre}</p> */}
                {/* <p className="text-sm">{props.project.plays}</p> */}
                {/* <p className="text-sm">{props.project.year}</p> */}
                {/* <p className="text-sm">{props.project.}</p> */}
            </div>
        </div>
    );
};

export default ArtistIcon;
