"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SplashImageText() {
  return (
    <div className="text-center px-6 sm:px-12">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
      >
        Scale Your Business with <span className="gradient-text">Studio Commerce</span>
      </motion.h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/pricing#plans">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:bg-green-500 transition"
          >
            Start Free Trial
          </motion.button>
        </Link>
        <Link href="/pricing#plans">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-white border border-white rounded-full px-8 py-3 font-semibold hover:bg-white hover:text-black transition"
          >
            View Plans
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
