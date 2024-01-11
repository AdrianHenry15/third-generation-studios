import WebsiteRow from "@/components/layout/rows/website-row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";

export default function WebsitesPage() {
    return (
        <div>
            {/* <LazyVideoPlayer src="/videos/digi-earth.mp4" /> */}
            {/* <ImgTextOverlay src={ClientProjects[0].img} name="Websites" /> */}
            <WebsiteRow name="Client Websites" item={ClientProjects} />
            <WebsiteRow name="Personal Projects" item={PersonalProjects} />
            <WebsiteRow name="School Projects" item={SchoolProjects} />
        </div>
    );
}
