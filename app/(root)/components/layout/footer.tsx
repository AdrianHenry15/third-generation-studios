"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
    const pathname = usePathname();
    const QuickLinks = [
        { name: "Home", href: "/" },
        { name: "Websites", href: "/websites" },
        { name: "Music", href: "/music" },
        { name: "Pricing", href: "/pricing" },
        { name: "Blog", href: "/blog" },
        { name: "About Us", href: "/about" },
    ];

    const Socials = [
        { name: "GitHub", href: "https://github.com/third-generation-studios" },
        { name: "Instagram", href: "https://www.instagram.com/websitesblow/" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/adrian-henry-199595207/" },
        { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61555913473339" },
    ];
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

    if (pathname.startsWith("/solo-queue")) {
        return null; // Don't render the footer on /solo-queue routes
    }

    return (
        <footer className="bg-gray-950 border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-4 gap-8"
                >
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold gradient-text mb-4">Third Generation Studios</h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            We convert your digital vision into reality with MVP-ready custom solutions using cutting-edge technologies.
                        </p>
                        {/* Socials */}
                        <div className="flex space-x-4">
                            {Socials.map((social) => (
                                <Link
                                    key={social.name}
                                    target="_blank"
                                    href={social.href}
                                    className="text-gray-400 hover:text-green-500 transition-colors flex"
                                >
                                    {social.name === "GitHub" && <FaGithub className="h-5 w-5" />}
                                    {social.name === "Instagram" && <FaInstagram className="h-5 w-5" />}
                                    {social.name === "LinkedIn" && <FaLinkedin className="h-5 w-5" />}
                                    {social.name === "Facebook" && <FaFacebook className="h-5 w-5" />}
                                    <span className="sr-only">{social.name}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="space-y-2">
                                {QuickLinks.slice(0, 3).map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-gray-400 hover:text-green-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-2">
                                {QuickLinks.slice(3, 6).map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-gray-400 hover:text-green-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
