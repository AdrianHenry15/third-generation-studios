"use client";

import { useState } from "react";
import Image from "next/image";
import { PrintfulSyncVariant } from "@/lib/types/printful-product-types";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/cart/add-to-cart-button";

// Pagination Component
export default function PaginatedVariants({
    productName,
    productDescription,
    variants,
}: {
    productName: string;
    productDescription: string;
    variants: PrintfulSyncVariant[];
}) {
    const [currentPage, setCurrentPage] = useState(0);

    const currentVariant = variants[currentPage];

    const handleNext = () => {
        if (currentPage < variants.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Product Info */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-black">{productName}</h1>
                    <p className="text-gray-700 mt-4">{productDescription}</p>
                </div>

                {/* Variant Info */}
                <div className="border-t border-gray-200 p-6">
                    {/* Image */}
                    {currentVariant.product?.image ? (
                        <Image
                            src={currentVariant.product.image}
                            alt={currentVariant.name}
                            width={800}
                            height={600}
                            className="w-full h-80 object-cover rounded-md h-"
                        />
                    ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-md">
                            <p className="text-gray-500">No image available</p>
                        </div>
                    )}

                    {/* Details */}
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">{currentVariant.name}</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Price: {currentVariant.retail_price} {currentVariant.currency}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Size: {currentVariant.size}, Color: {currentVariant.color}
                    </p>
                    <p className={`mt-2 text-sm ${currentVariant.availability_status === "active" ? "text-green-600" : "text-red-600"}`}>
                        {currentVariant.availability_status === "active" ? "Available" : "Unavailable"}
                    </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center border-t border-gray-200 p-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                            currentPage === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Variant {currentPage + 1} of {variants.length}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === variants.length - 1}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                            currentPage === variants.length - 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <AddToCartButton product={variants[0]} />
            </div>
        </div>
    );
}
