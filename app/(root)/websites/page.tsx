import WebsiteRow from "@/components/layout/websites/website-row";
import WebsiteSplash from "@/components/layout/websites/website-splash";
import { ClientWebsites, PersonalWebsites, SchoolWebsites } from "@/lib/websites";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <WebsiteSplash />
            <WebsiteRow title="Client Websites" items={ClientWebsites} />
            <WebsiteRow title="Personal Projects" items={PersonalWebsites} />
            <WebsiteRow title="School Projects" items={SchoolWebsites} />
        </div>
    );
}
