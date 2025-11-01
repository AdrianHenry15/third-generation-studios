"use client";

import React, { useState } from "react";
import Image from "next/image";

import { WebsiteType } from "@/lib/types/generic-types";
import OpenLinkModal from "@/components/modals/open-link-modal";
import Logo from "@/public/logos/tgs-logo.png";
import { useModalStore } from "@/stores/modal-store";

interface IWebsiteRowItemProps {
    currentWebsite: WebsiteType;
}

export default function WebsiteRowItem({ currentWebsite }: IWebsiteRowItemProps) {
    // State
    const [modalData, setModalData] = useState<{ title: string; link: string } | null>(null);

    // Stores
    const { isModalOpen, modalType } = useModalStore();
    const openModal = useModalStore((state) => state.openModal);

    const getTechStackLink = (tech: string): string | undefined => {
        switch (tech.toLowerCase()) {
            case "next.js":
                return "https://nextjs.org/";
            case "typescript":
                return "https://www.typescriptlang.org/";
            case "tailwindcss":
                return "https://tailwindcss.com/";
            case "vercel":
                return "https://vercel.com/";
            case "supabase":
                return "https://supabase.com/";
            case "resend":
                return "https://resend.com/";
            case "stripe":
                return "https://stripe.com/";
            case "clerkjs":
            case "clerk":
                return "https://clerk.com/";
            case "sanity.io":
            case "sanity":
                return "https://www.sanity.io/";
            case "shopify":
                return "https://www.shopify.com/";
            case "liquid":
                return "https://shopify.dev/docs/api/liquid";
            case "javascript":
                return "https://developer.mozilla.org/docs/Web/JavaScript";
            default:
                return undefined;
        }
    };

    return (
        <>
            <div className="relative flex flex-col w-full max-w-xs min-w-[18rem] h-[28rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl overflow-hidden shadow-lg group transition-all duration-300">
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-56 lg:h-56 flex-shrink-0">
                    <Image
                        src={currentWebsite.img}
                        alt={currentWebsite.title}
                        fill
                        quality={85}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
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
                            {currentWebsite.tech_stack.map((tech: string, idx: number) => {
                                const techLink = getTechStackLink(tech);
                                return (
                                    <button
                                        key={idx}
                                        className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full border border-gray-600 shadow-sm transition-all duration-150 hover:bg-blue-600 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (techLink) {
                                                setModalData({ title: tech, link: techLink });
                                                openModal("link", {
                                                    title: tech,
                                                    link: techLink,
                                                });
                                            }
                                        }}
                                        type="button"
                                    >
                                        {tech}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    {/* Visit Site button */}
                    <button
                        className="mt-auto w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-md transition-all duration-150 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModalData({ title: currentWebsite.title, link: currentWebsite.link });
                            openModal("link", { title: currentWebsite.title, link: currentWebsite.link });
                        }}
                        type="button"
                    >
                        Visit Site
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && modalType === "link" && modalData && <OpenLinkModal title={modalData.title} link={modalData.link} />}
        </>
    );
}
