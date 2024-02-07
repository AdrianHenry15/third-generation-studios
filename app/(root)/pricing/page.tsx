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
        <section className="flex flex-col w-full justify-center h-full bg-black px-2 md:px-[20%] lg:px-2">
            {/* PRICING HEADER */}
            <div className="flex flex-col py-24 px-4 text-center">
                <h5 className="text-red-600 font-semibold text-sm">Website Pricing</h5>
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
                    price={"189.00 to $1,499.00"}
                    features={BasicFeatures}
                />
                <PricingCard
                    title={"Standard"}
                    description={"For a more dynamic online presence"}
                    price={"1,499.00 to $4,999"}
                    features={StandardFeatures}
                />
                <PricingCard
                    title={"Premium"}
                    description={"For a more sophisticated online presence"}
                    price={"+4999"}
                    features={PremiumFeatures}
                />
            </div>
            {/* GET ESTIMATE BUTTON */}
            <div className="w-full flex justify-center items-center my-10">
                <Link className="w-[90%] bg-red-600 rounded-full flex py-4 justify-center md:w-[50%] lg:w-[40%]" href={"/estimate"}>
                    <span className="text-white font-semibold">Get Free Estimate</span>
                </Link>
            </div>
        </section>
    );
}
