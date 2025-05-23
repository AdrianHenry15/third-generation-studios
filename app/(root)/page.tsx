"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "@/components/hero-section";
import LogoStrip from "@/components/logo-strip";
import FeaturesSection from "@/components/features-section";
import WhyChooseUs from "@/components/why-choose-us";
import FaqSection from "@/components/faq-section";
import CtaSection from "@/components/cta-section";
import Testimonials from "@/components/Testimonials";

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

            <LogoStrip />
            <FeaturesSection />
            <WhyChooseUs />
            <Testimonials />
            <FaqSection />
            <CtaSection />
        </main>
    );
}
