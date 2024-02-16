"use client";

import React, { useState } from "react";

import PricingHeader from "./pricing-header";
import Link from "next/link";
import LicenseCard from "@/components/license-card";

const LicenseData = [
    { title: "Basic License", price: "10", fileType: "MP3" },
    { title: "Standard License", price: "20", fileType: "MP3" },
    { title: "Premium License", price: "30", fileType: "WAV" },
    // { title: "Premium Plus", price: "50", fileType: "WAV, STEMS, MP3" },
    // { title: "Unlimited", price: "200", fileType: "WAV, STEMS, MP3" },
    // { title: "Exclusive", price: "2000", fileType: "WAV, STEMS, MP3" },
];

const MusicPricing = () => {
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
            <PricingHeader pricingType="Music License Pricing" />
            {/* WEBSITE PRICING CARDS */}
            <div className="flex flex-col p-4 lg:px-24 xl:px-64">
                <div className="flex border-b-[1px] border-zinc-900">
                    <h5 className="text-white mb-2 text-2xl">Music Licensing</h5>
                </div>
                <div className="flex items-center flex-wrap">
                    {LicenseData.map((license, index) => (
                        <LicenseCard
                            key={index}
                            title={license.title}
                            price={license.price}
                            fileType={license.fileType}
                            selected={index === selectedCardIndex}
                            onClick={() => handleCardClick(index)}
                        />
                    ))}
                </div>
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
