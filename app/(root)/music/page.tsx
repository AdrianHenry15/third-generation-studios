"use client";

import MusicSplash from "@/components/layout/music/music-splash";
import TrackRow from "@/components/layout/music/tracks/track-row";
import { AllSearchTracks } from "@/lib/tracks";

export default function MusicPage() {
    return (
        <div className="flex flex-col h-full bg-black">
            <MusicSplash />
            <div className="px-10">
                {/* <ArtistRow /> */}
                <TrackRow title="All Tracks By Search" items={AllSearchTracks} />
            </div>
        </div>
    );
}
