"use client";

import { motion } from "framer-motion";
import CodeIntegrationCard from "../cards/code-integration-card";
import NextLogo from "@/public/logos/next-js-logo-2.png";
import VercelLogo from "@/public/logos/vercel-text.png";
import ReactLogo from "@/public/logos/react-logo.png";
import React from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
};

const fadeInFromBottom = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInFromLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInFromRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CodeIntegrationSection = () => {
    return (
        <motion.section
            className="relative z-10 flex flex-col items-center text-center p-12 space-y-8 bg-gradient-to-b from-black via-black to-gray-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Parallax Title Effect */}
            <motion.h2
                className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Why Choose Us?
            </motion.h2>

            {/* Subtitle */}
            <motion.p className="text-md max-w-3xl text-zinc-400 leading-relaxed" variants={fadeInFromBottom}>
                We blend creativity with technology.
            </motion.p>

            {/* Integration Cards */}
            <motion.div className="flex flex-wrap justify-center gap-6 max-w-4xl" variants={containerVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <motion.div variants={fadeInFromLeft}>
                        <CodeIntegrationCard
                            link="https://nextjs.org/"
                            image={NextLogo}
                            title="Powered by Next.js"
                            description="Our website is built on the robust Next.js framework, leveraging its powerful features for a seamless and dynamic user experience."
                        />
                    </motion.div>

                    <motion.div variants={fadeInFromRight}>
                        <CodeIntegrationCard
                            link="https://vercel.com/"
                            image={VercelLogo}
                            title="Powered by Vercel"
                            description="Our website is hosted on Vercel, enabling fast and scalable deployments with excellent performance and reliability."
                        />
                    </motion.div>

                    <motion.div variants={fadeInFromBottom}>
                        <CodeIntegrationCard
                            link="https://react.dev/"
                            image={ReactLogo}
                            title="Built with React"
                            description="React is a powerful JavaScript library for building user interfaces, allowing us to create dynamic and responsive web applications with ease."
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default CodeIntegrationSection;
