import dynamic from "next/dynamic";

import Row from "@/components/layout/row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";

const LazyVideoPlayer = dynamic(() => import("@/components/video-player"), { ssr: false });

export default function MusicPage() {
    const CarouselClient = [...ClientProjects, ...ClientProjects, ...ClientProjects];
    const CarouselPersonal = [...PersonalProjects, ...PersonalProjects, ...PersonalProjects];
    const CarouselSchool = [...SchoolProjects, ...SchoolProjects, ...SchoolProjects];
    return (
        <div>
            <LazyVideoPlayer src="/videos/music-colors.mp4" />
            <Row name="Client Websites" item={CarouselClient} />
            <Row name="Personal Projects" item={CarouselPersonal} />
            <Row name="School Projects" item={CarouselSchool} />
        </div>
    );
}
