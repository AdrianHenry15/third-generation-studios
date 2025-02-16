import React from "react";
import Plan from "./plan";
import { StudioBasicFeatures, StudioCommerceFeatures, StudioPlusFeatures, StudioProFeatures } from "@/lib/features";

const AvailablePlans = () => {
    return (
        <section>
            {/* Title */}
            <h5 className="flex items-center justify-center text-center w-full font-semibold text-6xl py-24">Available Plans</h5>
            {/* Plans */}
            <div className="flex flex-col xl:flex-row">
                <Plan description="Everything you need to get started" title="Studio Basic" features={StudioBasicFeatures} />
                <Plan description="Extra features including Email Services" title="Studio Plus" features={StudioPlusFeatures} />
                <Plan
                    description="Powerful extra features including User Authentication services"
                    title="Studio Pro"
                    features={StudioProFeatures}
                />
                <Plan
                    description="A full ecommerce website utilizing the power of Square payment processing"
                    title="Studio Commerce"
                    mostPopular={true}
                    features={StudioCommerceFeatures}
                />
            </div>
        </section>
    );
};

export default AvailablePlans;
