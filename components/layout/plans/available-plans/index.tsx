import React from "react";
import Plan from "./plan";
import { BsWrench } from "react-icons/bs";
import { StudioBasicFeatures, StudioCommerceFeatures, StudioPlusFeatures, StudioProFeatures } from "@/lib/features";

const AvailablePlans = () => {
    return (
        <section>
            {/* Title */}
            <h5 className="flex items-center justify-center w-full font-semibold text-6xl py-10">Available Plans</h5>
            {/* Plans */}
            <div className="flex flex-col lg:flex-row">
                <Plan
                    description="Everything you need to get started"
                    title="Studio Basic"
                    price={{
                        base: "250.00",
                        monthly: "100.00",
                        yearly: "1,000.00",
                    }}
                    features={StudioBasicFeatures}
                />
                <Plan
                    description="Extra features including Email Services"
                    title="Studio Plus"
                    price={{
                        base: "350.00",
                        monthly: "200.00",
                        yearly: "2,000.00",
                    }}
                    features={StudioPlusFeatures}
                />
                <Plan
                    description="Powerful extra features including User Authentication services"
                    title="Studio Pro"
                    price={{
                        base: "500.00",
                        monthly: "300.00",
                        yearly: "3,200.00",
                    }}
                    features={StudioProFeatures}
                />
                <Plan
                    description="A full ecommerce website utilizing the power of Square payment processing"
                    title="Studio Commerce"
                    mostPopular={true}
                    price={{
                        base: "750.00",
                        monthly: "500.00",
                        yearly: "5,000.00",
                    }}
                    features={StudioCommerceFeatures}
                />
            </div>
        </section>
    );
};

export default AvailablePlans;
