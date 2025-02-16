import AvailablePlans from "@/components/layout/pricing/available-plans";
import SplashIconRow from "@/components/layout/pricing/icon-promo/icon-row";
import { Metadata } from "next";
import PricingSplash from "@/components/layout/pricing/splash";

export const metadata: Metadata = {
    title: "Stand out with Studio Commerce",
    description: "Website developed with the latest and greatest development tools",
};

export default async function PricingPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Splash */}
            <PricingSplash />
            {/* Studio Commerce Features */}
            <SplashIconRow />
            {/* Available Plans */}
            {/* Studio Basic, Studio Plus, Studio Pro, Studio Commerce */}
            <AvailablePlans />
        </div>
    );
}
