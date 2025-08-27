import WebsiteRow from "@/components/layout/websites/website-row";
import WebsiteSplash from "@/components/layout/websites/website-splash";
import { ClientWebsites, PersonalWebsites, SchoolWebsites } from "@/lib/websites";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Website Designs | Third Generation Studios",
    description: "Choose A Design and Schedule An Consultation Today",
    keywords: [
        "designs",
        "ui/ux",
        "mvp",
        "website development",
        "react",
        "nextjs"
    ],
    openGraph:{
        url: "https://thirdgenerationstudios.com/websites",
        type: "website",
        description: "Choose A Design and Schedule An Consultation Today",
        images:[
            {
                url: "https://thirdgenerationstudios.com/websites/brite.png",
                width: 1200,
                height: 630,
                alt: "Brite - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/budget-tracker.png",
                width: 1200,
                height: 630,
                alt: "Budget Tracker - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/calendar.png",
                width: 1200,
                height: 630,
                alt: "Calendar - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/egs-screenshot.png",
                width: 1200,
                height: 630,
                alt: "EGS - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/gameboy.png",
                width: 1200,
                height: 630,
                alt: "Gameboy - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/git-book.png",
                width: 1200,
                height: 630,
                alt: "Git Book - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/mollys.png",
                width: 1200,
                height: 630,
                alt: "Mollys - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/past-portfolio.png",
                width: 1200,
                height: 630,
                alt: "Protfolio - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/taharkabros1.webp",
                width: 1200,
                height: 630,
                alt: "TaharkaBros - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/taharkabros2.jpg",
                width: 1200,
                height: 630,
                alt: "TaharkaBros - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/task-app-1.png",
                width: 1200,
                height: 630,
                alt: "Task App - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/task-app-2.png",
                width: 1200,
                height: 630,
                alt: "Task App - Projects"
            },{
                url: "https://thirdgenerationstudios.com/websites/zpp.png",
                width: 1200,
                height: 630,
                alt: "Zoo Keeper - Projects"
            },
        ]
    },
    twitter:{
        card: "summary_large_image",
        title: "Website Designs",
        description: "Choose A Design and Schedule An Consultation Today",
        creator: "@thirdgenerationstudios",
        site: "@thirdgenerationstudios",
        images:[
            {
                url: "https://thirdgenerationstudios.com/websites/brite.png",
                width: 1200,
                height: 630,
                alt: "Brite - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/budget-tracker.png",
                width: 1200,
                height: 630,
                alt: "Budget Tracker - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/calendar.png",
                width: 1200,
                height: 630,
                alt: "Calendar - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/egs-screenshot.png",
                width: 1200,
                height: 630,
                alt: "EGS - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/gameboy.png",
                width: 1200,
                height: 630,
                alt: "Gameboy - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/git-book.png",
                width: 1200,
                height: 630,
                alt: "Git Book - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/mollys.png",
                width: 1200,
                height: 630,
                alt: "Mollys - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/past-portfolio.png",
                width: 1200,
                height: 630,
                alt: "Protfolio - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/taharkabros1.webp",
                width: 1200,
                height: 630,
                alt: "TaharkaBros - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/taharkabros2.jpg",
                width: 1200,
                height: 630,
                alt: "TaharkaBros - Client"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/task-app-1.png",
                width: 1200,
                height: 630,
                alt: "Task App - Projects"
            },
            {
                url: "https://thirdgenerationstudios.com/websites/task-app-2.png",
                width: 1200,
                height: 630,
                alt: "Task App - Projects"
            },{
                url: "https://thirdgenerationstudios.com/websites/zpp.png",
                width: 1200,
                height: 630,
                alt: "Zoo Keeper - Projects"
            },
        ]
    },
    alternates:{
        canonical: "https://thirdgenerationstudios.com"
    }
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
