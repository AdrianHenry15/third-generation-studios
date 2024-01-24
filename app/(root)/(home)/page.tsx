import { ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";

import HomeSplash from "@/components/layout/home/home-splash";
import Row from "@/components/row";

import { Category } from "@/lib/types";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    return (
        <div className="bg-black">
            <HomeSplash />
            <Row category={Category.WEBSITE} title="All Websites" item={AllProjects} />
            <Row category={Category.MUSIC} title="All Music" item={AllMusic} />
            {/* <Row itemType={ItemType.MOVIE} title="Now Playing" fetchURL={requests.requestNowPlaying} /> */}
        </div>
    );
}
