"use client";

import { useState } from "react";
import Image from "next/image";
import { PrintfulSyncVariant } from "@/lib/types/printful-product-types";
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
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Modify product name to remove anything after the first "/"
    const formattedProductName = productName.split("/")[0];

    // Group variants by color and sizes
    const colorVariants = Array.from(new Set(variants.map((variant) => variant.color)));
    const sizeOptions = Array.from(new Set(variants.map((variant) => variant.size)));

    const currentColor = colorVariants[currentPage];
    const filteredVariantsByColor = variants.filter((variant) => variant.color === currentColor);

    const handleNext = () => {
        if (currentPage < colorVariants.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    const selectedVariant = filteredVariantsByColor.find((variant) => variant.size === selectedSize) || filteredVariantsByColor[0];

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Product Info */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-black">{formattedProductName}</h1>
                    {/* <p className="text-gray-700 mt-4">{productDescription}</p> */}
                </div>

                {/* Variant Info */}
                <div className="border-t border-gray-200 p-6">
                    {/* Image */}
                    {selectedVariant?.product?.image ? (
                        <Image
                            src={selectedVariant.product.image}
                            alt={selectedVariant.name}
                            width={800}
                            height={600}
                            className="w-full h-80 object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-md">
                            <p className="text-gray-500">No image available</p>
                        </div>
                    )}

                    {/* Details */}
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">{formattedProductName}</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Price: {selectedVariant?.retail_price} {selectedVariant?.currency}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Size: {selectedVariant?.size}, Color: {currentColor}
                    </p>
                    <p className={`mt-2 text-sm ${selectedVariant?.availability_status === "active" ? "text-green-600" : "text-red-600"}`}>
                        {selectedVariant?.availability_status === "active" ? "Available" : "Unavailable"}
                    </p>

                    {/* Size Selector */}
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-700">Select Size:</h3>
                        <div className="mt-2 flex gap-4">
                            {sizeOptions.map((size) => (
                                <label key={size} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="size"
                                        value={size}
                                        checked={selectedSize === size}
                                        onChange={() => handleSizeChange(size)}
                                        className="cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-600">{size}</span>
                                </label>
                            ))}
                        </div>
                    </div>
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
                        Color {currentPage + 1} of {colorVariants.length}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === colorVariants.length - 1}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                            currentPage === colorVariants.length - 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <AddToCartButton product={selectedVariant} />
            </div>
        </div>
    );
}
