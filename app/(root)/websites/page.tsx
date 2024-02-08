import WebsiteRow from "@/components/layout/websites/website-row";
import WebsiteSplash from "@/components/layout/websites/website-splash";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";
import { Category } from "@/lib/types";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <WebsiteSplash />
            <WebsiteRow category={Category.WEBSITE} title="Client Websites" item={ClientProjects} />
            <WebsiteRow category={Category.WEBSITE} title="Personal Projects" item={PersonalProjects} />
            <WebsiteRow category={Category.WEBSITE} title="School Projects" item={SchoolProjects} />
        </div>
    );
}
