import { PrintfulProductType } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products, setProducts] = useState<PrintfulProductType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data.products);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {products.map((product: any) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <Image src={product.thumbnail_url} alt={product.name} />
                    <p>${product.retail_price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductsPage;
