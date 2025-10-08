import { Metadata } from "next";
import React from "react";

import FAQContainer from "./components/container";
import FAQSidebarNav from "./components/sidebar-nav";
import ScrollUpBtn from "@/components/scroll-up-btn";
import { FaqType, NavMenuType } from "@/lib/types/generic-types";
const FaqNavItems: NavMenuType[] = [];

const FaqItems: FaqType[] = [];

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Third Generation Studios",
    description:
        "Have questions about web development or music production? Find answers to the most common questions about Third Generation Studios' services, pricing, and process.",
    openGraph: {
        title: "Frequently Asked Questions | Third Generation Studios",
        description:
            "Find answers to the most common questions about Third Generation Studios' web development and music production services, pricing, and process.",
        url: "https://thirdgenerationstudios.com/faqs",
    },
    twitter: {
        card: "summary_large_image",
        title: "Frequently Asked Questions | Third Generation Studios",
        description:
            "Find answers to the most common questions about Third Generation Studios' web development and music production services, pricing, and process.",
    },
};

export default async function FAQsPage() {
    return (
        <section className="flex flex-col w-full bg-white relative">
            {/* TITLE */}
            <h5 className="text-[60px] text-white tracking-wider pl-6 bg-gray-900 py-4 md:py-24">FAQs</h5>
            {/* MAIN PAGE WORKSPACE */}
            <div className="flex flex-col w-full mb-10 md:my-10 md:flex-row">
                {/* FAQs Sidebar Nav */}
                <FAQSidebarNav items={FaqNavItems} />
                <div className="flex flex-col flex-1 w-full relative">
                    {/* FAQs */}
                    <FAQContainer title="Third Generation Studios" id="third-gen" items={FaqItems} />
                </div>
            </div>
            <ScrollUpBtn />
        </section>
    );
}
