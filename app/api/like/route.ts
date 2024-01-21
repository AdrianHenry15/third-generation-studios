// pages/api/like.ts

import { NextApiRequest, NextApiResponse } from "next";

interface LikeRequestBody {
    itemType: string;
    itemID: string;
}

interface LikeResponseBody {
    message: string;
}

// In-memory store for liked items
const likedItems: Record<string, string[]> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LikeResponseBody>) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { itemType, itemID } = req.body as LikeRequestBody;

    try {
        // Check if the itemType exists in the likedItems store
        if (!likedItems[itemType]) {
            likedItems[itemType] = [];
        }

        // Check if the itemID is already liked
        const isLiked = likedItems[itemType].includes(itemID);

        // Toggle liking/unliking
        if (isLiked) {
            // Unlike the item
            likedItems[itemType] = likedItems[itemType].filter((id) => id !== itemID);
            res.status(200).json({ message: "Item unliked successfully" });
        } else {
            // Like the item
            likedItems[itemType].push(itemID);
            res.status(200).json({ message: "Item liked successfully" });
        }
    } catch (error) {
        console.error("Error liking/unliking item", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
