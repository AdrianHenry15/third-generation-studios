import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllAuthors = async () => {
    const ALL_AUTHORS = defineQuery(`*[_type == "author"] | order(name asc)
`);

    try {
        // Use sanityFetch to send the query
        const author = await sanityFetch({
            query: ALL_AUTHORS,
        });

        // Return the list of Authors, or an empty array if none are found
        return author.data || [];
    } catch (error) {
        console.error("Error fetching all Authors:", error);
        return [];
    }
};
