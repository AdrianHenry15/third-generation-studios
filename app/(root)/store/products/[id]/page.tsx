import { PrintfulSyncVariantType } from "@/lib/types/printful-product-types";
import ProductView from "../components/products-view";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch product variant details by ID
    const fetchSyncProductVariant = async (id: string): Promise<PrintfulSyncVariantType[] | null> => {
        try {
            const response = await fetch(`http://localhost:3000/api/sync-products/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store", // Ensure fresh data on every request
            });

            if (!response.ok) {
                console.error("Failed to fetch product details:", response.statusText);
                return null;
            }

            const { result } = await response.json();
            // console.log(result);
            return result.sync_variants as PrintfulSyncVariantType[]; // Adjusted to extract sync_variants
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };

    let variants: PrintfulSyncVariantType[] | null = null;

    try {
        variants = await fetchSyncProductVariant(id);
    } catch (error) {
        console.error("Error fetching product:", error);
    }

    if (!variants || variants.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500">Product not found.</p>
            </div>
        );
    }

    // Extract product name and description from the first variant's product field
    const productName = variants[0].name;
    const productDescription = variants[0].product.name;
    // console.log(variants);

    // Client-side component for pagination
    return <ProductView productName={productName} productDescription={productDescription} variants={variants} />;
}
