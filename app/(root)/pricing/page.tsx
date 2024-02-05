import PricingCard from "@/components/pricing-card";
import Link from "next/link";

const BasicFeatures = [
    "Up to 5 static pages (e.g. Home, About Us, Services, Contact)",
    "Basic contact form",
    "Mobie responsiveness",
    "Integration with a standard CMS (e.g., Shopify)",
    "Stock images or basic graphics",
];

const StandardFeatures = [
    "Up to 10 pages, including a blog/news section",
    "Custom design with basic branding elements",
    "Contact form with advanced fields",
    "Integration of social media links",
    "Responsive design for mobile and tablet devices",
    "Basic SEO setup",
    "Integration of third-party tools (e.g., Google Analytics)",
];

const PremiumFeatures = [
    "Custom design with a unique and professional look",
    "Unlimited pages and advanced content structure",
    "E-commerce functionality with secure payment processing",
    "Advanced forms and interactive elements",
    "High-level SEO optimization",
    "Integration with CRM systems or other business tools",
    "Ongoing maintenance and support",
];

export default function PricingPage() {
    return (
        <section className="px-10 flex flex-col w-full justify-center h-full bg-black">
            {/* PRICING HEADER */}
            <div className="flex flex-col py-24 px-4 text-center">
                <h5 className="text-red-600 font-semibold text-sm">Pricing</h5>
                <h1 className="text-white text-4xl font-bold">
                    Get your <span className="text-red-600">free</span> estimate today!
                </h1>
                <p>Special features coming soon</p>
            </div>
            {/* PRICING CARDS */}
            <div className="flex flex-col lg:flex-row">
                <PricingCard
                    popular
                    title={"Basic"}
                    description={"For a simple online presence"}
                    price={"200 - 1500"}
                    features={BasicFeatures}
                />
                <PricingCard
                    title={"Standard"}
                    description={"For a more dynamic online presence"}
                    price={"1500 - 5000"}
                    features={StandardFeatures}
                />
                <PricingCard
                    title={"Premium"}
                    description={"For a more sophisticated and unique online presence"}
                    price={"+5000"}
                    features={PremiumFeatures}
                />
            </div>
            {/* GET ESTIMATE BUTTON */}
            <div className="w-full flex justify-center items-center my-10">
                <Link className="w-1/2 bg-red-600 rounded-full flex py-2 justify-center lg:w-1/3 xl:w-1/4" href={"/estimate"}>
                    <span className="text-white font-semibold">Get Free Estimate</span>
                </Link>
            </div>
        </section>
    );
}
