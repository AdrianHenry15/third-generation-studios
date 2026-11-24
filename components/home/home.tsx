"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import WhyChooseUs from "./why-choose-us";
import FaqSection from "./faq-section";
import CtaSection from "./cta-section";
import ProductCards from "@/features/marketing/product-cards";
import ClientSection from "./client-section";

// Main Home Page Component
export default function Home() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    return (
        <main ref={ref} className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
            <motion.div style={{ opacity, scale }}>
                <HeroSection />
            </motion.div>

            <ClientSection />
            <FeaturesSection />
            <WhyChooseUs />
            <section id="products" className="container mx-auto px-4 py-20">
                <h2 className="gradient-text mb-8 text-center text-3xl font-bold">Products from TGS</h2>
                <ProductCards />
            </section>
            <FaqSection />
            <CtaSection />
        </main>
    );
}
