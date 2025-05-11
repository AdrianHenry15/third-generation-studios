"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <footer className="bg-gray-950 border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold gradient-text mb-4">Third Generation Studios</h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            We convert your digital vision into reality with MVP-ready custom solutions using cutting-edge technologies.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                target="_blank"
                                href="https://github.com/AdrianHenry15"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                <FaGithub className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                target="_blank"
                                href="https://www.instagram.com/ahenry.anjiniso/"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                <FaInstagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                target="_blank"
                                href="https://www.linkedin.com/in/adrian-henry-199595207/"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                <FaLinkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#features" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Showcase
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Mail className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                                <Link
                                    href="mailto:ahenry@thirdgenerationstudios.com"
                                    className="text-gray-400 hover:text-green-400 transition-colors"
                                >
                                    ahenry@thirdgenerationstudios.com
                                </Link>
                            </li>
                            <li className="flex items-start">
                                <Phone className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                                <span className="text-gray-400">+1 (321) 370-0836</span>
                            </li>
                            {/* <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                <span className="text-gray-400">123 Innovation Way, Tech City, TC 12345</span>
              </li> */}
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm"
                >
                    <p>© {new Date().getFullYear()} Third Generation Studios. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
}
