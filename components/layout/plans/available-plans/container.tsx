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

interface IContainerProps {
    title?: string;
    description?: string;
    price?: IPriceType;
    features?: IFeatureProps;
    mostPopular?: boolean;
}

const Container = (props: IContainerProps) => {
    const { title, description, price, features, mostPopular } = props;
    return (
        <div className={`${mostPopular ? "border-[1px] border-orange-600" : "border-zinc-300 border-[1px]"} flex flex-col m-4 py-6 px-3`}>
            <h3 className="text-3xl font-semibold text-start">Studio Basic</h3>
            {/* <h3>{title}</h3> */}
            <p>A website development using Next.js and Vercel for fast, efficient website building and seamless deployment.</p>
            {/* Price */}
            <div className="flex items-center my-8">
                <strong className="text-3xl mr-1">$9.00</strong>
                <p>/ Yearly payment of $20.00</p>
            </div>
            {/* {features} */}
            <div className="flex items-center">
                <span className="mr-2">
                    <IoMdConstruct />
                </span>
                <div className="flex items-center">
                    <strong className="mr-1">Feature text</strong>
                    <p>Description text</p>
                </div>
            </div>
        </div>
    );
};

export default Container;
