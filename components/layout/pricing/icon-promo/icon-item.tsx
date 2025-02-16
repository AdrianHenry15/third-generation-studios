import React from "react";
import { motion } from "framer-motion";

interface IIconItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const IconItem = ({ icon, title, description }: IIconItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)" }}
            className="border-2 border-zinc-700 rounded-lg p-1 m-2 cursor-pointer"
        >
            <div className="flex flex-col items-start justify-center text-white bg-zinc-900 border border-zinc-600 rounded-lg w-full p-5 transition-all duration-300">
                <motion.span
                    className="mb-4 flex text-white"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {icon}
                </motion.span>
                <motion.h5 className="font-semibold text-xl text-white" whileHover={{ color: "#a1a1a1" }}>
                    {title}
                </motion.h5>
                <p className="text-gray-400 max-w-[257px] text-start text-sm mt-2">{description}</p>
            </div>
        </motion.div>
    );
};

export default IconItem;
