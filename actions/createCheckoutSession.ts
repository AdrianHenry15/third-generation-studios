"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { CartItem } from "@/stores/cart-store";
import { fetchPrintfulData, printfulClient } from "@/lib/printful-service";

export interface Metadata {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export type GroupedCartItem = {
    product: CartItem["product"];
    quantity: number;
};

export async function createCheckoutSession(items: GroupedCartItem[], metadata: Metadata) {
    try {
        const stripeMetadata = {
            orderNumber: metadata.orderNumber,
            customerName: metadata.customerName,
            customerEmail: metadata.customerEmail,
            clerkUserId: metadata.clerkUserId,
        };

        const itemsWithoutPrice = items.filter((item) => !item.product.retail_price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price");
        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });

        let customerId: string | undefined;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

        const baseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : `${process.env.NEXT_PUBLIC_BASE_URL}`;

        const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
        const cancelUrl = `${baseUrl}/basket`;

        console.log("SUCCESS URL <<<<<", successUrl);
        console.log("CANCEL URL <<<<<", cancelUrl);

        const lineItems = await Promise.all(
            items.map(async (item) => {
                const printfulProductData = await fetchPrintfulData(`/products/${item.product.id}`);
                const image = item.product.product.image
                    ? await imageUrl(item.product.product.image)
                    : printfulProductData?.result?.thumbnail_url || undefined;

                return {
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(parseInt(item.product.retail_price!) * 100),
                        product_data: {
                            name: item.product.name || printfulProductData?.result?.name || "Unnamed Product",
                            description: `Product ID: ${item.product.id}`,
                            images: image ? [image] : undefined,
                        },
                    },
                    quantity: item.quantity,
                };
            })
        );

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata: stripeMetadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: lineItems,
        });

        console.log("Creating Printful Order...");
        const printfulOrderData = {
            recipient: {
                name: metadata.customerName,
                email: metadata.customerEmail,
            },
            items: items.map((item) => ({
                sync_variant_id: item.product.id, // Ensure `printfulVariantId` exists in your product model
                quantity: item.quantity,
            })),
            external_id: metadata.orderNumber, // Use the order number for tracking
        };

        const printfulOrderResponse = await printfulClient.post("/orders", printfulOrderData);

        console.log("Printful Order Created:", printfulOrderResponse.data);

        return session.url;
    } catch (error) {
        console.error("Error creating checkout session or Printful order:", error);
        throw error;
    }
}
