import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    try {
        const { email, unsubscribed = false } = await req.json();
        console.log("[Newsletter API] Incoming data:", { email, unsubscribed });
        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
        }
        const apiKey = process.env.RESEND_API_KEY as string;
        const audienceId = process.env.RESEND_AUDIENCE_ID as string;
        console.log("[Newsletter API] ENV:", { apiKey: !!apiKey, audienceId });
        if (!apiKey) {
            return NextResponse.json({ success: false, error: "Resend API key not configured." }, { status: 500 });
        }
        if (!audienceId) {
            return NextResponse.json({ success: false, error: "Newsletter list ID not configured." }, { status: 500 });
        }

        const resend = new Resend(apiKey);
        const result = await resend.contacts.create({
            email,
            unsubscribed,
            audienceId,
        });
        console.log("[Newsletter API] Resend result:", result);
        if (result.error) {
            return NextResponse.json({ success: false, error: result.error }, { status: 400 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Newsletter API] Caught error:", error);
        return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
    }
}
