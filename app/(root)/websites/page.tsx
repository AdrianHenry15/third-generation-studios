import WebsiteRow from "@/components/rows/website-row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";

export default function WebsitesPage() {
    return (
        <div>
            <WebsiteRow name="Client Websites" item={ClientProjects} />
            <WebsiteRow name="Personal Projects" item={PersonalProjects} />
            <WebsiteRow name="School Projects" item={SchoolProjects} />
        </div>
    );
}
