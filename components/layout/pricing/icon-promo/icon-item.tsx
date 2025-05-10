"use client";
import React from "react";
import { motion } from "framer-motion";

interface IconItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function IconItem({ icon, title, description }: IconItemProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-green-400 mb-4">{icon}</div>
      <h4 className="text-white text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
}