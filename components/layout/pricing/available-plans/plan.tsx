"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Feature {
    icon: React.ReactNode;
    feature: string;
    description: string;
}
interface PlanProps {
    title: string;
    desc: string;
    features: Feature[];
    popular?: boolean;
    featured?: boolean;
    className?: string;
}

export default function Plan({ title, desc, features, popular, featured, className }: PlanProps) {
    return (
        <motion.div
            className={`flex max-w-2xl flex-col p-6 md:p-7 xl:p-8 rounded-3xl bg-gray-900 border-2 relative ${popular ? "border-green-400 bg-gradient-to-br from-gray-900 to-black" : "border-gray-700"} ${featured ? "scale-105 shadow-3xl z-20 -translate-y-4 border-4 border-green-400" : ""} shadow-2xl hover:scale-[1.03] transition-transform duration-300 ${className || ""}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-400 text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg z-30">
                    Most Popular
                </div>
            )}
            <div className="text-center mb-4">
                <h3 className={`text-2xl font-bold mb-1 ${popular ? "text-green-400" : "text-white"}`}>{title}</h3>
                <p className="text-gray-400 text-base">{desc}</p>
            </div>
            <div className="flex-1 space-y-2 mb-4">
                {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`${popular ? "text-green-400" : "text-purple-400"} mt-1 text-lg`}>{f.icon}</div>
                        <div>
                            <h4 className="text-white font-semibold text-base">{f.feature}</h4>
                            <p className="text-gray-500 text-xs">{f.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                href="/consultation"
                className={`mt-6 block py-3 px-6 text-center font-semibold ${
                    popular ? "bg-green-400 text-black hover:bg-green-500" : "bg-purple-600 text-white hover:bg-purple-700"
                } rounded-full transition shadow-md`}
            >
                Get Started
            </Link>
        </motion.div>
    );
}
