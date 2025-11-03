import AvailablePlans from "@/app/(root)/pricing/components/available-plans";
import SplashIconRow from "@/app/(root)/pricing/components/icon-promo/icon-row";
import { Metadata } from "next";
import PricingSplash from "@/app/(root)/pricing/components/splash";

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
