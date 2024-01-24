import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
    const { userId } = auth();
    const { pathname } = req.nextUrl;
    const category = pathname.split("/")[3]; // Adjust the index based on your URL structure
    const itemId = pathname.split("/")[4]; // Adjust the index based on your URL structure

    if (!category || !itemId) {
        throw new Error("Category, UserId, or ItemId is missing in the URL");
    }
    try {
        // Your logic for handling the like operation can go here
        if (!category) {
            throw new Error("Category is missing in the URL");
        }

        // if (!userId) {
        //     throw new Error("User is not authenticated");
        // }

        return NextResponse.json({ message: "Like added", category, itemId });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { userId } = auth();
    // Extract category from the URL path
    const { pathname } = req.nextUrl;
    const category = pathname.split("/")[3]; // Adjust the index based on your URL structure
    const itemId = pathname.split("/")[4]; // Adjust the index based on your URL structure

    if (!category || !itemId) {
        throw new Error("Category, UserId, or ItemId is missing in the URL");
    }
    try {
        // if (!userId) {
        //     throw new Error("User is not authenticated");
        // }

        if (!category) {
            throw new Error("Category is missing in the URL");
        }

        // Your logic for handling the like operation can go here

        return NextResponse.json({ message: "Like retreived", category, itemId });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { userId } = auth();

    // Extract category and itemId from the URL path
    const { pathname } = req.nextUrl;
    const category = pathname.split("/")[3]; // Adjust the index based on your URL structure
    const itemId = pathname.split("/")[4]; // Adjust the index based on your URL structure

    if (!category || !itemId) {
        throw new Error("Category, UserId, or ItemId is missing in the URL");
    }
    try {
        if (!category) {
            throw new Error("Category is missing in the URL");
        }

        // Your logic for handling the delete operation can go here
        // if (!userId) {
        //     throw new Error("User is not authenticated");
        // }

        return NextResponse.json({ message: "Like deleted", category, itemId });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
