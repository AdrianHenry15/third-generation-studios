import MusicPricing from "@/components/layout/pricing/music-pricing";
import PricingItem from "@/components/layout/pricing/pricing-item";
import WebsitePricing from "@/components/layout/pricing/website-pricing";
import { MusicLicenseData, WebsitePricingData } from "@/lib/pricing-data";

export default function PricingPage() {
    return (
        <section className="flex flex-col w-full justify-center h-full bg-black px-2 md:px-[15%] lg:px-2">
            <PricingItem
                type={"Website"}
                title={"Website Pricing"}
                licenseData={WebsitePricingData}
                buttonTitle={"Get Free Website Pricing Estimate"}
            />
            <PricingItem
                type={"Music"}
                title={"Music Licensing"}
                licenseData={MusicLicenseData}
                buttonTitle={"Get Free Music Licensing Estimate"}
            />
            {/* <WebsitePricing />
            <MusicPricing /> */}
        </section>
    );
}
