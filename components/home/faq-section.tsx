"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const faqs = [
        {
            question: "Can you improve the website I already have?",
            answer: "Yes. We start by reviewing what’s working, where visitors get stuck, and what would make the biggest difference for your business.",
        },
        {
            question: "How long does a website project take?",
            answer: "It depends on the size of the site, the content you have ready, and the features you need. We agree on milestones before work starts.",
        },
        {
            question: "What search setup is included?",
            answer: "We scope launch essentials such as page titles, descriptions, a sitemap, and Search Console. We can also set up tracking for completed inquiries.",
        },
        {
            question: "How will I hear about progress?",
            answer: "You’ll work directly with TGS. We’ll agree on when you’ll see drafts and how we’ll collect feedback.",
        },
        {
            question: "Can you help after launch?",
            answer: "Yes. Our Website Care service covers ongoing maintenance and content updates. We scope larger changes with you as they come up.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

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
                        Everything you need to know about working with Third Generation Studios.
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
    );
}
