"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-90 pointer-events-none"></div>

            {/* Header Section */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-extrabold text-center relative z-10"
            >
                Third Generation Studios
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg text-gray-300 text-center max-w-3xl leading-relaxed mt-6 relative z-10"
            >
                Founded by <span className="text-gray-100 font-semibold">Adrian Henry</span>, a 28-year-old creator with a passion for both
                technology and music, Third Generation Studios was born in
                <span className="text-gray-100 font-semibold"> 2020</span>, during a time of uncertainty but boundless innovation. What
                started as a solo venture quickly evolved into a collective, bringing together a talented team of web developers, designers,
                and composers—all working in sync to create{" "}
                <span className="text-gray-100 font-semibold">high-performance web experiences</span> and
                <span className="text-gray-100 font-semibold"> immersive soundtracks</span> for film, TV, and games.
            </motion.p>

            {/* Sections Container */}
            <div className="mt-32 max-w-6xl w-full px-4 space-y-36 relative z-10">
                {/* Web Development Section */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative flex flex-col md:flex-row items-center gap-12"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900 opacity-50 rounded-xl blur-3xl"></div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                            Website Development
                        </h2>
                        <p className="text-gray-400 leading-relaxed mt-4">
                            With a dedicated team of developers, we create{" "}
                            <span className="text-gray-100 font-semibold">high-performance</span> websites that are{" "}
                            <span className="text-gray-100 font-semibold"> fast, interactive, and unique</span>. Every pixel is crafted to
                            blend <span className="text-gray-100 font-semibold">design, speed, and function</span>—built for the modern web.
                            Having multiple developers on board allows us to work efficiently, reducing turnaround time while ensuring a
                            level of polish that sets our work apart.
                        </p>
                    </div>
                </motion.div>

                {/* Music Production Section */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative flex flex-col md:flex-row-reverse items-center gap-12"
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-900 opacity-50 rounded-xl blur-3xl"></div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                            Music Production
                        </h2>
                        <p className="text-gray-400 leading-relaxed mt-4">
                            Music is at the heart of everything we do. Whether it's{" "}
                            <span className="text-gray-100 font-semibold">cinematic scores</span> that captivate an audience,{" "}
                            <span className="text-gray-100 font-semibold">game-changing soundtracks</span> that set the tone, or original
                            compositions for film and TV, we craft immersive experiences that{" "}
                            <span className="text-gray-100 font-semibold">amplify emotion</span> and{" "}
                            <span className="text-gray-100 font-semibold">elevate stories</span>.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-32 text-center relative z-10"
            >
                <h3 className="text-3xl font-semibold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                    Let’s Build Something Incredible
                </h3>
                <p className="text-gray-400 mt-3">
                    Whether it's a <span className="text-gray-100 font-semibold">website</span> built for speed and interactivity, or an{" "}
                    <span className="text-gray-100 font-semibold">original soundtrack</span> that leaves an unforgettable impact, we’re here
                    to bring your vision to life. Let's create something truly special together.
                </p>
                <Link
                    href="/contact-us"
                    className="mt-6 inline-block bg-white text-black px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-300 transition"
                >
                    Get in Touch
                </Link>
            </motion.div>
        </div>
    );
};

export default AboutPage;
