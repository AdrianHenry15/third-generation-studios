"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Search, Plus, Heart, PlayCircle, Users, Settings, User, TrendingUp, Clock, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const mainItems: SidebarItem[] = [
    { icon: Home, label: "Home", href: "/solo-q" },
    { icon: Search, label: "Search", href: "/solo-q/search" },
];

const libraryItems: SidebarItem[] = [
    { icon: Clock, label: "Recently Played", href: "/solo-q/recent" },
    { icon: Heart, label: "Liked Songs", href: "/solo-q/liked" },
    { icon: Star, label: "Favorites", href: "/solo-q/favorites" },
    { icon: PlayCircle, label: "Playlists", href: "/solo-q/playlists" },
];

const userItems: SidebarItem[] = [
    { icon: User, label: "Profile", href: "/solo-q/profile" },
    { icon: Users, label: "Friends", href: "/solo-q/friends" },
    { icon: Settings, label: "Settings", href: "/solo-q/settings" },
];

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
    const pathname = usePathname();

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                    {(!isCollapsed || window.innerWidth < 768) && (
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xl font-bold text-white"
                        >
                            Solo Queue
                        </motion.h1>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                {/* Main Items */}
                <nav className="p-2">
                    <ul className="space-y-2">
                        {mainItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                                            isActive ? "bg-green-600 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                        }`}
                                    >
                                        <item.icon size={20} className="flex-shrink-0" />
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`font-medium md:${isCollapsed ? "hidden" : "block"}`}
                                        >
                                            {item.label}
                                        </motion.span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Library Section */}
                <div className="p-2 mt-4">
                    <div className="flex items-center justify-between px-3 py-2">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`text-sm font-semibold text-neutral-400 uppercase tracking-wider md:${isCollapsed ? "hidden" : "block"}`}
                        >
                            Your Library
                        </motion.h2>
                        <button className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                            <Plus size={16} />
                        </button>
                    </div>
                    <ul className="space-y-1 mt-2">
                        {libraryItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                            isActive ? "bg-green-600 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                        }`}
                                    >
                                        <item.icon size={18} className="flex-shrink-0" />
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`text-sm md:${isCollapsed ? "hidden" : "block"}`}
                                        >
                                            {item.label}
                                        </motion.span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-2 border-t border-neutral-800">
                <ul className="space-y-1">
                    {userItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                        isActive ? "bg-green-600 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                    }`}
                                >
                                    <item.icon size={18} className="flex-shrink-0" />
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`text-sm md:${isCollapsed ? "hidden" : "block"}`}
                                    >
                                        {item.label}
                                    </motion.span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <motion.aside
                animate={{
                    width: isCollapsed ? 72 : 280,
                    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                }}
                className="hidden md:block fixed left-0 top-0 h-screen bg-neutral-900 border-r border-neutral-800 z-40"
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden fixed left-0 top-0 h-screen w-72 bg-neutral-900 border-r border-neutral-800 z-50"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
