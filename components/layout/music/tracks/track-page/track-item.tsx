import { ArtistType } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface ITrackItemProps {
    trackName: string;
    trackImg: any;
    artistName: string;
    // hasCollaborators: boolean;
    // collaborator?: ArtistType[];
}

const TrackItem = (props: ITrackItemProps) => {
    return (
        <article className="flex flex-col">
            {/* TRACK INFO */}
            <header>
                {/* TRACK IMAGE */}
                <figure>
                    <Image src={props.trackImg} alt="track-image" />
                </figure>
                {/* TRACK TITLE */}
                <h1 className="text-white">{props.trackName}</h1>
                {/* ARTIST */}
                <p className="text-white">{props.artistName}</p>
                <div>
                    {/* LIKE */}
                    <div></div>
                    {/* DOWNLOAD */}
                    <div></div>
                </div>
            </header>
            {/* INFORMATION */}
            <div>
                <h5 className="text-white">INFORMATION</h5>
                {/* PUBLISHED */}
                <div></div>
                {/* BPM */}
                <div></div>
                {/* KEY */}
                <div></div>
                {/* PLAYS */}
                <div></div>
            </div>
            {/* ABOUT */}
            <div>
                <h5 className="text-white">ABOUT</h5>
            </div>
        </article>
    );
};

export default TrackItem;
