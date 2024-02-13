import React from "react";

interface IPricingHeaderProps {
    pricingType: string;
}

const PricingHeader = (props: IPricingHeaderProps) => {
    return (
        <div className="flex flex-col py-24 px-4 text-center">
            <h5 className="text-red-600 font-semibold text-sm">{props.pricingType}</h5>
            <h1 className="text-white text-4xl font-bold">
                Get your <span className="text-red-600">free</span> estimate today!
            </h1>
            <p>Special features coming soon</p>
        </div>
    );
};

export default PricingHeader;
