"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Clients = [
    { name: "Eckert Golf", url: "https://eckertgolf.com" },
    { name: "Brite", url: "https://brite.com" },
    { name: "Molly's Specialty Sweets", url: "https://mollyspecialtysweets.com" },
    { name: "Intentional Living", url: "https://intentionalliving.health" },
];

export default function LogoStrip() {
    const router = useRouter();

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const clients = ["Eckert Golf", "Brite", "Molly's Specialty Sweets", "Intentional Living"];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1], // custom cubic bezier for smoother motion
            },
        },
    };

    return (
        <section className="py-24 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-md relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-xl font-light tracking-wider text-blue-300/80 mb-12 uppercase"
                >
                    Trusted by innovative clients
                </motion.h3>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-wrap justify-center gap-10 md:gap-20 max-w-6xl mx-auto"
                >
                    {Clients.map((client, index) => (
                        <Link target="_blank" href={client.url} key={index}>
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileFocus={{ scale: 0.95 }}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    filter: "brightness(1.3)",
                                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                                    transition: { duration: 0.3, ease: "easeOut" },
                                }}
                                className="flex items-center justify-center h-20 w-48 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 shadow-lg hover:border-blue-500/50"
                            >
                                <div className="flex items-center justify-center">
                                    <span className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 text-center">
                                        {client.name}
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
