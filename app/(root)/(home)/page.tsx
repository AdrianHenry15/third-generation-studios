import dynamic from "next/dynamic";

import Row from "@/components/layout/row";
import { ClientProjects } from "@/lib/projects";

const LazyVideoPlayer = dynamic(() => import("@/components/video-player"), { ssr: false });

export default function HomePage() {
    const CarouselClient = [...ClientProjects, ...ClientProjects, ...ClientProjects];

    return (
        <div>
            <LazyVideoPlayer src="/videos/web-nodes.mp4" />
            {/* WEBSITES */}
            <Row name="Client Websites" item={CarouselClient} />
            {/* MUSIC */}
            {/* MOVIE PICKS */}
            {/* STOCK PICKS */}
        </div>
    );
}
