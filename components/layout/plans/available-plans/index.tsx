import React from "react";
import Container from "./container";

const AvailablePlans = () => {
    return (
        <section>
            {/* Title */}
            <h5 className="flex items-center justify-center w-full font-semibold text-6xl py-10">Available Plans</h5>
            {/* Plans */}
            <Container
                description="A website development using Next.js and Vercel for fast, efficient website building and seamless deployment."
                title="Studio Basic"
                mostPopular={false}
            ></Container>
        </section>
    );
};

export default AvailablePlans;
