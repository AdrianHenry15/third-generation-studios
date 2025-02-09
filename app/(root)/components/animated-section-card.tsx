import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface IAnimatedSectionCardProps {
    title: string;
    description: string;
    image: string | StaticImageData;
    link: string;
    animatedBg?: boolean;
}

const AnimatedSectionCard: React.FC<IAnimatedSectionCardProps> = ({ title, description, image, link, animatedBg }) => {
    return (
        <motion.div
            className={`relative p-6 cursor-pointer rounded-xl shadow-lg w-full max-w-xs flex flex-col items-center text-center overflow-hidden border border-white transition-all ease-in-out duration-500  ${
                animatedBg ? "hover:shadow-2xl hover:border-gray-300" : "hover:bg-gradient-to-b from-gray-800 to-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
        >
            <Link href={link} target="_blank" className="relative">
                {/* Animated Background Effect */}
                {animatedBg && (
                    <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 opacity-30"
                        initial={{ scale: 1, opacity: 0.3 }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />
                )}

                {/* Hover Glow Effect */}
                {animatedBg && (
                    <motion.div
                        className="absolute inset-0 rounded-xl bg-white opacity-0"
                        whileHover={{ opacity: 0.15, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                )}

                {/* Image */}
                <div className="w-full flex justify-center mb-4 relative z-10">
                    <Image src={image} alt={title} className="object-contain rounded-lg" width={120} height={120} priority />
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-semibold text-white relative z-10">{title}</h3>
                <p className="text-gray-400 mt-2 text-sm relative z-10">{description}</p>
            </Link>
        </motion.div>
    );
};

export default AnimatedSectionCard;
