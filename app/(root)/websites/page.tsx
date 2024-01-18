import WebsiteSplash from "@/components/layout/websites/website-splash";
import Row from "@/components/row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <WebsiteSplash />
            <Row title="Client Websites" item={ClientProjects} />
            <Row title="Personal Projects" item={PersonalProjects} />
            <Row title="School Projects" item={SchoolProjects} />
        </div>
    );
}
