// eslint-disable react/no-unescaped-entities
"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight, Code, Zap, Sparkles, Globe, Rocket } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    const codeAnimation: Variants = {
        hidden: { opacity: 1, scale: 0.9, rotateY: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    };

    return (
        <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <motion.div animate={floatingAnimation} className="absolute top-20 right-20 w-2 h-2 bg-green-400 rounded-full opacity-60" />
                <motion.div
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
                    className="absolute top-40 left-20 w-1 h-1 bg-blue-400 rounded-full opacity-40"
                />
                <motion.div
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
                    className="absolute bottom-40 right-40 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="w-full lg:w-1/2"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
                        >
                            <Sparkles className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-green-300">Next-Gen Development Studio</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white"
                        >
                            Build the Future with <br className="hidden sm:block" />
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                                    Third Generation Studios
                                </span>
                                <motion.div
                                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
                            We convert your digital vision into reality with <span className="text-green-400 font-semibold">MVP-ready</span>{" "}
                            custom solutions using cutting-edge technologies.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link href="/contact-us">
                                <Button className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-6 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 overflow-hidden">
                                    <span className="relative z-10 flex items-center">
                                        Let&apos;s Talk
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Button>
                            </Link>
                            <Link href="/websites">
                                <Button
                                    variant="outline"
                                    className="group border-2 border-green-500/50 text-green-400 hover:text-white hover:border-green-400 text-lg px-8 py-6 rounded-2xl font-semibold bg-transparent hover:bg-green-500/10 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <span className="flex items-center">
                                        See MVP Demo
                                        <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                <Rocket className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-300">MVP-ready in no time</span>
                            </div>
                            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                <Globe className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-300">Powered by the tech of tomorrow</span>
                            </div>
                            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                <Code className="w-4 h-4 text-indigo-400" />
                                <span className="text-indigo-300">We architect your innovation</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={codeAnimation}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="w-full lg:w-1/2 flex justify-center"
                    >
                        <div className="relative w-full max-w-lg">
                            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-60"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-slate-700/50">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg"></div>
                                        </div>
                                        <div className="text-sm text-slate-400 font-mono">ThirdGenerationStudios.tsx</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span>Live</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <pre className="text-sm text-slate-300 overflow-x-hidden leading-relaxed">
                                        <code className="font-mono">
                                            <span className="text-purple-400">import</span>{" "}
                                            <span className="text-blue-300">{"{ Future }"}</span>{" "}
                                            <span className="text-purple-400">from</span>{" "}
                                            <span className="text-green-300">'tech-of-tomorrow'</span>
                                            <span className="text-slate-500">;</span>
                                            {"\n"}
                                            <span className="text-purple-400">import</span>{" "}
                                            <span className="text-blue-300">{"{ Vision }"}</span>{" "}
                                            <span className="text-purple-400">from</span>{" "}
                                            <span className="text-green-300">'your-ideas'</span>
                                            <span className="text-slate-500">;</span>
                                            {"\n\n"}
                                            <span className="text-purple-400">const</span>{" "}
                                            <span className="text-blue-300">DigitalSolution</span> <span className="text-slate-400">=</span>{" "}
                                            <span className="text-slate-400">()</span> <span className="text-purple-400">=&gt;</span>{" "}
                                            <span className="text-slate-400">{"{"}</span>
                                            {"\n  "}
                                            <span className="text-purple-400">const</span> <span className="text-blue-300">mvp</span>{" "}
                                            <span className="text-slate-400">=</span> <span className="text-yellow-300">useInnovation</span>
                                            <span className="text-slate-400">(</span>
                                            <span className="text-blue-300">Vision</span>
                                            <span className="text-slate-400">);</span>
                                            {"\n\n  "}
                                            <span className="text-purple-400">return</span> <span className="text-slate-400">(</span>
                                            {"\n    "}
                                            <span className="text-slate-400">&lt;</span>
                                            <span className="text-red-400">Future</span>
                                            <span className="text-slate-400">&gt;</span>
                                            {"\n      "}
                                            <span className="text-slate-400">{"{"}</span>
                                            <span className="text-blue-300">mvp</span>
                                            <span className="text-slate-400">.</span>
                                            <span className="text-yellow-300">map</span>
                                            <span className="text-slate-400">(</span>
                                            <span className="text-blue-300">feature</span> <span className="text-purple-400">=&gt;</span>{" "}
                                            <span className="text-slate-400">(</span>
                                            {"\n        "}
                                            <span className="text-slate-400">&lt;</span>
                                            <span className="text-red-400">Feature</span>
                                            {"\n          "}
                                            <span className="text-green-300">key</span>
                                            <span className="text-slate-400">=</span>
                                            <span className="text-slate-400">{"{"}</span>
                                            <span className="text-blue-300">feature</span>
                                            <span className="text-slate-400">.</span>
                                            <span className="text-blue-300">id</span>
                                            <span className="text-slate-400">{"}"}</span>
                                            {"\n          "}
                                            <span className="text-green-300">data</span>
                                            <span className="text-slate-400">=</span>
                                            <span className="text-slate-400">{"{"}</span>
                                            <span className="text-blue-300">feature</span>
                                            <span className="text-slate-400">{"}"}</span>
                                            {"\n          "}
                                            <span className="text-green-300">deployTime</span>
                                            <span className="text-slate-400">=</span>
                                            <span className="text-green-300">"record-breaking"</span>
                                            {"\n        "}
                                            <span className="text-slate-400">/&gt;</span>
                                            {"\n      "}
                                            <span className="text-slate-400">))</span>
                                            <span className="text-slate-400">{"}"}</span>
                                            {"\n    "}
                                            <span className="text-slate-400">&lt;/</span>
                                            <span className="text-red-400">Future</span>
                                            <span className="text-slate-400">&gt;</span>
                                            {"\n  "}
                                            <span className="text-slate-400">);</span>
                                            {"\n"}
                                            <span className="text-slate-400">{"};"}</span>
                                            {"\n\n"}
                                            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                            <span className="text-slate-500">// You dream it. We deploy it.</span>
                                            {"\n"}
                                            <span className="text-purple-400">export default</span>{" "}
                                            <span className="text-blue-300">DigitalSolution</span>
                                            <span className="text-slate-500">;</span>
                                        </code>
                                    </pre>
                                </div>

                                <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/30">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center text-slate-400">
                                            <Code className="h-4 w-4 mr-2 text-green-400" />
                                            <span>Powered by Third Generation Studios</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                            <span>Ready to deploy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <style jsx>{`
                @keyframes gradient-x {
                    0%,
                    100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }
                .animate-gradient-x {
                    animation: gradient-x 3s ease infinite;
                }
            `}</style>
        </section>
    );
}
