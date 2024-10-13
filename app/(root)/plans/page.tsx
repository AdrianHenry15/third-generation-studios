import AvailablePlans from "@/components/layout/plans/available-plans";
import PlansSplash from "@/components/layout/plans/splash";
import SplashIconRow from "@/components/layout/plans/icon-promo/icon-row";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stand out with Studio Commerce",
    description: "Website developed with the latest and greatest development tools",
};

export default async function PlansPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Splash */}
            <PlansSplash />
            {/* Studio Commerce Features */}
            <SplashIconRow />
            {/* Available Plans */}
            {/* Studio Basic, Studio Plus, Studio Pro, Studio Commerce */}
            <AvailablePlans />
        </div>
    );
}
