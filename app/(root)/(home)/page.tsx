"use client";

import { AllSearchTracks, ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";
import HomeSplash from "@/components/layout/home/home-splash";
import { Category } from "@/lib/types";
import TrackRow from "@/components/layout/music/tracks/track-row";
import WebsiteRow from "@/components/layout/websites/website-row";
import SectionTitle from "@/components/section-title";

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    const AllMusic = [...AllSearchTracks];

    return (
        <section className="bg-black flex flex-col">
            {/* SPLASH */}
            <HomeSplash />
            <div className="px-4 md:px-10">
                {/* SECTION TITLE */}
                {/* <div className="py-44 text-center">
                    <p className="text-sm text-red-600 font-bold">Websites</p>
                </div> */}
                <SectionTitle title="Websites" />
                <WebsiteRow category={Category.WEBSITE} title="All Websites" item={AllProjects} />
                <SectionTitle title="Music" />
                <TrackRow />
            </div>
        </section>
    );
}
