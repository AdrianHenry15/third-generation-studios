"use client";

import { motion } from "framer-motion";
import HeroSection from "./components/hero-section";
import SectionCard from "./components/section-card";
import NextLogo from "@/public/logos/next-js-logo-2.png";
import TailwindCSSLogo from "@/public/logos/tailwind-logo.webp";
import StripeLogo from "@/public/logos/stripe-logo.webp";
import ClerkLogo from "@/public/logos/clerk-logo.webp";
import AnimatedSectionCard from "./components/animated-section-card";

export default function Home() {
    return (
        <div className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50"
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
            </div>

            {/* Hero Section */}
            <HeroSection />
            {/* Section */}
            <section className="relative z-10 flex flex-col items-center text-center p-12 space-y-8 bg-black">
                <motion.h2
                    className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Why Choose Us?
                </motion.h2>

                <motion.p
                    className="text-md max-w-3xl text-zinc-400 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    We blend creativity with technology.
                </motion.p>
                <motion.div
                    className="flex flex-wrap justify-center gap-6 max-w-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    {/* SECTIONS */}
                    {/* STRUCTURE/INTEGRATION/DELIVERY  */}
                    {/* SECURITY */}
                    {/* STYLING */}

                    <SectionCard
                        link="https://nextjs.org/"
                        image={NextLogo}
                        title="Powered by Next.js"
                        description="Our website is built on the robust Next.js framework, leveraging its powerful features for a seamless and dynamic user experience."
                    />

                    <AnimatedSectionCard
                        animatedBg
                        link="https://v3.tailwindcss.com/"
                        image={TailwindCSSLogo}
                        title="Styled with Tailwind CSS v3"
                        description="Built using Tailwind CSS, a utility-first framework that empowers rapid, responsive design with limitless customization options."
                    />
                    <SectionCard
                        link="https://stripe.com/"
                        image={StripeLogo}
                        title="Seamless Payments with Stripe"
                        description="Experience secure and efficient transactions with Stripe, ensuring fast, reliable, and hassle-free payment processing for every purchase."
                    />
                    <AnimatedSectionCard
                        animatedBg
                        link="https://clerk.com/"
                        image={ClerkLogo}
                        title="Effortless User Authentication with Clerk"
                        description="Secure, scalable, and seamless—Clerk simplifies user authentication with powerful features like social logins, multi-factor authentication, and session management."
                    />
                </motion.div>
            </section>
        </div>
    );
}
