import dynamic from "next/dynamic";

import Row from "@/components/layout/row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";
import ImgTextOverlay from "@/components/layout/img-text-overlay";

const LazyVideoPlayer = dynamic(() => import("@/components/video-player"), { ssr: false });

export default function WebsitesPage() {
    const CarouselClient = [...ClientProjects, ...ClientProjects, ...ClientProjects];
    const CarouselPersonal = [...PersonalProjects, ...PersonalProjects, ...PersonalProjects];
    const CarouselSchool = [...SchoolProjects, ...SchoolProjects, ...SchoolProjects];
    return (
        <div>
            {/* <LazyVideoPlayer src="/videos/digi-earth.mp4" /> */}
            {/* <ImgTextOverlay src={ClientProjects[0].img} name="Websites" /> */}
            <Row name="Client Websites" item={CarouselClient} />
            <Row name="Personal Projects" item={CarouselPersonal} />
            <Row name="School Projects" item={CarouselSchool} />
        </div>
    );
}
