import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/helpers/stripe";
import Stripe from "stripe";
import { createPrintfulOrder } from "@/lib/helpers/printful/create-printful-order";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log("Stripe webhook secret is not set");
        return NextResponse.json({ error: "Stripe webhook secret is not set" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verifcation failed:", err);
        return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            await createPrintfulOrder(session);
            console.log("Order created in Printful");
        } catch (err) {
            console.error("Error creating order in Printful:", err);
            return NextResponse.json({ error: "Error creating order" }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
