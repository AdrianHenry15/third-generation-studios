"use client";

import HomeSplash from "@/components/layout/home/home-splash";
import TrackRow from "@/components/layout/music/tracks/track-row";
import WebsiteRow from "@/components/layout/websites/website-row";
import { AllSearchTracks } from "@/lib/tracks";
import { ClientWebsites } from "@/lib/websites";

export default function HomePage() {
    return (
        <section className="bg-black flex flex-col">
            {/* SPLASH */}
            <HomeSplash />
            <div className="px-4 md:px-10">
                <WebsiteRow title="Client Websites" items={ClientWebsites} />
                <div className="border-y-[1px] border-gray-700">
                    <TrackRow title="All Tracks By Search" items={AllSearchTracks} />
                </div>
            </div>
        </section>
    );
}
