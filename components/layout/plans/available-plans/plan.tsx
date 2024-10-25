import React from "react";
import { IoMdConstruct } from "react-icons/io";
import { IconType } from "react-icons/lib";

export interface IPriceType {
    base: string;
    monthly: string;
    yearly: string;
}

export interface IFeatureProps {
    icon: React.ReactNode;
    feature: string;
    description: string;
}

interface IPlanProps {
    title: string;
    description: string;
    price: IPriceType;
    features: IFeatureProps[];
    mostPopular?: boolean;
}

const Plan = (props: IPlanProps) => {
    const { title, description, price, features, mostPopular } = props;
    return (
        <div
            className={`${
                mostPopular ? "border-[3px] border-orange-600" : "border-black border-[3px]"
            }  flex flex-col  m-4 py-4 px-3 rounded-lg flex-1 h-[700px]`}
        >
            <div className="flex flex-col w-full p-2 border-[1px] bg-black border-white rounded-lg h-full">
                <h3 className="text-3xl text-white font-semibold text-start">{title}</h3>
                <p className="text-white">{description}</p>
                {/* Price */}
                <div className="flex flex-col my-8">
                    <div className="flex items-center">
                        <strong className="text-3xl mr-1 text-white">{`$${price.base}`}</strong>
                        <p className="text-white">{`/ Yearly payment of $${price.yearly}`}</p>
                    </div>
                    <p className="text-gray-500 text-sm">{`Monthy payment of $${price.monthly}`}</p>
                </div>
                {features.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center my-4">
                            <span className="mr-2 text-white">
                                {/* <IoMdConstruct /> */}
                                {item.icon}
                            </span>
                            <div className="flex items-center text-white">
                                <strong className="mr-1">{item.feature}</strong>
                                <p className="text-white">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Plan;
