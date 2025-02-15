import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion,
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    // Allows visual editor to encode page in certain way; frontend correlation to sanity cms
    stega: {
        studioUrl:
            process.env.NODE_ENV === "production"
                ? `https://${process.env.VERCEL_URL}/studio`
                : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
    },
});
