"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Code2, Cpu, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const features = [
    {
      icon: <Rocket className="h-10 w-10 text-blue-500" />,
      title: "MVP Delivery",
      description:
        "Launch your product faster with our rapid MVP development process. We focus on core features to get your product to market quickly.",
    },
    {
      icon: <Code2 className="h-10 w-10 text-purple-500" />,
      title: "Custom Web Platforms",
      description:
        "Tailored development to meet your specific needs. We build scalable, responsive web applications with cutting-edge technologies.",
    },
    {
      icon: <Cpu className="h-10 w-10 text-indigo-500" />,
      title: "AI Integrations",
      description:
        "Enhance your product with artificial intelligence. We integrate machine learning models to provide smart solutions for your users.",
    },
    {
      icon: <Users className="h-10 w-10 text-cyan-500" />,
      title: "Client-Centric Approach",
      description:
        "Your vision is our priority. We work closely with you to ensure your product meets your expectations and delights your users.",
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We leverage the latest technologies to build innovative solutions that drive your business forward.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
              className="h-full"
            >
              <Card className="h-full bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
