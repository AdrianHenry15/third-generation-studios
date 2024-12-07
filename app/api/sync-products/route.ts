import { fetchPrintfulData } from "@/lib/printful-service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await fetchPrintfulData("/store/products");
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}