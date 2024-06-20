import PricingItem from "@/components/layout/pricing/pricing-item";
import { WebsitePricingData } from "@/lib/pricing-data";

export default function PricingPage() {
    return (
        <section className="flex flex-col w-full justify-center h-full bg-black px-2 md:px-[15%] lg:px-2">
            <PricingItem
                type={"Website"}
                title={"Website Pricing"}
                licenseData={WebsitePricingData}
                buttonTitle={"Get Free Website Pricing Estimate"}
            />
            {/* <WebsitePricing /> */}
        </section>
    );
}
