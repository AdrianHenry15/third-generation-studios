import { ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";
import { WebsiteProjectType } from "@/lib/types";

import MovieRow from "@/components/rows/movie-row";
import requests from "@/lib/movie-requests";
import HomeSplash from "@/components/layout/home/home-splash";
import WebsiteRow from "@/components/rows/website-row";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    const renderMusicItem = (project: WebsiteProjectType) => {};
    return (
        <div className="bg-black">
            <HomeSplash />
            {/* <LazyVideoPlayer src="/videos/web-nodes.mp4" /> */}
            {/* WEBSITES */}
            <WebsiteRow title="All Websites" item={AllProjects} />
            {/* MUSIC */}
            {/* <MusicRow projects={AllMusic} title={"All Music"} /> */}
            {/* MOVIE PICKS */}
            <MovieRow title={"Now Playing"} fetchURL={requests.requestNowPlaying} />
            {/* STOCK PICKS */}
        </div>
    );
}
