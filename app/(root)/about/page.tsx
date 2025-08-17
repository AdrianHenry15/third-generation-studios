"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageCircle, Zap, Heart, Shield, Code2, Music, Globe } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
    const workPrinciples = [
        {
            icon: <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
            title: "Communicate Well",
            description: "Clear, transparent communication is the foundation of every successful project. We keep you in the loop at every step.",
        },
        {
            icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />,
            title: "Get Things Done",
            description: "We don't just talk the talk - we deliver results. Fast, efficient, and always on time.",
        },
        {
            icon: <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />,
            title: "Humour",
            description: "Work should be enjoyable! We bring creativity, fun, and positive energy to every project.",
        },
        {
            icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />,
            title: "Reliable",
            description: "You can count on us. We're committed to quality, consistency, and exceeding your expectations.",
        }
    ];

    const teamMembers = [
        {
            name: "Adrian Henry",
            role: "Founder & Creative Director",
            description: "A 28-year-old creator with a passion for both technology and music. Founded Third Generation Studios in 2020 during a time of uncertainty but boundless innovation.",
            expertise: ["Web Development", "Music Production", "Creative Direction"],
        },
        {
            name: "Md Sahil Khan",
            role: "Full Stack Developer",
            description: "A passionate developer from India who joined the team and revamped the entire site with cutting-edge technologies and modern design principles.",
            expertise: ["Full Stack Development", "Next.js", "React", "TypeScript"],
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-full px-3 py-2 sm:px-4 sm:py-2 mb-4 sm:mb-6"
                    >
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        <span className="text-xs sm:text-sm font-medium text-green-300">Our Story</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight px-2"
                    >
                        About <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Third Generation Studios</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6"
                    >
                        Founded in <span className="text-white font-semibold">2020</span>, we've evolved from a solo venture into a dynamic collective of creators, developers, and innovators. 
                        We're passionate about building <span className="text-white font-semibold">high-performance web experiences</span> and creating 
                        <span className="text-white font-semibold"> immersive soundtracks</span> that captivate audiences worldwide.
                    </motion.p>
                </section>

                {/* Team Section */}
                <section className="py-12 sm:py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12 sm:mb-16 px-4"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                            Meet Our <span className="gradient-text">Team</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            The brilliant minds behind every project and innovation.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 px-4">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group"
                            >
                                <div className="bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                                        <div className="bg-gray-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl self-start">
                                            {index === 0 ? <Music className="h-6 w-6 sm:h-8 sm:w-8 text-white" /> : <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />}
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-xl sm:text-2xl font-bold mb-2">{member.name}</h3>
                                            <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                                            <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">{member.description}</p>
                                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                                {member.expertise.map((skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs sm:text-sm text-gray-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How We Work Section */}
                <section className="py-12 sm:py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12 sm:mb-16 px-4"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                            How We Handle <span className="gradient-text">Work</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Our core principles that drive every project to success.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
                        {workPrinciples.map((principle, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{
                                    y: -5,
                                }}
                                className="group"
                            >
                                <div className="bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full transition-all duration-300">
                                    <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                                        {principle.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center">{principle.title}</h3>
                                    <p className="text-gray-400 text-center leading-relaxed text-sm sm:text-base">{principle.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Services Overview */}
                <section className="py-12 sm:py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12 sm:mb-16 px-4"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                            What We <span className="gradient-text">Create</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            From pixels to melodies, we craft experiences that matter.
                        </p>
                    </motion.div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl lg:max-w-4xl px-4">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="group"
                            >
                                <div className="bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300">
                                    <div className="bg-gray-800 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                                        <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 flex-shrink-0" />
                                        <h3 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Website Development</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                                        We create <span className="text-white font-semibold">high-performance</span> websites that are{" "}
                                        <span className="text-white font-semibold">fast, interactive, and unique</span>. Every pixel is crafted to
                                        blend <span className="text-white font-semibold">design, speed, and function</span>—built for the modern web.
                                    </p>
                                    <p className="text-gray-400 text-sm sm:text-base">
                                        Our team of developers works efficiently to reduce turnaround time while ensuring a level of polish that sets our work apart.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="py-12 sm:py-16 md:py-20 text-center px-4"
                >
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                            Let's Build Something <span className="gradient-text">Incredible</span>
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto">
                            Whether it's a <span className="text-white font-semibold">website</span> built for speed and interactivity, or an{" "}
                            <span className="text-white font-semibold">original soundtrack</span> that leaves an unforgettable impact, we're here
                            to bring your vision to life. Let's create something truly special together.
                        </p>
                        <Link href="/contact-us">
                            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300 w-full sm:w-auto">
                                Get in Touch
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutPage;
