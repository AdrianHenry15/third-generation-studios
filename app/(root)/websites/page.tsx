import WebsiteRow from "@/components/layout/websites/website-row";
import WebsiteSplash from "@/components/layout/websites/website-splash";
import { ClientWebsites, PersonalWebsites, SchoolWebsites } from "@/lib/websites";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Website Designs",
    description: "Choose A Design and Schedule An Consultation Today",
};

// TODO:Add Emailjs, Clerkjs, Square promotions using their websites as references
export default function WebsitesPage() {
    return (
        <div className="bg-black overflow-x-hidden">
            <WebsiteSplash />
            <div className="flex flex-col px-4 py-14 lg:px-10">
                <WebsiteRow title="Your Vision, Our Code, Transforming Ideas into Stunning Websites" items={ClientWebsites} />
                <WebsiteRow title="Bringing Your Ideas to Life, Crafting Unique Websites for Every Passion" items={PersonalWebsites} />
                <WebsiteRow title="Empowering Learning, Showcasing Creativity Through Student Projects" items={SchoolWebsites} />
            </div>
        </div>
    );
}
