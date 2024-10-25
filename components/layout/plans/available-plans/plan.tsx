import React from "react";
import { IoMdConstruct } from "react-icons/io";
import { IconType } from "react-icons/lib";

export interface IPriceType {
    monthly: string;
    yearly: string;
}

export interface IFeatureProps {
    icon: IconType;
    strongText: string;
    text: string;
}

interface IPlanProps {
    title: string;
    description?: string;
    price?: IPriceType;
    features?: IFeatureProps;
    mostPopular?: boolean;
}

const Plan = (props: IPlanProps) => {
    const { title, description, price, features, mostPopular } = props;
    return (
        <div
            className={`${
                mostPopular ? "border-[1px] border-orange-600" : "border-black border-[1px]"
            }  flex flex-col  m-4 py-4 px-3 rounded-lg flex-1 h-[700px]`}
        >
            <div className="flex flex-col w-full p-2 border-[1px] bg-black border-white rounded-lg h-full">
                <h3 className="text-3xl text-white font-semibold text-start">{title}</h3>
                {/* <h3>{title}</h3> */}
                <p className="text-white">{description}</p>
                {/* Price */}
                <div className="flex items-center my-8">
                    <strong className="text-3xl mr-1 text-white">$9.00</strong>
                    <p className="text-white">/ Yearly payment of $20.00</p>
                </div>
                {/* {features} */}
                <div className="flex items-center">
                    <span className="mr-2 text-white">
                        <IoMdConstruct />
                    </span>
                    <div className="flex items-center text-white">
                        <strong className="mr-1">Feature text</strong>
                        <p className="text-white">Description text</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plan;
