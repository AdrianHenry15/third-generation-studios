import React from "react";
import MusicProject from "../music/music-project";

import { MusicProjectType } from "@/lib/types";

interface IMusicRowProps {
    className?: string;
    projects: MusicProjectType[];
    title: string;
}

const MusicRow = (props: IMusicRowProps) => {
    return (
        <div className={`${props.className} flex flex-col overflow-x-scroll pb-10 my-10`}>
            <h5 className="text-white font-semibold mt-4 text-2xl">{props.title}</h5>
            <div className="flex">
                {props.projects.map((project) => (
                    <MusicProject key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default MusicRow;
