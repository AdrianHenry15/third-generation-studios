"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CgMusicNote, CgWebsite } from "react-icons/cg";
import { IoMdPricetags } from "react-icons/io";
import { PiShirtFolded } from "react-icons/pi";
import ReusableModal from "@/components/modals/resuable-modal";
import { IconType } from "react-icons/lib";
import LinkItem from "./link-item";
import FooterItem from "./footer-item";
import { IoAlbumsOutline, IoPricetagSharp } from "react-icons/io5";
import { FaPencil, FaQ, FaQuoteRight } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { SiAboutdotme } from "react-icons/si";
import { FaQuestion } from "react-icons/fa";
import UserIcon from "../user-icon";

const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { ease: "easeInOut", duration: 0.3 } },
    exit: { x: "-100%", transition: { ease: "easeInOut", duration: 0.3 } },
};

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Menu Button */}
            <button onClick={() => setIsOpen(true)} className="text-white p-2">
                <Bars3Icon className="h-6 w-12" />
            </button>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg flex flex-col p-6 z-50"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button onClick={() => setIsOpen(false)} className="text-gray-600">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            {/* User Icon */}
                            <div className="flex justify-start">
                                <UserIcon />
                            </div>

                            {/* Menu Items */}
                            <nav className="mt-6 space-y-4">
                                <LinkItem
                                    link="/websites"
                                    title="Showcase"
                                    setIsOpen={() => setIsOpen(false)}
                                    icon={<CgWebsite size={25} />}
                                />
                                <LinkItem
                                    link="/pricing"
                                    title="Pricing"
                                    setIsOpen={() => setIsOpen(false)}
                                    icon={<IoPricetagSharp size={25} />}
                                />
                                <LinkItem link="/blog" title="Blog" setIsOpen={() => setIsOpen(false)} icon={<FaPencil size={25} />} />
                                <LinkItem link="/music" title="Music" setIsOpen={() => setIsOpen(false)} icon={<CgMusicNote size={25} />} />
                                <LinkItem
                                    link="/about"
                                    title="About"
                                    setIsOpen={() => setIsOpen(false)}
                                    icon={<IoAlbumsOutline size={25} />}
                                />
                                <LinkItem link="/faqs" title="Faqs" setIsOpen={() => setIsOpen(false)} icon={<FaQuoteRight size={25} />} />
                            </nav>

                            {/* Footer Buttons */}
                            <div className="mt-auto pt-6 space-y-3">
                                <FooterItem link="/contact-us" setIsOpen={() => setIsOpen(false)} title="Contact Us" />
                                <FooterItem
                                    className="bg-slate-400"
                                    link="/consultation"
                                    setIsOpen={() => setIsOpen(false)}
                                    title="Consultation"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Modal for Merch */}
            <ReusableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="The Merch Store"
                description="The Merch Store will send you to a different tab"
                onConfirm={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default MobileMenu;
