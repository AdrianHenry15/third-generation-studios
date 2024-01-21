import { ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";

import requests from "@/lib/movie-requests";
import HomeSplash from "@/components/layout/home/home-splash";
import Row from "@/components/row";

import Logo from "@/public/logos/thirdgenstudios-logo.png";
import { ItemType } from "@/lib/types";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    return (
        <div className="bg-black">
            <HomeSplash />
            <Row itemType={ItemType.WEBSITE} title="All Websites" item={AllProjects} />
            <Row itemType={ItemType.MUSIC} title="All Music" item={AllMusic} />
            <Row itemType={ItemType.MOVIE} title="Now Playing" fetchURL={requests.requestNowPlaying} />
        </div>
    );
}
