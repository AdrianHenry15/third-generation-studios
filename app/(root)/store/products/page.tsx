import { PrintfulProductsViewType } from "@/lib/types/printful-product-types";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
    const fetchProductss = async (): Promise<PrintfulProductsViewType[]> => {
        const response = await fetch(`http://localhost:3000/api/products`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensure fresh data on every request
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const { result } = await response.json();
        return result;
    };

    let products: PrintfulProductsViewType[] = [];
    try {
        products = await fetchProductss();
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    if (!products.length) {
        return <p className="text-center text-gray-500 mt-10">No Products found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-center text-3xl font-bold py-8">TGS Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <Image
                            width={400}
                            height={300}
                            src={product.thumbnail_url}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-sm text-gray-500">
                                Variants: {product.variants} | Synced: {product.synced}
                            </p>
                            <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                                <Link href={`/store/products/${product.id}`}>View Product</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
