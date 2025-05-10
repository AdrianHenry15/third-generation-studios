"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function LogoStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const logos = [
    { name: "Eckert Golf", initial: "EG" },
    { name: "Brite", initial: "B" },
    { name: "Molly's Specialty Sweets", initial: "M" },
    { name: "Intentional Living", initial: "IL" },
    { name: "Alexandria", initial: "A" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl text-gray-400 mb-10"
        >
          Trusted by innovative clients
        </motion.h3>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                filter: "brightness(1.2)",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
              }}
              className="flex items-center justify-center h-16 w-32 glass rounded-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-500 mr-2">{logo.initial}</span>
                <span className="text-sm text-gray-300">{logo.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
