"use client";
import React from "react";
import { motion } from "framer-motion";
import IconItem from "./icon-item";
import { CgWebsite } from "react-icons/cg";
import { Si1And1, SiClerk } from "react-icons/si";
import { FaSquare } from "react-icons/fa";

const features = [
    { icon: <CgWebsite size={36} />, title: "Instant Deployment", desc: "Global CDN with zero-config scaling" },
    { icon: <Si1And1 size={36} />, title: "Email Automation", desc: "Send 25k+ emails reliably" },
    { icon: <SiClerk size={36} />, title: "Secure Auth", desc: "Built-in auth for up to 5k MAUs" },
    { icon: <FaSquare size={36} />, title: "Payments", desc: "Seamless Square integration" },
];

export default function SplashIconRow() {
    return (
        <motion.div
            className="bg-black py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
            {features.map((f, i) => (
                <IconItem key={i} icon={f.icon} title={f.title} description={f.desc} />
            ))}
        </motion.div>
    );
}
