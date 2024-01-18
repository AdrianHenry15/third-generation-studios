import { ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";

import MovieRow from "@/components/layout/movies/movie-row";
import requests from "@/lib/movie-requests";
import HomeSplash from "@/components/layout/home/home-splash";
import Row from "@/components/row";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    return (
        <div className="bg-black">
            <HomeSplash />
            <Row title="All Websites" item={AllProjects} />
            <Row title="All Music" item={AllMusic} />
            <MovieRow title="Now Playing" fetchURL={requests.requestNowPlaying} />
        </div>
    );
}
