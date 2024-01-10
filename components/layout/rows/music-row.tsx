import React from "react";
import MusicProject from "../music/music-project";

import Pic1 from "@/public/music/jack.jpg";
import { SearchOriginalProjects } from "@/lib/projects";

interface IMusicRowProps {
    className?: string;
}

const MusicRow = (props: IMusicRowProps) => {
    return (
        <div className={`${props.className} flex flex-col`}>
            <h5 className="text-white font-semibold mt-4 text-2xl">Made By Search</h5>
            <div className="flex">
                {SearchOriginalProjects.map((project) => (
                    <MusicProject key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default MusicRow;
