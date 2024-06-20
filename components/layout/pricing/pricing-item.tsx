"use client";

import React, { useState } from "react";

import PricingHeader from "./pricing-header";
import Link from "next/link";
import LicenseCard from "@/components/license-card";
import { LicenseDataType } from "@/lib/types";

interface IPricingItemProps {
    type: string;
    title: string;
    licenseData: LicenseDataType[];
    buttonTitle: string;
}

const PricingItem = (props: IPricingItemProps) => {
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
            <PricingHeader pricingType={props.type} />
            {/* WEBSITE PRICING CARDS */}
            <div className="flex flex-col p-4 lg:px-24 xl:px-64">
                <div className="flex border-b-[1px] border-zinc-900">
                    <h5 className="text-white mb-2 text-2xl">{props.title}</h5>
                </div>
                <div className="flex items-center justify-center flex-wrap my-10">
                    {props.licenseData.map((license, index) => (
                        <LicenseCard
                            key={index}
                            license={license}
                            selected={index === selectedCardIndex}
                            onClick={() => handleCardClick(index)}
                        />
                    ))}
                </div>
            </div>
            {/* GET ESTIMATE BUTTON */}
            <div className="w-full flex justify-center items-center mb-10">
                <Link className="w-[90%] bg-red-600 rounded-full flex py-4 justify-center md:w-[50%] lg:w-[40%]" href={"/estimate"}>
                    <span className="text-white font-semibold">{props.buttonTitle}</span>
                </Link>
            </div>
        </div>
    );
};

export default PricingItem;
