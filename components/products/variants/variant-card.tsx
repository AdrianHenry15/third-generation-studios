import { PrintfulSyncVariant } from "@/lib/types/printful-product-types";
import Image from "next/image";
import Link from "next/link";

interface ProductVariantCardProps {
    variant: PrintfulSyncVariant;
}

const ProductVariantCard: React.FC<ProductVariantCardProps> = ({ variant }) => {
    return (
        <div key={variant.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-64">
                <Image
                    src={variant.product.image}
                    alt={variant.product.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{variant.product.name}</h3>
                <p className="text-sm text-gray-500">SKU: {variant.sku}</p>
                <p className="text-md font-bold text-gray-800">
                    {variant.currency} {variant.retail_price}
                </p>
                <p className="text-sm text-gray-600">Size: {variant.size}</p>
                <p className="text-sm text-gray-600">Color: {variant.color}</p>
                <p className="text-sm text-gray-500">Availability: {variant.availability_status}</p>

                {/* Link to detailed product page */}
                <Link href={`/products/${variant.id}`} passHref>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductVariantCard;
