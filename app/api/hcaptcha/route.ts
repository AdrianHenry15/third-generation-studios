import { NextRequest, NextResponse } from "next/server";
import { verifyHCaptcha } from "@/lib/verify-hcaptcha";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        if (!token) {
            return NextResponse.json({ success: false, error: "Missing hCaptcha token." }, { status: 400 });
        }

        const data = await verifyHCaptcha(token);

        if (data.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: data["error-codes"] || "Verification failed." }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
    }
}
