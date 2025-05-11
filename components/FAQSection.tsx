"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const faqs = [
    {
      question: "What is an MVP and why do I need one?",
      answer:
        "An MVP (Minimum Viable Product) is a version of your product with just enough features to satisfy early customers and provide feedback for future development. It helps validate your idea with minimal investment, gather user feedback, and iterate quickly based on real-world usage.",
    },
    {
      question: "How long does it take to develop an MVP?",
      answer:
        "The timeline varies depending on the complexity of your project, but we typically deliver MVPs within 4-8 weeks. Our agile approach allows us to focus on core features first, getting your product to market faster.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in modern web and mobile technologies including React, Next.js, Node.js, Python, AI/ML frameworks, and cloud infrastructure. We select the best tech stack for each project based on specific requirements and scalability needs.",
    },
    {
      question: "How do you handle project management and communication?",
      answer:
        "We use agile methodologies with regular sprint reviews and daily standups. You'll have access to our project management tools to track progress in real-time. We maintain open communication channels through Slack, email, and scheduled video calls.",
    },
    {
      question: "What happens after the MVP is launched?",
      answer:
        "Post-launch, we analyze user feedback and performance metrics to identify improvements. We can then work with you on the next development phase, adding features, optimizing performance, and scaling your infrastructure as your user base grows.",
    },
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
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about working with ThirdGenerationStudios.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="border-gray-800">
                  <AccordionTrigger className="text-left text-lg hover:text-green-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
