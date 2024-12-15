import Link from "next/link";
import React from "react";

export interface IFeatureProps {
    icon: React.ReactNode;
    feature: string;
    description: string;
}

interface IPlanProps {
    title: string;
    description: string;
    features: IFeatureProps[];
    mostPopular?: boolean;
}

const Plan = (props: IPlanProps) => {
    const { title, description, features, mostPopular } = props;

    return (
        <div
            className={`flex flex-col p-6 rounded-xl shadow-lg z-50 ${
                mostPopular ? "border-4 border-green-500 bg-gradient-to-r from-green-100 to-green-50" : "border border-gray-300 bg-white"
            } hover:shadow-2xl transition-transform transform hover:scale-105 m-4 md:m-6`}
        >
            {/* Header */}
            <div className="flex flex-col gap-4">
                <h3 className={`text-2xl font-bold ${mostPopular ? "text-green-600" : "text-gray-900"}`}>{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-6 flex-1">
                {features.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="text-green-600 text-xl">{item.icon}</div>
                        <div>
                            <strong className="text-gray-900">{item.feature}</strong>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
                <p className="text-gray-500 text-center text-sm">Interested in this plan? Contact us for more details and pricing.</p>
                <Link
                    href={"/consultation"}
                    className="mt-4 block py-3 text-center text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition duration-300 w-full"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default Plan;
