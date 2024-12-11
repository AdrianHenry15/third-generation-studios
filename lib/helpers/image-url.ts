import axios from "axios";

const PRINTFUL_API_BASE = "https://api.printful.com";

/**
 * Fetches the image URL for a specific Printful product or image ID.
 *
 * @param imageId - The ID or key of the image to fetch.
 * @returns The URL of the image as a string.
 */
export async function imageUrl(imageId: string): Promise<string> {
    try {
        // Fetch image details from Printful API (if needed)
        const response = await axios.get(`${PRINTFUL_API_BASE}/products/${imageId}`, {
            headers: {
                Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
            },
        });

        const productData = response.data?.result;

        if (!productData || !productData.thumbnail_url) {
            throw new Error("Image not found for the provided ID");
        }

        return productData.thumbnail_url;
    } catch (error) {
        console.error(`Error fetching image for ID ${imageId}:`, error);
        throw new Error("Unable to fetch image URL");
    }
}
