"use client";

import React, { Fragment } from "react";
import { Dialog, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

import Button from "../button";

interface IOpenWebsiteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    link: string;
}

export default function OpenLinkModal({ isOpen, closeModal, title, link }: IOpenWebsiteModalProps) {
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    const panelVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    const openLink = () => {
        window.open(link, "_blank");
        closeModal();
    };

    return (
        <Transition show={isOpen} as={Fragment} appear>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                {/* Overlay */}
                <Transition.Child
                    as={motion.div}
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        as={motion.div}
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
                    >
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={closeModal}>
                            <XCircle size={24} />
                        </button>
                        <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">Open {title}</DialogTitle>
                        <p className="text-gray-600 mb-6">You’re about to leave Third Generation Studios and visit an external site.</p>
                        <div className="flex justify-end space-x-4">
                            <Button name="Cancel" onClick={closeModal} className="px-4 py-2" />
                            <Button name="Proceed" onClick={openLink} className="bg-green-600 text-white px-4 py-2" />
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
