import MusicPricing from "@/components/layout/pricing/music-pricing";
import WebsitePricing from "@/components/layout/pricing/website-pricing";

export default function PricingPage() {
    return (
        <section className="flex flex-col w-full justify-center h-full bg-black px-2 md:px-[15%] lg:px-2">
            <WebsitePricing />
            <MusicPricing />
        </section>
    );
}
