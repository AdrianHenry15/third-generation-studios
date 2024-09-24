import AvailablePlans from "@/components/layout/plans/available-plans";
import PlansSplash from "@/components/plans-splash";
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
            {/* Available Plans */}
            {/* Studio Basic, Studio Plus, Studio Pro, Studio Commerce */}
            <AvailablePlans />
        </div>
    );
}
