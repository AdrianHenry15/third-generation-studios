"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { WebsiteType } from "@/lib/types";
import OpenLinkModal from "@/components/modals/open-link-modal";
import Logo from "@/public/logos/tgs-logo.png";

interface IWebsiteRowItemProps {
    currentWebsite: WebsiteType;
}

export default function WebsiteRowItem({ currentWebsite }: IWebsiteRowItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cardVariants = {
        hover: { scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" },
    };

    return (
        <>
            <motion.div
                className="relative flex flex-col w-full max-w-xs min-w-[18rem] h-[28rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl overflow-hidden cursor-pointer shadow-lg group transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                onClick={() => setIsModalOpen(true)}
            >
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-56 lg:h-56 flex-shrink-0">
                    <Image src={currentWebsite.img} alt={currentWebsite.title} fill className="object-cover" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 p-1 rounded-full z-20">
                        <Image src={Logo} alt="logo" width={24} height={24} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between z-20">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">{currentWebsite.title}</h3>
                    {/* Subtitle/Description */}
                    {currentWebsite.description && (
                        <p className="text-gray-300 text-sm mb-2 line-clamp-2 min-h-[2.5em]">{currentWebsite.description}</p>
                    )}
                    {/* Tech stack badges */}
                    {currentWebsite && currentWebsite.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {currentWebsite.tech_stack.map((tech: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full border border-gray-600 shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                    {/* Visit Site button (shows on hover) */}
                    <button
                        className="mt-auto w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(currentWebsite.link, "_blank");
                        }}
                    >
                        Visit Site
                    </button>
                </div>
            </motion.div>

            {/* Modal */}
            {isModalOpen && (
                <OpenLinkModal
                    isOpen={true}
                    closeModal={() => setIsModalOpen(false)}
                    title={currentWebsite.title}
                    link={currentWebsite.link}
                />
            )}
        </>
    );
}
