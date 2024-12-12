import { PrintfulSyncProductType } from "@/lib/types/printful-product-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductThumb = ({ product }: { product: PrintfulSyncProductType }) => {
    return (
        <Link
            href={`/store/products/${product.id}`}
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <Image width={400} height={300} src={product.thumbnail_url} alt={product.name} className="w-full h-120 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                    <p className="text-white">View Product</p>
                </button>
            </div>
        </Link>
    );
};

export default ProductThumb;
