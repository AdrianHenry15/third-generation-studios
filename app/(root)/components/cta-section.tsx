"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="glass p-8 md:p-16 rounded-xl border border-green-500/30 max-w-5xl mx-auto text-center"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Let&apos;s Launch the Future <span className="gradient-text">Together</span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Ready to transform your digital vision into reality? Our team of experts is ready to help you build the next
                        generation of technology.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <Link href="/consultancy">
                            <Button className="bg-green-600 hover:bg-green-700 hover:glow text-lg px-8 py-6">
                                Let&apos;s Talk
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/websites">
                            <Button
                                variant="outline"
                                className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400 text-lg px-8 py-6"
                            >
                                View Our Work
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
                        <span className="text-gray-400">
                            <span className="text-green-400 font-semibold">You dream it.</span> We deploy it.
                        </span>
                        <span className="text-gray-400">
                            <span className="text-purple-400 font-semibold">MVP-ready</span> in no time.
                        </span>
                        <span className="text-gray-400">
                            <span className="text-indigo-400 font-semibold">Powered</span> by the tech of tomorrow.
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
