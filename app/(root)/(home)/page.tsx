import dynamic from "next/dynamic";

import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";
import WebsiteRow from "@/components/layout/rows/website-row";

const LazyVideoPlayer = dynamic(() => import("@/components/video-player"), { ssr: false });

export default function HomePage() {
    const AllProjects = [...ClientProjects, ...SchoolProjects, ...PersonalProjects];
    return (
        <div>
            <LazyVideoPlayer src="/videos/web-nodes.mp4" />
            {/* WEBSITES */}
            <WebsiteRow name="All Websites" item={AllProjects} />
            {/* MUSIC */}
            {/* MOVIE PICKS */}
            {/* STOCK PICKS */}
        </div>
    );
}
