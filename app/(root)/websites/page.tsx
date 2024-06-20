import WebsiteRow from "@/components/layout/websites/website-row";
import WebsiteSplash from "@/components/layout/websites/website-splash";
import { ClientWebsites, PersonalWebsites, SchoolWebsites } from "@/lib/websites";

export default function WebsitesPage() {
    return (
        <div className="bg-black">
            <WebsiteSplash />
            <div className="flex flex-col px-4 py-14 lg:px-10">
                <WebsiteRow title="Client Websites" items={ClientWebsites} />
                <WebsiteRow title="Personal Projects" items={PersonalWebsites} />
                <WebsiteRow title="School Projects" items={SchoolWebsites} />
            </div>
        </div>
    );
}
