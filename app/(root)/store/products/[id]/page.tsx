import { PrintfulProductsViewType } from "@/lib/types/printful-product-types";
import Image from "next/image";

async function fetchProduct(id: string): Promise<PrintfulProductsViewType | null> {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Always fetch fresh data
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const product: PrintfulProductsViewType = await response.json();
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await fetchProduct(params.id);

    if (!product) {
        return <p className="text-center text-gray-500 mt-10">Product not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-center">{product.name}</h1>
                <div className="flex flex-col md:flex-row items-center mt-8 gap-6">
                    <Image src={product.thumbnail_url} alt={product.name} width={400} height={300} className="rounded-lg shadow-lg" />
                    <div className="flex-1">
                        <p className="text-lg font-medium mb-4">Variants: {product.variants}</p>
                        <p className="text-sm text-gray-500 mb-4">Synced: {product.synced}</p>
                        <p className="text-sm text-gray-500 mb-4">Ignored: {product.is_ignored ? "Yes" : "No"}</p>
                        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
