import React from "react";
import { BiCheck } from "react-icons/bi";

interface IPricingCardProps {
    title: string;
    description: string;
    price: string;
    popular?: boolean;
    features: string[];
    hasFeatures?: boolean;
}

const PricingCard = (props: IPricingCardProps) => {
    return (
        <div className="flex flex-col flex-1 relative pb-10 mx-2 bg-white rounded-md shadow-lg shadow-white my-6">
            <div className="flex bg-red-600 rounded-t-md justify-between px-2 py-6">
                <h4 className="font-semibold text-xl">{props.title}</h4>
                <div className="flex justify-between items-center">
                    {/* {props.popular && (
                        <span className="bg-black text-white text-xs items-center flex rounded-lg py-2 px-6 font-semibold">
                            Most Popular
                        </span>
                    )} */}
                </div>
            </div>
            <div className="p-4">
                {/* TOP */}
                <span className="text-4xl font-extralight flex justify-center text-center">{props.description}</span>
                {/* PRICING */}
                <div className="flex items-center justify-center my-10">
                    <h2 className="text-2xl font-bold flex mr-2 items-end">
                        <p className="font-light text-2xl mr-2">as low as</p>
                        {`${props.price}`}
                    </h2>
                    <p className="text-xs">USD</p>
                </div>
                {/* FEATURES */}
                {props.hasFeatures && (
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
                )}
            </div>
        </div>
    );
};

export default PricingCard;
