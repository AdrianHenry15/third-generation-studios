import Link from "next/link";
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
                mostPopular ? "border-[3px] border-green-600" : "border-black border-[3px]"
            }  flex flex-col p-0 m-2 rounded-lg flex-1 h-[700px] md:m-2 md:p-2`}
        >
            <div className="flex flex-col w-full p-6 border-[1px] bg-black border-white rounded-lg h-full overflow-hidden overflow-y-scroll">
                <h3 className="text-3xl text-white font-semibold text-start">{title}</h3>
                <p className="text-gray-400">{description}</p>
                {/* Price */}
                <div className="flex flex-col my-8">
                    <div className="flex items-center">
                        <strong className="text-3xl mr-1 text-white">{`$${price.base}`}</strong>
                    </div>
                    <p className="text-gray-400">{`Yearly payment of $${price.yearly}`}</p>
                    <p className="text-gray-500 text-sm">{`Monthy payment of $${price.monthly}`}</p>
                </div>
                {features.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center my-4">
                            <span className="mr-2 text-white">
                                {/* <IoMdConstruct /> */}
                                {item.icon}
                            </span>
                            <div className="flex flex-col items-start text-white">
                                <strong className="mr-1">{item.feature}</strong>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
                <Link
                    className="hover:scale-105 duration-300 ease-in-out transition-transform text-black bg-white flex items-center justify-center rounded-lg w-full self-center py-2 md:w-1/2"
                    href={"/estimate"}
                >{`Get ${title}`}</Link>
            </div>
        </div>
    );
};

export default Plan;
