import MusicPricing from "@/components/layout/pricing/music-pricing";
import WebsitePricing from "@/components/layout/pricing/website-pricing";

export default function PricingPage() {
    return (
        <section className="flex flex-col w-full justify-center h-full bg-black px-2 md:px-[15%] lg:px-2">
            {/*WEBSITE PRICING HEADER */}
            {/* <PricingHeader pricingType="Wesbite" /> */}
            {/* WEBSITE PRICING CARDS */}
            {/* <div className="flex flex-col lg:flex-row">
                <PricingCard
                    popular
                    title={"Website Basic"}
                    description={"For a simple online presence"}
                    price={"$189.00"}
                    features={BasicFeatures}
                />
                <PricingCard
                    title={"Website Standard"}
                    description={"For a more dynamic online presence"}
                    price={"$1,375.00"}
                    features={StandardFeatures}
                />
                <PricingCard
                    title={"Website Premium"}
                    description={"For a more sophisticated online presence"}
                    price={"$3,450.00"}
                    features={PremiumFeatures}
                />
            </div> */}
            {/* GET WEBSITE ESTIMATE BUTTON */}
            {/* <div className="w-full flex justify-center items-center my-10">
                <Link className="w-[90%] bg-red-600 rounded-full flex py-4 justify-center md:w-[50%] lg:w-[40%]" href={"/estimate"}>
                    <span className="text-white font-semibold">Get Website Free Estimate</span>
                </Link>
            </div> */}
            <WebsitePricing />
            <MusicPricing />
        </section>
    );
}
