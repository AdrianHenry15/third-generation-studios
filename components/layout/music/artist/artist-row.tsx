import React from "react";
import ArtistItem from "./artist-item";
import { Artists } from "@/lib/artists";

const ArtistRow = () => {
    return (
        <div className="flex flex-col">
            <h5 className="text-white text-3xl font-semibold mb-4">Artists</h5>
            <div className="flex">
                {Artists.map((artist) => {
                    return <ArtistItem key={artist.id} artistName={artist.title} img={artist.img} />;
                })}
            </div>
        </div>
    );
};

export default ArtistRow;
