"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const { scrollY } = useScroll();
    const backgroundColor = useTransform(scrollY, [0, 60], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const navItems = [
        { name: "Showcase", href: "/websites" },
        { name: "Pricing", href: "/pricing" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
    ];

    return (
        <motion.header
            style={{ backgroundColor }}
            className={`fixed left-1/2 -translate-x-1/2 top-2 w-[95%] max-w-5xl glass rounded-2xl z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "py-4"}`}
        >
            <div className="w-full px-4 sm:px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                >
                    <Link href="/">
                        <div className="flex items-center">
                            <Image src="/logos/tgs-logo.png" alt="Logo" width={40} height={40} className="mr-2" />
                        </div>
                    </Link>
                </motion.div>

                <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                    {navItems.map((item, index) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-gray-300 hover:text-green-600 hover:glow-text transition-all"
                        >
                            {item.name}
                        </motion.a>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Link href="/contact-us">
                            <Button className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:from-green-500 hover:to-green-700 transition-all duration-300">
                                Get in Touch
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden glass w-full rounded-b-2xl"
                >
                    <div className="px-4 py-4 flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                            <Button className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:from-green-500 hover:to-green-700 transition-all duration-300">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
