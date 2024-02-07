"use client";

import { Artists, ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";

import HomeSplash from "@/components/layout/home/home-splash";
import Row from "@/components/row";

import { Category } from "@/lib/types";
import TrackRow from "@/components/layout/music/tracks/track-row";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    return (
        <div className="bg-black">
            <HomeSplash />
            <Row category={Category.WEBSITE} title="All Websites" item={AllProjects} />
            {/* <TrackRow /> */}
            {/* <Row category={Category.ARTIST} title="All Artists" item={Artists} /> */}
            {/* <Row category={Category.SONG} title="All Songs" item={AllMusic} /> */}
            {/* <Row itemType={ItemType.MOVIE} title="Now Playing" fetchURL={requests.requestNowPlaying} /> */}
        </div>
    );
}
