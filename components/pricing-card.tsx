import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { BiCheck } from "react-icons/bi";

interface IPricingCardProps {
    title: string;
    description: string;
    price: string;
    popular?: boolean;
    features: string[];
}

const PricingCard = (props: IPricingCardProps) => {
    return (
        <div className="flex flex-col flex-1 relative pb-10 mx-2 bg-white rounded-lg shadow-lg shadow-white">
            <div className="flex bg-red-600 rounded-t-lg justify-between p-2">
                <h4 className="font-semibold text-xl">{props.title}</h4>
                <div className="flex justify-between items-center">
                    {props.popular && <span className="bg-black text-white text-xs items-center flex rounded-lg p-2">Most Popular</span>}
                </div>
            </div>
            <div className="p-2">
                {/* TOP */}
                <span className="text-md flex justify-center">{props.description}</span>
                {/* PRICING */}
                <div className="flex items-center my-10">
                    <h2 className="text-4xl font-bold flex mr-2">{`$${props.price}`}</h2>
                    <p className="text-xs">USD</p>
                </div>
                {/* FEATURES */}
                <div className="border-t-[1px]">
                    <span className="font-semibold my-2 text-sm">Standout features</span>
                    {props.features.map((item) => {
                        return (
                            <div className="flex items-center my-4 text-sm" key={item}>
                                <span>
                                    <BiCheck size={18} />
                                </span>
                                <span>{item}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
