import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Third Generation Studios",
    description:
        "Learn about Third Generation Studios — our story, team, and principles behind our high-performance web and media engineering.",
    keywords: [
        "about",
        "team",
        "third generation studios",
        "web development",
        "music production",
        "next.js",
        "react",
    ],
    openGraph: {
        url: "https://thirdgenerationstudios.com/about",
        type: "website",
        title: "About | Third Generation Studios",
        description:
            "Meet the people and principles powering Third Generation Studios. We craft high-performance web and media experiences.",
        images: [],
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Third Generation Studios",
        description:
            "Our story, our team, and how we build fast, interactive experiences at Third Generation Studios.",
        images: [],
    },
    alternates: {
        canonical: "https://thirdgenerationstudios.com/about",
    },
};

export default function Layout({ children }: { children: React.ReactNode }){
    return(
        <div>
            {
                children
            }
        </div>
    )
}