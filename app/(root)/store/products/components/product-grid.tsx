"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./product-thumb";
import { PrintfulSyncProductType } from "@/lib/types/printful/printful-product-types";

const ProductGrid = ({ products }: { products: PrintfulSyncProductType[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
            {products.map((product) => {
                return (
                    <AnimatePresence key={product.id}>
                        <motion.div
                            layout
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center"
                        >
                            <ProductThumb key={product.id} product={product} />
                        </motion.div>
                    </AnimatePresence>
                );
            })}
        </div>
    );
};

export default ProductGrid;
