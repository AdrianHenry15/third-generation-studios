import { NextResponse } from "next/server";
import { fetchPrintfulProducts } from "@/lib/printful-service";

export async function GET() {
    try {
        const products = await fetchPrintfulProducts();
        return NextResponse.json({ products });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
