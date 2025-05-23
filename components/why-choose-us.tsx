"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Rocket, Shield, BarChart } from "lucide-react"

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const reasons = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "3x Faster Delivery",
      description:
        "Our streamlined development process ensures your product gets to market faster than traditional methods.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-blue-500" />,
      title: "Built with AI/ML",
      description:
        "We leverage artificial intelligence and machine learning to create smarter, more efficient solutions.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Scalable Infrastructure",
      description: "Our solutions are built to grow with your business, ensuring long-term success and stability.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-purple-500" />,
      title: "Data-Driven Approach",
      description: "We use analytics and user feedback to continuously improve and optimize your product.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="why-choose-us" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <br/> <span className="gradient-text">Third Generation Studios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're not just developers, we're innovators committed to your success.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
              className="glass p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="bg-gray-800/50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
