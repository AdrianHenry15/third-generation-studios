"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Search, Heart, PlayCircle, Settings, User, Music, Upload } from "lucide-react";
import SidebarSection from "./sidebar-section";
import PlaylistSidebarSection from "./playlist-sidebar-section";

const mainItems = [
    { icon: Home, label: "Home", href: "/solo-queue" },
    { icon: Search, label: "Search", href: "/solo-queue/search" },
];

const libraryItems = [
    { icon: Heart, label: "Liked Songs", href: "/solo-queue/liked" },
    { icon: PlayCircle, label: "Playlists", href: "/solo-queue/playlists" },
];

const artistItems = [
    { icon: Music, label: "My Tracks", href: "/solo-queue/studio/my-tracks" },
    { icon: Upload, label: "Upload Track", href: "/solo-queue/studio/upload" },
];

const userItems = [{ icon: User, label: "Profile", href: "/solo-queue/profile" }];

interface ISidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }: ISidebarProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
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
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                <SidebarSection
                    section={{ title: "", items: mainItems }}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />
                <SidebarSection
                    section={{ title: "Your Library", items: libraryItems }}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />
                <SidebarSection
                    section={{ title: "Artist", items: artistItems }}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />
                {/* Replace static playlists with dynamic playlist section */}
                <PlaylistSidebarSection isCollapsed={isCollapsed} isMobile={isMobile} onMobileClose={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* Bottom Section */}
            <div className="p-2 border-t border-neutral-800 mt-auto">
                <SidebarSection
                    section={{ title: "", items: userItems }}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-700 text-white hover:bg-neutral-800 active:bg-neutral-700 transition-colors shadow-lg"
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <motion.aside
                animate={{ width: isCollapsed ? 72 : 280 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="hidden md:block fixed left-0 top-0 h-screen bg-neutral-900 border-r border-neutral-800 z-40"
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Sidebar */}
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
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
