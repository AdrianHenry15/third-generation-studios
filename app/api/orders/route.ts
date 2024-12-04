import { NextResponse } from "next/server";
import { createPrintfulOrder } from "@/lib/printful-service";

export async function POST(request: Request) {
    const orderData = await request.json();

    try {
        const order = await createPrintfulOrder(orderData);
        return NextResponse.json({ order });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
