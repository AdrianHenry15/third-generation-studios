"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Feature { icon: React.ReactNode; feature: string; description: string; }
interface PlanProps { title: string; desc: string; features: Feature[]; popular?: boolean; }

export default function Plan({ title, desc, features, popular }: PlanProps) {
  return (
    <motion.div
      className={`max-w-sm w-full flex flex-col p-6 rounded-2xl bg-gray-900 border-2 ${
        popular ? 'border-green-400 bg-gradient-to-br from-gray-900 to-black' : 'border-gray-700'
      } shadow-xl hover:scale-105 transition-transform`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-4">
        <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-green-400' : 'text-white'}`}>{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
      <div className="flex-1 space-y-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`${popular ? 'text-green-400' : 'text-purple-400'} mt-1`}>{f.icon}</div>
            <div>
              <h4 className="text-white font-semibold">{f.feature}</h4>
              <p className="text-gray-500 text-sm">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/consultation"
        className={`mt-6 block py-3 text-center font-semibold ${
          popular ? 'bg-green-400 text-black hover:bg-green-500' : 'bg-purple-600 text-white hover:bg-purple-700'
        } rounded-full transition`}
      >Get Started</Link>
    </motion.div>
  );
}
