import React from "react";

import PricingHeader from "./pricing-header";
import PricingCard from "@/components/pricing-card";
import Link from "next/link";

const BasicFeatures = [""];

const StandardFeatures = [""];

const PremiumFeatures = [""];

const MusicPricing = () => {
    return (
        <div>
            {/*WEBSITE PRICING HEADER */}
            <PricingHeader pricingType="Music License Pricing" />
            {/* WEBSITE PRICING CARDS */}
            <div className="flex flex-col lg:flex-row">
                <PricingCard
                    popular
                    title={"Muisc Licensing Basic"}
                    description={"Limited personal or non-commercial use, with restrictions."}
                    price={"$19.00"}
                    features={BasicFeatures}
                />
                <PricingCard
                    title={"Music Licensing Standard"}
                    description={"Flexible for commercial projects, with some limitations."}
                    price={"$49.00"}
                    features={StandardFeatures}
                />
                <PricingCard
                    title={"Music Licensing Premium"}
                    description={"Comprehensive rights for major productions, at a higher cost."}
                    price={"$190.00"}
                    features={PremiumFeatures}
                />
            </div>
            {/* GET WEBSITE ESTIMATE BUTTON */}
            <div className="w-full flex justify-center items-center my-10">
                <Link className="w-[90%] bg-red-600 rounded-full flex py-4 justify-center md:w-[50%] lg:w-[40%]" href={"/estimate"}>
                    <span className="text-white font-semibold">Get A Music License Free Estimate</span>
                </Link>
            </div>
        </div>
    );
};

export default MusicPricing;
