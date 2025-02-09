"use client";

import { motion } from "framer-motion";
import HeroSection from "./components/hero-section";
import IntegrationSection from "./components/integration-section";
import SectionCardContainer from "./components/integration-section/integration-section-card";

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
                    <IntegrationSection />
                    {/* SECURITY */}
                    {/* STYLING */}
                </motion.div>
            </section>
        </div>
    );
}
