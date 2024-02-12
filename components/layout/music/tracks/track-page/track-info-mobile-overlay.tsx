import React from "react";

import PlayButton from "@/components/action-overlay/play-button";
import { useTrackStore } from "stores/track-store";

const TrackInfoMobileOverlay = () => {
    const { currentTrack } = useTrackStore();
    return (
        <div>
            {/* PLAY BUTTON */}
            <PlayButton className="md:hidden" currentTrack={currentTrack} />
            <figcaption className="absolute bottom-0 px-2 md:hidden">
                {/* TRACK TITLE */}
                <h1 className="text-white text-4xl">{currentTrack.title}</h1>
                {/* ARTIST */}
                <p className="text-gray-400 font-semibold">{currentTrack.artist.title}</p>
            </figcaption>
        </div>
    );
};

export default TrackInfoMobileOverlay;
