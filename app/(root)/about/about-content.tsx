"use client";

import { Button } from "@/components/ui/buttons/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-950 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-6 pt-24 pb-16 text-center">
                <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                        Third Generation Studios
                    </h1>
                    <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        Web design and digital marketing for service businesses.
                    </p>
                </motion.div>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-96 h-96 bg-gradient-radial from-green-500/20 to-transparent rounded-full blur-3xl absolute -top-32 left-1/2 -translate-x-1/2" />
                    <div className="w-80 h-80 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl absolute top-40 right-1/2 translate-x-1/3" />
                </div>
            </section>

            {/* About Section */}
            <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="bg-zinc-900/80 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center md:items-start"
                >
                    <div className="min-w-0 flex-1 text-center md:text-left">
                        <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">Our Story</h2>

                        <figure className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:text-left">
                            <div className="size-28 shrink-0 overflow-hidden rounded-2xl border border-white/10">
                                <Image
                                    src="/adrian-henry.webp"
                                    alt=""
                                    width={112}
                                    height={112}
                                    className="size-28 shrink-0 rounded-2xl border border-white/10 object-cover"
                                />
                            </div>

                            <figcaption>
                                <p className="text-xl font-semibold text-white">Adrian Henry</p>
                                <p className="mt-1 text-sm text-gray-400">Founder &amp; Web Developer</p>
                            </figcaption>
                        </figure>

                        <p className="text-lg leading-relaxed text-gray-300">
                            I founded Third Generation Studios in 2020. I build and maintain websites for service businesses, with a focus
                            on making it easy for customers to find what they need and get in touch.
                        </p>

                        <p className="mt-4 leading-relaxed text-gray-300">
                            You’ll work directly with me from the first conversation through launch. We’ll agree on what the site needs to
                            do, how we’ll handle feedback, and what support makes sense after it goes live.
                        </p>

                        <Link
                            href="/websites/eckert-golf"
                            className="mt-5 inline-block font-semibold text-green-300 underline-offset-4 hover:underline"
                        >
                            See the Eckert Golf website refresh
                        </Link>
                    </div>
                    <div className="flex-1 flex flex-col gap-8 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-700"
                        >
                            <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-2">
                                Website Development
                            </h3>
                            <p className="text-gray-400">
                                We design and rebuild sites around the way customers browse your services, products, and contact options.
                                Each project starts with what the site needs to help people do.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-700"
                        >
                            <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-2">
                                SEO & Website Care
                            </h3>
                            <p className="text-gray-400">
                                We set up search visibility and inquiry tracking, then help with content updates and maintenance after
                                launch.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Call to Action */}
            <section className="relative z-20 flex flex-col items-center justify-center py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-r from-green-600/80 via-blue-700/80 to-zinc-900/90 rounded-2xl shadow-xl p-10 md:p-16 text-center max-w-2xl w-full"
                >
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent mb-4">
                        Tell us about your website
                    </h3>
                    <p className="text-gray-200 text-lg mb-8">
                        Share what you want to improve, and we’ll help you identify a practical starting point.
                    </p>
                    <Link href="/contact-us">
                        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 shadow-lg transition-all duration-200 hover:scale-105">
                            Request a Website Review
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPage;
