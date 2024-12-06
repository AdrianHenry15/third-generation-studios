"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    thumbnail_url: string;
}

export default function PrintfulProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/printful/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data.result); // Adjust based on Printful response format
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Printful Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Image src={product.thumbnail_url} alt={product.name} />
                        <p>{product.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
