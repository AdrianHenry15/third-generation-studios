import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Extract category from the URL path
        const { pathname } = req.nextUrl;
        const category = pathname.split("/")[3]; // Adjust the index based on your URL structure
        const itemId = pathname.split("/")[4]; // Adjust the index based on your URL structure

        if (!category) {
            throw new Error("Category is missing in the URL");
        }

        // Your logic for handling the like operation can go here

        return NextResponse.json({ message: "Like added", category, itemId });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        // Extract category from the URL path
        const { pathname } = req.nextUrl;
        const category = pathname.split("/")[3]; // Adjust the index based on your URL structure
        const itemId = pathname.split("/")[4]; // Adjust the index based on your URL structure

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
    try {
        // Extract category and itemId from the URL path
        const { pathname } = req.nextUrl;
        const category = pathname.split("/")[3]; // Adjust the index based on your URL structure
        const itemId = pathname.split("/")[4]; // Adjust the index based on your URL structure

        if (!category) {
            throw new Error("Category is missing in the URL");
        }

        // Your logic for handling the delete operation can go here

        return NextResponse.json({ message: "Like deleted", category, itemId });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
