import React from "react";
import { StudioBasicFeatures, StudioPlusFeatures, StudioProFeatures, StudioCommerceFeatures } from "@/lib/features";
import { Check, X } from "lucide-react";
import Link from "next/link";

interface Feature {
    icon: React.ReactNode;
    feature: string;
    description: string;
}

interface PlanType {
    title: string;
    desc: string;
    features: Feature[];
    popular?: boolean;
}

const plans: PlanType[] = [
    { title: "Studio Basic", desc: "Get started quickly", features: StudioBasicFeatures },
    { title: "Studio Plus", desc: "Enhanced tools", features: StudioPlusFeatures },
    { title: "Studio Pro", desc: "Full auth", features: StudioProFeatures },
    { title: "Studio Commerce", desc: "Complete e-commerce", features: StudioCommerceFeatures, popular: true },
];

const allFeatures: string[] = Array.from(new Set(plans.flatMap((plan) => plan.features.map((f: Feature) => f.feature))));

function getFeatureDescription(plan: PlanType, feature: string): string | undefined {
    const found = plan.features.find((f: Feature) => f.feature === feature);
    return found ? found.description : undefined;
}

export default function AvailablePlans() {
    return (
        <section
            id="plans"
            className="relative py-20 px-2 sm:px-6 md:px-12 bg-gradient-to-br from-black via-zinc-900 to-gray-950 overflow-x-hidden"
        >
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="w-96 h-96 bg-gradient-radial from-green-500/20 to-transparent rounded-full blur-3xl absolute -top-32 left-1/2 -translate-x-1/2" />
                <div className="w-80 h-80 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl absolute top-40 right-1/2 translate-x-1/3" />
            </div>
            <h2 className="relative z-10 text-center text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-white to-blue-400 bg-clip-text text-transparent mb-16 drop-shadow-lg">
                Available Plans
            </h2>
            {/* Chart for large screens */}
            <div className="hidden lg:block relative z-10 overflow-x-auto max-w-6xl mx-auto rounded-2xl shadow-2xl bg-zinc-900/90 border border-zinc-800">
                <table className="min-w-full border-collapse">
                    <thead className="sticky top-0 z-20">
                        <tr>
                            <th className="text-left text-lg font-bold text-white px-6 py-5 bg-zinc-800/95 rounded-tl-2xl border-b-2 border-zinc-700 w-56">
                                Features
                            </th>
                            {plans.map((plan, idx) => (
                                <th
                                    key={plan.title}
                                    className={`text-center align-top px-6 py-5 bg-zinc-800/95 border-b-2 border-zinc-700 ${plan.popular ? "bg-gradient-to-r from-green-400 to-blue-400 text-black" : "text-white"} ${idx === plans.length - 1 ? "rounded-tr-2xl" : ""}`}
                                >
                                    <div className="flex flex-col items-center justify-between min-h-[92px]">
                                        <span className="text-lg font-bold whitespace-nowrap">{plan.title}</span>
                                        <span className="text-xs font-normal text-gray-300 mb-2 truncate max-w-[140px] whitespace-nowrap">
                                            {plan.desc}
                                        </span>
                                        <Link className="cursor-pointer" href="/contact-us">
                                            <span
                                                className={`inline-block px-4 py-2 rounded-full font-semibold text-sm shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:ring-offset-2 whitespace-nowrap ${plan.popular ? "bg-green-600 text-white hover:bg-green-700" : "bg-zinc-700 text-white hover:bg-blue-600"}`}
                                            >
                                                Select Plan
                                            </span>
                                        </Link>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allFeatures.map((feature, i) => (
                            <tr key={feature} className={i % 2 === 0 ? "bg-zinc-900/80" : "bg-zinc-800/80"}>
                                <td className="text-gray-200 font-medium px-6 py-4 border-b border-zinc-800 w-56 sticky left-0 z-10 bg-inherit">
                                    {feature}
                                </td>
                                {plans.map((plan, j) => {
                                    const desc = getFeatureDescription(plan, feature);
                                    let prevHas = false;
                                    for (let k = 0; k < j; k++) {
                                        if (getFeatureDescription(plans[k], feature)) {
                                            prevHas = true;
                                            break;
                                        }
                                    }
                                    if (desc) {
                                        return (
                                            <td
                                                key={plan.title}
                                                className={`text-center px-6 py-4 border-b border-zinc-800 ${plan.popular ? "border-2 border-green-400" : "border border-zinc-800"} `}
                                            >
                                                <span className="text-gray-100 text-sm">{desc}</span>
                                            </td>
                                        );
                                    }
                                    if (prevHas) {
                                        return (
                                            <td
                                                key={plan.title}
                                                className={`text-center px-6 py-4 border-b border-zinc-800 ${plan.popular ? "border-2 border-green-400" : "border border-zinc-800"} `}
                                            >
                                                <span className="flex justify-center items-center text-green-400">
                                                    <Check className="inline w-5 h-5" />
                                                </span>
                                            </td>
                                        );
                                    }
                                    return (
                                        <td
                                            key={plan.title}
                                            className={`text-center px-6 py-4 border-b border-zinc-800 ${plan.popular ? "border-2 border-green-400" : "border border-zinc-800"} `}
                                        >
                                            <span className="flex justify-center items-center text-red-500">
                                                <X className="inline w-5 h-5" />
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        {/* Select Plan buttons at the bottom */}
                        <tr>
                            <td className="bg-zinc-800/95 border-t-2 border-zinc-700"></td>
                            {plans.map((plan) => (
                                <td key={plan.title + "-bottom-btn"} className="bg-zinc-800/95 border-t-2 border-zinc-700 text-center py-6">
                                    <Link className="cursor-pointer" href="/contact-us">
                                        <span
                                            className={`inline-block px-4 py-2 rounded-full font-semibold text-sm shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:ring-offset-2 whitespace-nowrap ${plan.popular ? "bg-green-600 text-white hover:bg-green-700" : "bg-zinc-700 text-white hover:bg-blue-600"}`}
                                        >
                                            Select Plan
                                        </span>
                                    </Link>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Cards for medium and smaller screens */}
            <div className="block lg:hidden relative z-10 max-w-2xl mx-auto space-y-10">
                {plans.map((plan) => {
                    // Only include features directly in this plan
                    const includedFeatures = plan.features.map((f) => f.feature);
                    return (
                        <div
                            key={plan.title}
                            className={`rounded-2xl shadow-2xl border-2 ${plan.popular ? "border-green-400" : "border-zinc-700"} bg-zinc-900/90 p-6 flex flex-col gap-4`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-2xl font-bold ${plan.popular ? "text-green-400" : "text-white"}`}>{plan.title}</span>
                                {plan.popular && (
                                    <span className="ml-2 px-3 whitespace-nowrap py-1 rounded-full bg-green-400 text-black text-xs font-bold">
                                        Most Popular
                                    </span>
                                )}
                            </div>
                            <div className="text-gray-300 text-sm mb-2">{plan.desc}</div>
                            <Link href="/contact-us" passHref legacyBehavior>
                                <span
                                    className={`inline-block px-4 py-2 rounded-full font-semibold text-sm shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:ring-offset-2 whitespace-nowrap ${plan.popular ? "bg-green-600 text-white hover:bg-green-700" : "bg-zinc-700 text-white hover:bg-blue-600"}`}
                                >
                                    Select Plan
                                </span>
                            </Link>
                            <div className="mt-4">
                                <ul className="space-y-3">
                                    {includedFeatures.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <span className="flex items-center text-green-400">
                                                <Check className="w-5 h-5 mr-1" />
                                            </span>
                                            <span className="text-gray-100 text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
