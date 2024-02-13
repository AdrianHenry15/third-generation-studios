import Image from "next/image";
import React from "react";

interface IArtistItemProps {
    artistName: string;
    img: any;
}

const ArtistItem = (props: IArtistItemProps) => {
    return (
        <div className="text-white flex flex-col items-center mx-4">
            {/* IMAGE */}
            <span className="mb-2">
                <Image className="rounded-full w-40 h-40" src={props.img} alt={props.artistName} />
            </span>
            {/* ARTIST TITLE */}
            <p className="text-zinc-500">{props.artistName}</p>
        </div>
    );
};

export default ArtistItem;
