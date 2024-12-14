"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddToCartButton from "@/app/(root)/cart/components/add-to-cart-button";
import Link from "next/link";
import { PrintfulSyncVariantType } from "@/lib/types/printful/printful-product-types";

export default function ProductView({
    productName,
    variants,
}: {
    productName: string;
    productDescription: string;
    variants: PrintfulSyncVariantType[];
}) {
    const [currentPage, setCurrentPage] = useState(0);

    // Group variants by color and sizes
    const colorVariants = Array.from(new Set(variants.map((variant) => variant.color)));
    const sizeOptions = Array.from(new Set(variants.map((variant) => variant.size)));
    const currentColor = colorVariants[currentPage];
    const filteredVariantsByColor = variants.filter((variant) => variant.color === currentColor);

    // Dynamically set initial size
    const [selectedSize, setSelectedSize] = useState<string | null>(filteredVariantsByColor[0]?.size || null);

    useEffect(() => {
        // Update selectedSize when the color changes
        setSelectedSize(filteredVariantsByColor[0]?.size || null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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
    const formattedProductName = productName.split("/")[0];

    return (
        <div className="min-h-screen bg-gray-100 pt-10 pb-48 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-black">{formattedProductName}</h1>
                </div>

                <div className="border-t border-gray-200 p-6">
                    {selectedVariant?.product?.image ? (
                        <span className="h-80 flex justify-center w-full">
                            <Image
                                src={selectedVariant.product.image}
                                alt={selectedVariant.name}
                                width={800}
                                height={600}
                                className="w-48 self-center h-80 object-cover rounded-md"
                            />
                        </span>
                    ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-md">
                            <p className="text-gray-500">No image available</p>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-gray-900 mt-4">{formattedProductName}</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Price: ${selectedVariant?.retail_price} {selectedVariant?.currency}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Size: {selectedVariant?.size}, Color: {currentColor}
                    </p>
                    <p className={`mt-2 text-sm ${selectedVariant?.availability_status === "active" ? "text-green-600" : "text-red-600"}`}>
                        {selectedVariant?.availability_status === "active" ? "Available" : "Unavailable"}
                    </p>

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
                <h5 className="w-full flex items-center justify-center mb-4">Add To Cart</h5>
                <AddToCartButton product={selectedVariant} />
            </div>
            <div className="flex items-center justify-center w-full mt-10">
                <Link
                    className="bg-black rounded-lg mx-2 border-white border-[1px] w-full self-center flex text-white justify-center py-1 md:w-1/3 hover:bg-black/75 ease-in-out duration-200 transition-colors"
                    href={"/store/products"}
                >
                    Keep Shopping
                </Link>
                <Link
                    className="bg-blue-500 rounded-lg mx-2 border-white border-[1px] w-full self-center flex text-white justify-center py-1 md:w-1/3 hover:bg-black/75 ease-in-out duration-200 transition-colors"
                    href={"/cart"}
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
}
