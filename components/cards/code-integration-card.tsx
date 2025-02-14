import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ICodeIntegrationCardProps {
    title: string;
    description: string;
    image: string | StaticImageData;
    link: string;
}

const CodeIntegrationCard: React.FC<ICodeIntegrationCardProps> = ({ title, description, image, link }) => {
    return (
        <motion.div
            className="relative p-6 cursor-pointer rounded-xl shadow-lg w-full sm:w-80 md:w-96 lg:w-72 xl:w-80 flex flex-col items-center text-center overflow-hidden border border-white transition-all duration-300 ease-in-out group"
            whileHover={{ scale: 1.05 }}
        >
            <Link href={link} target="_blank" className="relative w-full">
                {/* Image */}
                <div className="w-full flex-auto flex justify-center mb-4 relative z-10 h-[120px] hover:opacity-80 transition-opacity">
                    <Image src={image} alt={title} className="object-contain rounded-lg" width={120} height={120} priority />
                </div>

                {/* Text Content */}
                <h3 className="text-lg flex-1 font-semibold text-white relative z-10 group-hover:text-gray-200 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 flex flex-1 mt-2 text-sm relative z-10 group-hover:text-gray-300 transition-colors">
                    {description}
                </p>
            </Link>

            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
    );
};

export default CodeIntegrationCard;
