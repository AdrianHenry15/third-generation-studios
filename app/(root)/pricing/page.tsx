import AvailablePlans from "@/components/layout/pricing/available-plans";
import SplashIconRow from "@/components/layout/pricing/icon-promo/icon-row";
import { Metadata } from "next";
import PricingSplash from "@/components/layout/pricing/splash";

export const metadata: Metadata = {
    title: "Pricing | Third Generation Studios",
    description:
        "Transparent pricing for Studio Basic, Studio Plus, Studio Pro, and Studio Commerce plans.",
    keywords: [
        "pricing",
        "plans",
        "studio basic",
        "studio plus",
        "studio pro",
        "studio commerce",
        "web development pricing",
    ],
    openGraph: {
        url: "https://thirdgenerationstudios.com/pricing",
        type: "website",
        title: "Pricing | Third Generation Studios",
        description:
            "Compare plans and choose the right package for your website or product.",
        images: [
            {
                url: "https://thirdgenerationstudios.com/plans-splash.jpg",
                width: 1200,
                height: 630,
                alt: "Plans"
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing | Third Generation Studios",
        description:
            "Explore pricing for Studio plans tailored to your needs.",
        images: [
            {
                url: "https://thirdgenerationstudios.com/plans-splash.jpg",
                width: 1200,
                height: 630,
                alt: "Plans"
            }
        ],
    },
    alternates: {
        canonical: "https://thirdgenerationstudios.com/pricing",
    },
};

export default async function PricingPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Splash */}
            <PricingSplash />
            {/* Studio Commerce Features */}
            <SplashIconRow />
            {/* Available Plans */}
            {/* Studio Basic, Studio Plus, Studio Pro, Studio Commerce */}
            <AvailablePlans />
        </div>
    );
}
