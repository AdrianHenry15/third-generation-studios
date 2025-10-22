"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
                        Where <span className="text-white font-bold">Technology</span> meets{" "}
                        <span className="text-green-400 font-bold">Music</span> and{" "}
                        <span className="text-blue-400 font-bold">Creativity</span>.
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
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Our Story
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Founded by <span className="text-white font-semibold">Adrian Henry</span> in{" "}
                            <span className="text-green-300 font-semibold">2020</span>, Third Generation Studios is a collective of
                            passionate creators, developers, and composers. We blend cutting-edge{" "}
                            <span className="text-blue-300 font-semibold">web technology</span> with{" "}
                            <span className="text-green-300 font-semibold">immersive music</span> to deliver unforgettable digital
                            experiences for film, TV, games, and the modern web.
                        </p>
                        <p className="text-gray-400 mt-4">
                            Our team thrives on collaboration, innovation, and a relentless pursuit of excellence. Every project is a canvas
                            for creativity, technical mastery, and storytelling.
                        </p>
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
                                We build <span className="text-white font-semibold">high-performance</span>, visually stunning websites that
                                are <span className="text-green-300 font-semibold">fast</span>,{" "}
                                <span className="text-blue-300 font-semibold">interactive</span>, and{" "}
                                <span className="text-white font-semibold">unique</span>. Our agile team ensures rapid delivery and
                                pixel-perfect quality for every client.
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
                                Music Production
                            </h3>
                            <p className="text-gray-400">
                                From <span className="text-white font-semibold">cinematic scores</span> to{" "}
                                <span className="text-green-300 font-semibold">game-changing soundtracks</span>, we craft original
                                compositions that <span className="text-blue-300 font-semibold">amplify emotion</span> and{" "}
                                <span className="text-white font-semibold">elevate stories</span> across all media.
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
                        Let’s Build Something Incredible
                    </h3>
                    <p className="text-gray-200 text-lg mb-8">
                        Whether you need a <span className="text-white font-semibold">website</span> that stands out or an{" "}
                        <span className="text-green-200 font-semibold">original soundtrack</span> that moves your audience, we’re ready to
                        bring your vision to life.
                    </p>
                    <Link href="/contact-us">
                        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 shadow-lg transition-all duration-200 hover:scale-105">
                            Get in Touch
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPage;
