import Image from "next/image";
import React from "react";
import AddToCartButton from "./add-to-cart-button";
import { ICartItem } from "@/stores/cart-store";
import Link from "next/link";
import usePrintfulProductStore from "@/stores/printful-product-store";

interface ICartItemProps {
    openModal: () => void;
    item: ICartItem;
}

const CartItem = (props: ICartItemProps) => {
    const { item, openModal } = props;
    const { products } = usePrintfulProductStore();

    // Find the product from the store
    const product = products.find((product) => product.id === item.product.sync_product_id);

    return (
        <Link
            href={`/store/products/${item.product.sync_product_id}`}
            className="mb-4 p-4 border rounded flex items-center justify-between"
            key={item.product.id}
        >
            <div className="flex items-center cursor-pointer flex-1 min-w-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                    {product?.id && (
                        <Image
                            src={product.thumbnail_url} // Use the image from the found product
                            alt={product.name || "Product image"}
                            className="w-full h-full object-cover rounded"
                            width={96}
                            height={96}
                        />
                    )}
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold truncate">{item.product.name}</h2>
                    <p className="text-sm sm:text-base">
                        Price: ${((parseInt(item.product.retail_price) ?? 0) * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="flex items-center ml-4 flex-shrink-0">
                <AddToCartButton product={item.product} />
            </div>
        </Link>
    );
};

export default CartItem;
