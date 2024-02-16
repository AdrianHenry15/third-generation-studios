"use client";

import React, { useState } from "react";

import PricingHeader from "./pricing-header";
import Link from "next/link";
import LicenseCard from "@/components/license-card";

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

const LicenseData = [
    { title: "Basic", price: "10", description: "Online Presence" },
    { title: "Standard", price: "15", description: "More Dynamic" },
    { title: "Premium", price: "20", description: "More Sophisticated" },
];

const WebsitePricing = () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

    const handleCardClick = (index: number) => {
        if (index === selectedCardIndex) {
            // Clicked on already selected card, deselect it
            setSelectedCardIndex(-1);
        } else {
            // Clicked on a different card, select it
            setSelectedCardIndex(index);
        }
    };

    return (
        <div>
            {/*WEBSITE PRICING HEADER */}
            <PricingHeader pricingType="Wesbite" />
            {/* WEBSITE PRICING CARDS */}
            <div className="flex flex-col p-4 lg:px-24 xl:px-64">
                <div className="flex border-b-[1px] border-zinc-900">
                    <h5 className="text-white mb-2 text-2xl">Website Pricing</h5>
                </div>
                <div className="flex items-center">
                    {LicenseData.map((license, index) => (
                        <LicenseCard
                            key={index}
                            title={license.title}
                            price={license.price}
                            fileType={license.description}
                            selected={index === selectedCardIndex}
                            onClick={() => handleCardClick(index)}
                        />
                    ))}
                </div>
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
