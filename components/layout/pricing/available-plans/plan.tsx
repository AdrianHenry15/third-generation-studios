"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

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

const Plan = ({ title, description, features, mostPopular }: IPlanProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 255, 135, 0.3)" }}
            className={`flex flex-col p-6 rounded-xl shadow-lg z-50 border-2 transition-transform m-4 md:m-6
                ${mostPopular ? "border-green-500 bg-gradient-to-r from-black to-gray-900" : "border-gray-700 bg-gray-900"}
            `}
        >
            {/* Header */}
            <div className="flex flex-col gap-4 text-center">
                <h3 className={`text-2xl font-bold ${mostPopular ? "text-green-400" : "text-white"}`}>{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-6 flex-1">
                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                        <div className="text-green-400 text-xl">{item.icon}</div>
                        <div>
                            <strong className="text-white">{item.feature}</strong>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <p className="text-gray-500 text-sm">Interested in this plan? Contact us for more details.</p>
                <Link
                    href={"/consultation"}
                    className="mt-4 block py-3 text-center text-black bg-green-400 hover:bg-green-500 rounded-lg font-medium transition duration-300 w-full"
                >
                    Learn More
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default Plan;
