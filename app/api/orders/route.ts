import { createPrintfulData, fetchPrintfulData } from "@/lib/printful-service";
import { PrintfulOrderRequest } from "@/lib/types/printful-order-request-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await fetchPrintfulData("/orders");
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Parse the request body (assuming it's JSON)
        const requestBody: PrintfulOrderRequest = await req.json();

        // The endpoint for Printful's API (you can make this dynamic or static depending on the use case)
        const endpoint = "/orders";

        // Call the function to create data on Printful
        const response = await createPrintfulData(endpoint, requestBody);

        // Return the response data from Printful
        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        // Log the error and return a failure response
        console.error("Error creating Printful data:", error.message);
        return NextResponse.json({ error: "Failed to create data on Printful" }, { status: 500 });
    }
}
