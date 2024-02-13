import HomeSplash from "@/components/layout/home/home-splash";
import WebsiteRow from "@/components/layout/websites/website-row";
import { ClientWebsites, PersonalWebsites, SchoolWebsites } from "@/lib/websites";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <HomeSplash />
            <WebsiteRow title="Client Websites" items={ClientWebsites} />
            <WebsiteRow title="Personal Projects" items={PersonalWebsites} />
            <WebsiteRow title="School Projects" items={SchoolWebsites} />
        </div>
    );
}
