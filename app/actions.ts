"use server";

import stripe from "@/lib/helpers/stripe";
import { ICartItem } from "@/stores/cart-store";

export interface StripeMetadata {
    order_number: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    clerk_user_id: string;
    // Shipping
    customer_address: string;
    customer_apartment_no: string;
    customer_zip_code: string;
    customer_state: string;
    customer_city: string;
    customer_country: string;
}

export type GroupedCartItem = {
    product: ICartItem["product"];
    quantity: number;
};

export async function createCheckoutSession(items: GroupedCartItem[], metadata: StripeMetadata) {
    try {
        const stripeMetadata = {
            order_number: metadata.order_number,
            customer_name: metadata.customer_name,
            customer_phone: metadata.customer_phone,
            customer_email: metadata.customer_email,
            clerk_user_id: metadata.clerk_user_id,
            // Shipping
            customer_address: metadata.customer_address,
            customer_apartment_no: metadata.customer_apartment_no,
            customer_zip_code: metadata.customer_zip_code,
            customer_state: metadata.customer_state,
            customer_city: metadata.customer_city,
            customer_country: metadata.customer_country,
        };

        const itemsWithoutPrice = items.filter((item) => !item.product.retail_price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price");
        }

        const customers = await stripe.customers.list({
            email: metadata.customer_email,
            limit: 1,
        });

        let customerId: string | undefined;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

        const baseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : `${process.env.NEXT_PUBLIC_BASE_URL}`;

        const successUrl = `${baseUrl}/store/success?session_id={CHECKOUT_SESSION_ID}&order_number=${metadata.order_number}`;
        const cancelUrl = `${baseUrl}/cart`;

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customer_email : undefined,
            metadata: stripeMetadata,
            mode: "payment",
            allow_promotion_codes: true,
            payment_method_types: ["card", "cashapp", "amazon_pay"],
            shipping_address_collection: {
                allowed_countries: ["US"],
            },
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    unit_amount: Math.round(parseInt(item.product.retail_price!) * 100),
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: `Product ID: ${item.product.product.variant_id}`,
                        images: item.product.product.image ? [item.product.product.image] : undefined,
                        metadata: {
                            variant_id: item.product.product.variant_id,
                            file_url: item.product.files[0].thumbnail_url,
                        },
                    },
                },
                quantity: item.quantity,
            })),
        });

        // Return the session URL for Stripe checkout
        return session.url;
    } catch (error) {
        console.error("Error creating checkout session or Printful order:", error);
        throw error;
    }
}
