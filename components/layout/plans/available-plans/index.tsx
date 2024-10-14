import React from "react";
import Plan from "./plan";

const AvailablePlans = () => {
    return (
        <section>
            {/* Title */}
            <h5 className="flex items-center justify-center w-full font-semibold text-6xl py-10">Available Plans</h5>
            {/* Plans */}
            <div className="flex flex-col md:flex-row">
                <Plan description="Everything you need to get started" title="Studio Basic" mostPopular={false} />
                <Plan description="Extra features including Email Services" title="Studio Plus" mostPopular={false} />
                <Plan description="Powerful extra features including User Authentication services" title="Studio Pro" mostPopular={false} />
                <Plan
                    description="A full ecommerce website utilizing the power of Square payment processing"
                    title="Studio Commerce"
                    mostPopular={true}
                />
            </div>
        </section>
    );
};

export default AvailablePlans;
