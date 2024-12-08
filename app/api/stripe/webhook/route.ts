// /app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe";

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature")!;
    const payload = await req.text();

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);

        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            // Example: Perform some post-checkout action
            console.log("Checkout completed for session:", session.id);

            // Perform additional tasks like:
            // - Sending a confirmation email
            // - Updating database records
            // - Triggering fulfillment logic
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("Webhook error:", err);
        return NextResponse.json({ error: "Webhook handler failed." }, { status: 400 });
    }
}
