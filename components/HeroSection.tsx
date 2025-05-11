"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Zap } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const codeAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full md:w-1/2 mb-12 md:mb-0"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Build the Future with <span className="gradient-text">ThirdGenerationStudios</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8">
              We convert your digital vision into reality with MVP-ready custom solutions using cutting-edge
              technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us">
                <Button className="bg-green-600 text-white hover:bg-green-700 hover:glow text-lg px-8 py-6">
                  Let's Talk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </Link>
                <Link href="/websites">
                <Button
                  variant={"outline"}
                  className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400 text-lg px-8 py-6"
                >
                  See MVP Demo
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <span className="bg-blue-900/30 border border-blue-800 px-4 py-2 rounded-full text-sm">
                MVP-ready in no time
              </span>
              <span className="bg-purple-900/30 border border-purple-800 px-4 py-2 rounded-full text-sm">
                Powered by the tech of tomorrow
              </span>
              <span className="bg-indigo-900/30 border border-indigo-800 px-4 py-2 rounded-full text-sm">
                We architect your innovation
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={codeAnimation}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-20 blur-3xl"></div>
              <div className="glass rounded-lg p-6 relative z-10 border border-blue-500/30">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-400">ThirdGenerationStudios.jsx</div>
                </div>
                <pre className="text-xs sm:text-sm text-gray-300 overflow-x-hidden">
                  <code>
                    {`import { Future } from 'tech-of-tomorrow';
import { Vision } from 'your-ideas';

const DigitalSolution = () => {
  const mvp = useInnovation(Vision);
  
  return (
    <Future>
      {mvp.map(feature => (
        <Feature 
          key={feature.id}
          data={feature}
          deployTime="record-breaking"
        />
      ))}
    </Future>
  );
};

// You dream it. We deploy it.
export default DigitalSolution;`}
                  </code>
                </pre>
                <div className="mt-4 flex items-center text-xs text-gray-400">
                  <Code className="h-4 w-4 mr-2" />
                  <span>Powered by ThirdGenerationStudios</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
