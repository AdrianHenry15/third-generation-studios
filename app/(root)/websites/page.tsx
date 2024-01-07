import Row from "@/components/layout/row";
import VideoPlayer from "@/components/video-player";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";

export default function WebsitesPage() {
    const CarouselClient = [...ClientProjects, ...ClientProjects, ...ClientProjects];
    const CarouselPersonal = [...PersonalProjects, ...PersonalProjects, ...PersonalProjects];
    const CarouselSchool = [...SchoolProjects, ...SchoolProjects, ...SchoolProjects];
    return (
        <div>
            <VideoPlayer src="/videos/digi-earth.mp4" />
            <Row name="Client Websites" item={CarouselClient} />
            <Row name="Personal Projects" item={CarouselPersonal} />
            <Row name="School Projects" item={CarouselSchool} />
        </div>
    );
}
