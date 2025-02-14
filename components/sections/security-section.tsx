"use client";

import { motion } from "framer-motion";
import ClerkLogo from "@/public/logos/clerk-logo.webp";
import SanityLogo from "@/public/logos/sanity-logo.png";
import EmailjsLogo from "@/public/logos/emailjs-logo.png";
import SecurityItemCard from "../cards/security-item-card";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const SecuritySection = () => (
    <motion.section
        className="py-16 px-6 bg-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        <div className="container mx-auto text-center">
            {/* Title */}
            <motion.h2 className="text-4xl font-extrabold mb-6" variants={fadeIn}>
                Your Security, Our Priority
            </motion.h2>

            {/* Subtitle */}
            <motion.p className="text-lg mb-12 max-w-2xl mx-auto" variants={fadeIn}>
                Powered by the Best in Class to deliver a seamless and secure experience for you.
            </motion.p>

            {/* Security Cards */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" variants={staggerContainer}>
                {[
                    {
                        imageSrc: ClerkLogo,
                        imageAlt: "Clerk.js",
                        title: "Clerk.js: Secure Authentication",
                        description:
                            "Clerk.js provides seamless and secure authentication. With multi-factor authentication and real-time session management, your account is protected 24/7.",
                    },
                    {
                        imageSrc: SanityLogo,
                        imageAlt: "Sanity.io",
                        title: "Sanity.io: Trusted Data Management",
                        description:
                            "Sanity.io ensures that your content is securely stored and updated in real-time, with access restricted to authorized users only.",
                    },
                    {
                        imageSrc: EmailjsLogo,
                        imageAlt: "EmailJS",
                        title: "EmailJS: Secure Communication",
                        description:
                            "With EmailJS, your notifications are encrypted for your privacy. Receive secure, real-time emails with complete peace of mind.",
                    },
                ].map((item, index) => (
                    <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.05 }}>
                        <SecurityItemCard {...item} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer */}
            <motion.div className="mt-12" variants={fadeIn}>
                <p className="text-lg font-medium">Together, We Secure Your Experience</p>
                <p className="text-sm text-gray-200 mt-2">
                    Combining Clerk.js, Sanity.io, and EmailJS, we ensure a seamless and secure experience for you, no matter where you are.
                </p>
            </motion.div>
        </div>
    </motion.section>
);

export default SecuritySection;
