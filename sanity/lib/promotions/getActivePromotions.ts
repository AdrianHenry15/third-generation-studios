import { client } from "../client";

export async function getActivePromotions() {
    const promotions = await client.fetch(
        `*[_type == "promotion" && status == "active"] {
            title,
            description,
            discountPercentage,
            icon
        }`,
    );

    return promotions;
}
