import { PrintfulProductApiResponse, PrintfulSyncProductType } from "@/lib/types/printful-product-types";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "./components/product-grid";

export default async function AllProductsPage() {
    const fetchProducts = async (): Promise<PrintfulSyncProductType[]> => {
        const response = await fetch(`http://localhost:3000/api/sync-products`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensure fresh data on every request
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const { result } = await response.json();
        // console.log(result);
        return result;
    };

    const getPrice = (product: PrintfulSyncProductType) => {
        const isShirt = product.name.toLowerCase().includes("shirt");
        const isSocks = product.name.toLowerCase().includes("sock");
        const isHat = product.name.toLowerCase().includes("hat");
        const isSticker = product.name.toLowerCase().includes("sticker");

        let price;

        if (isShirt) {
            price = 20;
        } else if (isSocks) {
            price = 10;
        } else if (isHat) {
            price = 15;
        } else if (isSticker) {
            price = 8;
        }
        return price;
    };

    let products: PrintfulSyncProductType[] = [];
    try {
        products = await fetchProducts();
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    if (!products.length) {
        return <p className="text-center text-gray-500 mt-10">No Products found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-48">
            <h1 className="text-center text-4xl font-semibold tracking-wider py-24">Merch Store</h1>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
                {products.map((product) => {
                    return (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <Image
                                width={400}
                                height={300}
                                src={product.thumbnail_url}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                                    <Link href={`/store/products/${product.id}`}>View Product</Link>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div> */}
            <ProductGrid products={products} />
        </div>
    );
}
