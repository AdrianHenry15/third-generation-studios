"use client";

import { motion } from "framer-motion";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const styles = [
    {
        name: "Modern",
        description: "Sleek, minimal, and cutting-edge designs that leverage responsive UI components.",
    },
    {
        name: "Classic",
        description: "Timeless elegance with structured layouts and a refined aesthetic.",
    },
    {
        name: "Futuristic",
        description: "Bold, neon-lit, and high-tech interfaces with a futuristic feel.",
    },
];

const StylingSection = () => {
    return (
        <section className="py-16 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto text-center">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl font-extrabold mb-6 py-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Elevate Your Design with Modern Tools
                </motion.h2>
                <motion.p
                    className="text-lg mb-8 max-w-2xl mx-auto text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Experience seamless styling with **Headless UI, Framer Motion, Tailwind CSS, and Material UI**. Build visually stunning,
                    highly interactive, and scalable designs effortlessly.
                </motion.p>

                {/* Tabs Section */}
                <TabGroup>
                    <TabList className="flex justify-center gap-4 mb-8">
                        {styles.map((style, index) => (
                            <Tab key={index} className="focus:outline-none">
                                {({ selected }) => (
                                    <motion.div
                                        className={`px-6 py-2 rounded-lg text-lg font-medium transition-all ${
                                            selected
                                                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {style.name}
                                    </motion.div>
                                )}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {styles.map((style, index) => (
                            <TabPanel key={index}>
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.95 },
                                        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
                                    }}
                                >
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                            <Card className="shadow-xl rounded-2xl overflow-hidden bg-gray-800">
                                                <CardContent className="p-6">
                                                    <Typography variant="h5" className="mb-2 font-semibold text-blue-400">
                                                        {style.name} Design
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        className="text-gray-500 py-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                                                    >
                                                        {style.description}
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className="mt-4 bg-blue-500 hover:bg-blue-600"
                                                    >
                                                        Learn More
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>

                {/* Footer: Promotion */}
                <motion.div
                    className="mt-12 flex flex-wrap justify-center gap-4 text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="text-sm bg-gray-700 px-4 py-2 rounded-lg">🔥 Built with **Headless UI**</span>
                    <span className="text-sm bg-gray-700 px-4 py-2 rounded-lg">🎨 Styled with **Tailwind CSS**</span>
                    <span className="text-sm bg-gray-700 px-4 py-2 rounded-lg">🎬 Animated by **Framer Motion**</span>
                    <span className="text-sm bg-gray-700 px-4 py-2 rounded-lg">🛠️ Components from **Material UI**</span>
                </motion.div>
            </div>
        </section>
    );
};

export default StylingSection;
