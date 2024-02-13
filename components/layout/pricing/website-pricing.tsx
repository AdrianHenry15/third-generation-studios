import React from "react";

import PricingHeader from "./pricing-header";
import PricingCard from "@/components/pricing-card";
import Link from "next/link";

const BasicFeatures = [
    "Up to 5 static pages (e.g. Home, About Us, Services, Contact)",
    "Basic contact form",
    "Mobie responsiveness",
    "Integration with a standard CMS (e.g., Shopify)",
    "Stock images or basic graphics",
];

const StandardFeatures = [
    "Up to 10 pages, including a blog/news section",
    "Custom design with basic branding elements",
    "Contact form with advanced fields",
    "Integration of social media links",
    "Responsive design for mobile and tablet devices",
    "Basic SEO setup",
    "Integration of third-party tools (e.g., Google Analytics)",
];

const PremiumFeatures = [
    "Custom design with a unique and professional look",
    "Unlimited pages and advanced content structure",
    "E-commerce functionality with secure payment processing",
    "Advanced forms and interactive elements",
    "High-level SEO optimization",
    "Integration with CRM systems or other business tools",
    "Ongoing maintenance and support",
];

const WebsitePricing = () => {
    return (
        <div>
            {/*WEBSITE PRICING HEADER */}
            <PricingHeader pricingType="Wesbite" />
            {/* WEBSITE PRICING CARDS */}
            <div className="flex flex-col lg:flex-row">
                <PricingCard
                    hasFeatures
                    popular
                    title={"Website Basic"}
                    description={"For a simple online presence"}
                    price={"$189.00"}
                    features={BasicFeatures}
                />
                <PricingCard
                    hasFeatures
                    title={"Website Standard"}
                    description={"For a more dynamic online presence"}
                    price={"$1,375.00"}
                    features={StandardFeatures}
                />
                <PricingCard
                    hasFeatures
                    title={"Website Premium"}
                    description={"For a more sophisticated online presence"}
                    price={"$3,450.00"}
                    features={PremiumFeatures}
                />
            </div>
            {/* GET WEBSITE ESTIMATE BUTTON */}
            <div className="w-full flex justify-center items-center my-10">
                <Link className="w-[90%] bg-red-600 rounded-full flex py-4 justify-center md:w-[50%] lg:w-[40%]" href={"/estimate"}>
                    <span className="text-white font-semibold">Get Website Free Estimate</span>
                </Link>
            </div>
        </div>
    );
};

export default WebsitePricing;
