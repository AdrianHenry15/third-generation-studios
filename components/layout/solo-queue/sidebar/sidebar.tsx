"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Search, Heart, PlayCircle, Users, Settings, User, Clock, Star, Music, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const mainItems: SidebarItem[] = [
    { icon: Home, label: "Home", href: "/solo-queue" },
    { icon: Search, label: "Search", href: "/solo-queue/search" },
];

const libraryItems: SidebarItem[] = [
    { icon: Clock, label: "Recently Played", href: "/solo-queue/recent" },
    { icon: Heart, label: "Liked Songs", href: "/solo-queue/liked" },
    { icon: Star, label: "Favorites", href: "/solo-queue/favorites" },
    { icon: PlayCircle, label: "Playlists", href: "/solo-queue/playlists" },
];

const userItems: SidebarItem[] = [
    { icon: User, label: "Profile", href: "/solo-queue/profile" },
    { icon: Settings, label: "Settings", href: "/solo-queue/settings" },
];

const artistItems: SidebarItem[] = [
    { icon: Music, label: "My Tracks", href: "/solo-queue/studio/my-tracks" },
    { icon: Upload, label: "Upload Track", href: "/solo-queue/studio/upload" },
];

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                    {(!isCollapsed || isMobile) && (
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-lg sm:text-xl font-bold text-white"
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
                    <ul className="space-y-1">
                        {mainItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-2 rounded-lg transition-all duration-200 group touch-manipulation ${
                                            isActive
                                                ? "bg-green-600 text-white"
                                                : "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700"
                                        }`}
                                    >
                                        <item.icon size={isMobile ? 22 : 20} className="flex-shrink-0" />
                                        {(!isCollapsed || isMobile) && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="font-medium text-sm sm:text-base"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Library Section */}
                <div className="p-2 mt-4">
                    <div className="flex items-center justify-between px-3 py-2 mb-2">
                        {(!isCollapsed || isMobile) && (
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider"
                            >
                                Your Library
                            </motion.h2>
                        )}
                    </div>
                    <ul className="space-y-1">
                        {libraryItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 sm:py-2 rounded-lg transition-all duration-200 touch-manipulation ${
                                            isActive
                                                ? "bg-green-600 text-white"
                                                : "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700"
                                        }`}
                                    >
                                        <item.icon size={isMobile ? 20 : 18} className="flex-shrink-0" />
                                        {(!isCollapsed || isMobile) && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* Artist Section */}
                <div className="p-2 mt-4">
                    <div className="flex items-center justify-between px-3 py-2 mb-2">
                        {(!isCollapsed || isMobile) && (
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider"
                            >
                                Artist
                            </motion.h2>
                        )}
                    </div>
                    <ul className="space-y-1">
                        {artistItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 sm:py-2 rounded-lg transition-all duration-200 touch-manipulation ${
                                            isActive
                                                ? "bg-green-600 text-white"
                                                : "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700"
                                        }`}
                                    >
                                        <item.icon size={isMobile ? 20 : 18} className="flex-shrink-0" />
                                        {(!isCollapsed || isMobile) && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-2 border-t border-neutral-800 mt-auto">
                <ul className="space-y-1">
                    {userItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2 sm:py-2 rounded-lg transition-all duration-200 touch-manipulation ${
                                        isActive
                                            ? "bg-green-600 text-white"
                                            : "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700"
                                    }`}
                                >
                                    <item.icon size={isMobile ? 20 : 18} className="flex-shrink-0" />
                                    {(!isCollapsed || isMobile) && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-sm"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
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
                    className="p-3 rounded-xl bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 text-white hover:bg-neutral-800 active:bg-neutral-700 transition-colors shadow-lg touch-manipulation"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="md:hidden fixed left-0 top-0 h-screen w-80 max-w-[85vw] bg-neutral-900 border-r border-neutral-800 z-50 shadow-2xl"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
