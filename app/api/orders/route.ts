import { fetchPrintfulData } from "@/lib/helpers/printful/fetch-printful-data";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await fetchPrintfulData("/orders");
        // console.log(data);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
