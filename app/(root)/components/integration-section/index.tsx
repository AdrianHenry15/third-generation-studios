import React from "react";
import IntegrationSectionCard from "./integration-section-card";
import NextLogo from "@/public/logos/next-js-logo-2.png";
import VercelLogo from "@/public/logos/vercel-text.png";

const IntegrationSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <IntegrationSectionCard
                link="https://nextjs.org/"
                image={NextLogo}
                title="Powered by Next.js"
                description="Our website is built on the robust Next.js framework, leveraging its powerful features for a seamless and dynamic user experience."
            />
            <IntegrationSectionCard
                link="https://vercel.com/"
                image={VercelLogo}
                title="Powered by Vercel"
                description="Our website is hosted on Vercel, enabling fast and scalable deployments with excellent performance and reliability."
            />
        </div>
    );
};

export default IntegrationSection;
