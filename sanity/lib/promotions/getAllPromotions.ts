import { client } from "../client";

export async function getAllPromotions() {
    const query = `*[_type == "promotion"] | order(startDate desc) {
        title,
        description,
        discountPercentage,
        icon,
        status,
        startDate,
        endDate
    }`;
    return await client.fetch(query);
}
