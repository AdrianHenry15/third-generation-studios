import React from "react";

import MusicImage from "./music-image";
import { MusicProjectType } from "@/lib/types";

interface IMusicProjectProps {
    className?: string;
    project: MusicProjectType;
}

const MusicProject = (props: IMusicProjectProps) => {
    return (
        <div className={`${props.className} my-4 mr-10 min-w-[150px]`}>
            {/* {props.artist.toLowerCase() === "search" ? <MusicImage img={props.img} /> : <Image src={props.img} alt="" />} */}
            <MusicImage artist={props.project.artist} img={props.project.img} />
            <div>
                <p className="text-white">{props.project.songName}</p>
                <p className="text-sm">{props.project.albumName === "" ? "Single" : props.project.albumName}</p>
                <p className="text-sm">{props.project.artist}</p>
                {/* <p className="text-sm">{props.project.duration}</p> */}
                {/* <p className="text-sm">{props.project.genre}</p> */}
                {/* <p className="text-sm">{props.project.plays}</p> */}
                {/* <p className="text-sm">{props.project.year}</p> */}
                {/* <p className="text-sm">{props.project.}</p> */}
            </div>
        </div>
    );
};

export default MusicProject;
