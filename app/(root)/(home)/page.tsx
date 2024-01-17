"use client";

import dynamic from "next/dynamic";

import { ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";
import { MovieType, MusicProjectType, WebsiteProjectType } from "@/lib/types";

import WebsiteItem from "@/components/layout/websites/website-item";
import MusicItem from "@/components/layout/music/music-item";
import MovieItem from "@/components/layout/movies/movie-item";
import WebsiteRow from "@/components/rows/website-row";
import MusicRow from "@/components/rows/music-row";
import MovieRow from "@/components/rows/movie-row";
import requests from "@/lib/movie-requests";

const LazyVideoPlayer = dynamic(() => import("@/components/video-player"), { ssr: false });

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    const renderWebsiteItem = (website?: WebsiteProjectType, music?: MusicProjectType, movie?: MovieType) => {
        if (website) {
            return <WebsiteItem item={website} />;
        } else if (music) {
            return <MusicItem item={music} />;
        } else if (movie) {
            return <MovieItem item={movie} />;
        }
    };

    const renderMusicItem = (project: WebsiteProjectType) => {};
    return (
        <div className="bg-black">
            <LazyVideoPlayer src="/videos/web-nodes.mp4" />
            {/* WEBSITES */}
            {/* <WebsiteRow name="All Websites" item={AllProjects} /> */}
            <WebsiteRow name="All Websites" item={AllProjects} />
            {/* MUSIC */}
            <MusicRow projects={AllMusic} title={"All Music"} />
            {/* MOVIE PICKS */}
            <MovieRow title={"Now Playing"} fetchURL={requests.requestNowPlaying} />
            {/* STOCK PICKS */}
        </div>
    );
}
