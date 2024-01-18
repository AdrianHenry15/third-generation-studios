import React from "react";

import { Artists } from "@/lib/projects";
import ArtistIcon from "../layout/music/artist/artist-icon";

interface IArtistRowProps {
    className?: string;
}

const ArtistRow = (props: IArtistRowProps) => {
    return (
        <div className={`${props.className} flex flex-col px-10`}>
            <h2 className="text-white font-bold md:text-xl py-2">Artists:</h2>
            <div className="flex">
                {Artists.map((project) => (
                    <ArtistIcon artist={project} key={project.id} />
                ))}
            </div>
        </div>
    );
};

export default ArtistRow;
