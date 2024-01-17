import React from "react";

import { Artists } from "@/lib/projects";
import ArtistIcon from "../layout/music/artist/artist-icon";

interface IArtistRowProps {
    className?: string;
}

const ArtistRow = (props: IArtistRowProps) => {
    return (
        <div className={`${props.className} flex flex-col`}>
            <h5 className="text-white font-semibold mt-4 text-4xl">Artists</h5>
            <div className="flex">
                {Artists.map((project) => (
                    <ArtistIcon artist={project} key={project.id} />
                ))}
            </div>
        </div>
    );
};

export default ArtistRow;
