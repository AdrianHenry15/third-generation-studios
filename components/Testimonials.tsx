"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "ThirdGenerationStudios transformed our concept into a fully functional MVP in record time. Their expertise in cutting-edge technologies helped us secure our first round of funding.",
      author: "Sarah Johnson",
      position: "CEO, TechStart",
      rating: 5,
    },
    {
      quote:
        "Working with ThirdGenerationStudios was a game-changer for our business. Their AI integration capabilities gave us a competitive edge in our market.",
      author: "Michael Chen",
      position: "CTO, InnovateCorp",
      rating: 5,
    },
    {
      quote:
        "The team at ThirdGenerationStudios doesn't just build products, they build solutions. Their client-centric approach ensured our vision was realized perfectly.",
      author: "Alex Rodriguez",
      position: "Founder, NextWave Solutions",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

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
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass p-8 md:p-12 rounded-2xl border border-gray-800"
              >
                <div className="flex mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl mb-6 italic text-gray-300">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                    {testimonials[currentIndex].author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonials[currentIndex].author}</p>
                    <p className="text-gray-400">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-gray-700 hover:border-blue-500 hover:bg-blue-900/20"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-gray-700 hover:border-blue-500 hover:bg-blue-900/20"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
