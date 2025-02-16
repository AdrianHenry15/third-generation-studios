"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import IconItem from "./icon-item";
import EmailjsIcon from "@/public/emailjs.png";
import ClerkjsIcon from "@/public/clerk.png";
import { CgSquare } from "react-icons/cg";
import { SiVercel } from "react-icons/si";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const IconRow = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center w-full z-50 bg-black p-6 xl:flex-row gap-6"
        >
            <div className="flex flex-col w-full justify-center md:flex-row gap-6">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <IconItem
                        icon={<SiVercel size={35} />}
                        title="Website Deployment"
                        description="Ultra-fast website deployment, with global edge network and automatic scaling using Next.js and Vercel"
                    />
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <IconItem
                        icon={<Image className="w-[35px]" src={EmailjsIcon} alt="emailjs-icon" />}
                        title="Email Your Clients"
                        description="Over 25,000 clients trust EmailJS to send emails"
                    />
                </motion.div>
            </div>
            <div className="flex flex-col w-full justify-center md:flex-row gap-6">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <IconItem
                        icon={<Image className="w-[35px]" src={ClerkjsIcon} alt="clerkjs-icon" />}
                        title="Users Log In"
                        description="Handle up to 5,000 monthly active users with built-in authentication and authorization"
                    />
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <IconItem
                        icon={<CgSquare size={45} />}
                        title="Payment Processing"
                        description="Increase repeat purchases and get better insight into your customer behavior with Square payment processing"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default IconRow;
