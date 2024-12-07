import axios from "axios";
import Fuse from "fuse.js";

export const searchProductsByName = async (searchParam: string) => {
    try {
        // Fetch all products from your Printful API route
        const response = await axios.get("/api/printful/products");
        const allProducts = response.data || [];

        // Configure Fuse.js for fuzzy searching
        const fuse = new Fuse(allProducts, {
            keys: ["name"], // Search on the `name` field
            threshold: 0.3, // Adjust for stricter/looser matching
        });

        // Perform the search
        const results = fuse.search(searchParam);

        // Return the matched items
        return results.map((result) => result.item);
    } catch (error: any) {
        console.error("Error searching Printful products:", error.message);
        return [];
    }
};
