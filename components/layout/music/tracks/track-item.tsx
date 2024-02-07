import Image from "next/image";
import React from "react";

import PlayButton from "@/components/action-overlay/play-button";
import { Category } from "@/lib/types";

interface ITrackItemProps {
    category: Category;
    itemId: string;
    audioFile: string;
    artistName: string;
    itemImg: any;
    itemTitle: string;
    isFree: boolean;
    price: string;
}

const TrackItem = (props: ITrackItemProps) => {
    return (
        <figure>
            {/* HOVER CONTAINER */}
            <div>
                {/* IMAGE CONTAINER  */}
                <div>
                    {/* IMAGE */}
                    <span>
                        <Image src="" alt="" />
                    </span>
                    {/* PLAY BUTTON */}
                    <span>
                        <PlayButton
                            currentCategory={props.category}
                            currentItemId={props.itemId}
                            currentAudioFile={props.audioFile}
                            currentArtistName={props.artistName}
                            currentItemImg={props.itemImg}
                            currentItemTitle={props.itemTitle}
                        />
                    </span>
                </div>
                {/* ITEM INFO */}
                <figcaption className="flex flex-col">
                    {/* ROW 1 */}
                    <div className="flex">
                        {/* PRICE */}
                        <p className="text-blue-600">{props.price}</p>
                        {/* TODO: IF FREE RENDER FREE ICON */}
                        {props.isFree && <p className="text-xs font-semibold bg-orange-800 text-orange-400">FREE</p>}
                    </div>
                    {/* ROW 2 */}
                    <div>
                        {/* TRACK TITLE */}
                        <h5>{props.itemTitle}</h5>
                    </div>
                    {/* ROW 3 */}
                    <div>
                        <p>{props.artistName}</p>
                    </div>
                </figcaption>
            </div>
        </figure>
    );
};

export default TrackItem;
