import WebsiteSplash from "@/components/layout/websites/website-splash";
import WebsiteRow from "@/components/rows/website-row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <WebsiteSplash />
            <WebsiteRow title="Client Websites" item={ClientProjects} />
            <WebsiteRow title="Personal Projects" item={PersonalProjects} />
            <WebsiteRow title="School Projects" item={SchoolProjects} />
        </div>
    );
}
