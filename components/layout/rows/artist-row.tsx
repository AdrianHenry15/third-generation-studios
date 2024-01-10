import React from "react";

import { Artists } from "@/lib/projects";
import { ArtistType } from "@/lib/types";
import ArtistIcon from "../music/artist/artist-icon";

interface IArtistRowProps {
    className?: string;
}

const ArtistRow = (props: IArtistRowProps) => {
    return (
        <div className={`${props.className} flex flex-col`}>
            <h5 className="text-white font-semibold mt-4 text-2xl">Artists</h5>
            <div className="flex">
                {Artists.map((project) => (
                    <ArtistIcon artist={project} key={project.id} />
                ))}
            </div>
        </div>
    );
};

export default ArtistRow;
