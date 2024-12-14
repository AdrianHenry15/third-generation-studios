"use client";

import { useEffect, useState } from "react";
import ProductGrid from "./components/product-grid";
import usePrintfulProductStore from "@/stores/printful-product-store";

export default function AllProductsPage() {
    const { products, fetchProducts } = usePrintfulProductStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!products.length) {
                await fetchProducts();
            }
            setLoading(false);
        };

        fetchData();
    }, [products, fetchProducts]);

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Loading products...</p>;
    }

    if (!products.length) {
        return <p className="text-center text-gray-500 mt-10">No Products found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-48">
            <h1 className="text-center text-4xl font-semibold tracking-wider py-24">Merch Store</h1>
            <ProductGrid products={products} />
        </div>
    );
}
