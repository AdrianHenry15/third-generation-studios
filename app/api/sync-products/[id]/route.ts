import { fetchPrintfulData } from "@/lib/printful-service";
import { PrintfulProductApiResponse } from "@/lib/types/printful-product-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    try {
        const data: PrintfulProductApiResponse = await fetchPrintfulData(`/store/products/${id}`);
        // console.log(data.result.sync_variants);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
