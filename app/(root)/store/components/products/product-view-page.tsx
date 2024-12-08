import { PrintfulSyncVariant } from "@/lib/types/printful-product-types";
import Image from "next/image";
import React from "react";

interface IProductViewPageProps {
    variants: PrintfulSyncVariant[];
}

const ProductViewPage = (props: IProductViewPageProps) => {
    const { variants } = props;
    return (
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h1 className="text-3xl font-bold text-black text-center mb-8">Product Variants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {variants.map((variant) => (
                    <div key={variant.id} className="bg-gray-50 border rounded-lg shadow p-4">
                        {variant.product.image && (
                            <Image
                                width={400}
                                height={300}
                                src={variant.product.image}
                                alt={variant.name}
                                className="w-full h-48 object-cover rounded"
                            />
                        )}
                        <div className="mt-4">
                            <h2 className="text-xl font-bold text-gray-900">{variant.name}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Price: {variant.retail_price} {variant.currency}
                            </p>
                            <p className="text-sm text-gray-500">
                                Size: {variant.size}, Color: {variant.color}
                            </p>
                            <p className={`mt-2 text-sm ${variant.availability_status === "in_stock" ? "text-green-600" : "text-red-600"}`}>
                                {variant.availability_status === "in_stock" ? "Available" : "Out of Stock"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductViewPage;
