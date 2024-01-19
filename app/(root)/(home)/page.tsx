import { ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "@/lib/projects";

import requests from "@/lib/movie-requests";
import HomeSplash from "@/components/layout/home/home-splash";
import Row from "@/components/row";
import Image from "next/image";

import Logo from "@/public/logos/thirdgenstudios-logo.png";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...SearchOriginalProjects, ...JafarriProjects];

    return (
        <div className="bg-black">
            <HomeSplash />
            <Row website title="All Websites" item={AllProjects} />
            <Row music title="All Music" item={AllMusic} />
            <Row movie title="Now Playing" fetchURL={requests.requestNowPlaying} />
        </div>
    );
}
