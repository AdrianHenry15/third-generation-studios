import WebsiteRow from "@/components/layout/websites/website-row";
import WebsiteSplash from "@/components/layout/websites/website-splash";
import { ClientWebsites, PersonalWebsites, SchoolWebsites } from "@/lib/websites";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Website Designs",
    description: "Choose A Design and Get An Estimate Today",
};

// TODO:Add Emailjs, Clerkjs, Square promotions using their websites as references
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
