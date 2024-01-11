import dynamic from "next/dynamic";

import { ClientProjects } from "@/lib/projects";
import WebsiteRow from "@/components/layout/rows/website-row";

const LazyVideoPlayer = dynamic(() => import("@/components/video-player"), { ssr: false });

export default function HomePage() {
    return (
        <div>
            <LazyVideoPlayer src="/videos/web-nodes.mp4" />
            {/* WEBSITES */}
            <WebsiteRow name="Client Websites" item={ClientProjects} />
            {/* MUSIC */}
            {/* MOVIE PICKS */}
            {/* STOCK PICKS */}
        </div>
    );
}
