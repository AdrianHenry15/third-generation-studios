import React from "react";

import MusicImage from "./music-image";
import { MusicProjectType } from "@/lib/types";

interface IMusicProjectProps {
    className?: string;
    item: MusicProjectType;
}

const MusicItem = (props: IMusicProjectProps) => {
    return (
        <div className={`${props.className} my-4 mr-10 min-w-[150px]`}>
            {/* {props.artist.toLowerCase() === "search" ? <MusicImage img={props.img} /> : <Image src={props.img} alt="" />} */}
            <MusicImage artist={props.item.artist} img={props.item.img} />
            <div>
                <p className="text-white">{props.item.songName}</p>
                <p className="text-sm">{props.item.albumName === "" ? "Single" : props.item.albumName}</p>
                <p className="text-sm">{props.item.artist}</p>
            </div>
        </div>
    );
};

export default MusicItem;
