import WebsiteSplash from "@/components/layout/websites/website-splash";
import Row from "@/components/row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";
import { Category } from "@/lib/types";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <WebsiteSplash />
            <Row category={Category.WEBSITE} title="Client Websites" item={ClientProjects} />
            <Row category={Category.WEBSITE} title="Personal Projects" item={PersonalProjects} />
            <Row category={Category.WEBSITE} title="School Projects" item={SchoolProjects} />
        </div>
    );
}
