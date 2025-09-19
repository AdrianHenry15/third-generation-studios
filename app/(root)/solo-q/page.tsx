"use client";

import { motion, Variants } from "framer-motion";
import { Play, Heart, MoreHorizontal } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const recentlyPlayed = [
    { id: 1, title: "Epic Gaming Mix", artist: "Various Artists", duration: "2:45:30", image: "/api/placeholder/80/80" },
    { id: 2, title: "Focus Beats", artist: "Lo-Fi Collective", duration: "1:23:45", image: "/api/placeholder/80/80" },
    { id: 3, title: "Synthwave Sessions", artist: "Neon Dreams", duration: "54:20", image: "/api/placeholder/80/80" },
];

export default function SoloQHomePage() {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Header */}
            <motion.header variants={itemVariants} className="space-y-2">
                <h1 className="text-4xl font-bold text-white">Welcome To Solo Q</h1>
                <p className="text-neutral-400 text-lg">Welcome back to Third Generation Studios' Solo Q</p>
            </motion.header>

            {/* Recently Played */}
            <motion.section variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Recently played</h2>
                    <button className="text-neutral-400 hover:text-white text-sm font-medium transition-colors">Show all</button>
                </div>
                <div className="space-y-2">
                    {recentlyPlayed.map((track, index) => (
                        <div
                            key={track.id}
                            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
                                <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                    <Play size={16} fill="white" className="text-white" />
                                </button>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{track.title}</p>
                                <p className="text-neutral-400 text-sm truncate">{track.artist}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-green-400">
                                    <Heart size={16} />
                                </button>
                                <span className="text-neutral-400 text-sm w-16 text-right">{track.duration}</span>
                                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Made for You */}
            <motion.section variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Made for you</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { name: "Daily Mix 1", description: "The Weeknd, Post Malone and more", image: "/api/placeholder/160/160" },
                        { name: "Daily Mix 2", description: "Drake, Travis Scott and more", image: "/api/placeholder/160/160" },
                        { name: "Discover Weekly", description: "Your weekly mixtape of fresh music", image: "/api/placeholder/160/160" },
                        {
                            name: "Release Radar",
                            description: "Catch all the latest music from artists you follow",
                            image: "/api/placeholder/160/160",
                        },
                        { name: "On Repeat", description: "Songs you can't get enough of", image: "/api/placeholder/160/160" },
                    ].map((playlist, index) => (
                        <div
                            key={index}
                            className="group bg-neutral-800/20 hover:bg-neutral-700/30 rounded-lg p-4 transition-all duration-200 cursor-pointer"
                        >
                            <div className="relative mb-4">
                                <div className="w-full aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
                                <button className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
                                    <Play size={16} fill="currentColor" />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1 truncate">{playlist.name}</h3>
                                <p className="text-neutral-400 text-sm line-clamp-2">{playlist.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    );
}
