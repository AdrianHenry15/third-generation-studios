"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Code2, Cpu, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const features = [
        {
            icon: <Rocket className="h-10 w-10 text-blue-500" />,
            title: "Website Design & Redesign",
            description:
                "Launch a site that makes your services clear and gives customers a direct way to inquire.",
        },
        {
            icon: <Code2 className="h-10 w-10 text-purple-500" />,
            title: "SEO & Lead Tracking",
            description:
                "Set up search visibility and measure which pages generate inquiries.",
        },
        {
            icon: <Cpu className="h-10 w-10 text-indigo-500" />,
            title: "Website Care",
            description:
                "Keep content current and get help when your site needs an update.",
        },
        {
            icon: <Users className="h-10 w-10 text-cyan-500" />,
            title: "Custom Development",
            description:
                "Build custom features and integrations around the way your business works.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    return (
        <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Website & Marketing <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Design, launch, and maintain your website with one studio.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                            }}
                            className="h-full rounded-xl"
                        >
                            <Card className="h-full bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                                <CardHeader>
                                    <div className="mb-4">{feature.icon}</div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-400 text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
