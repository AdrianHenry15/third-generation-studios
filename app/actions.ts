"use server";

import stripe from "@/lib/stripe";
import { CartItem } from "@/stores/cart-store";
import { ICity, IState } from "country-state-city";

export interface Metadata {
    order_number: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    clerk_user_id: string;
    // Shipping
    customer_apartment_no: string;
    customer_address: string;
    customer_zip_code: string;
    customer_state: IState | null;
    customer_city: ICity | null;
    customer_country: string;
}

export type GroupedCartItem = {
    product: CartItem["product"];
    quantity: number;
};

export async function createCheckoutSession(items: GroupedCartItem[], metadata: Metadata) {
    try {
        const stripeMetadata = {
            order_number: metadata.order_number,
            customer_name: metadata.customer_name,
            customer_email: metadata.customer_email,
            clerk_user_id: metadata.clerk_user_id,
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

        // // Create the Printful order
        // const printfulOrderData: PrintfulOrderRequest = {
        //     recipient: {
        //         name: metadata.customer_name,
        //         address1: "123 Main Street", // Replace with actual address
        //         city: "Example City", // Replace with actual city
        //         state_code: "CA", // Replace with actual state code
        //         country_code: "US", // Replace with actual country code
        //         zip: "90001", // Replace with actual ZIP code
        //     },
        //     items: items.map((item) => ({
        //         variant_id: item.product.product.variant_id, // Ensure this maps correctly to Printful
        //         quantity: item.quantity,
        //         files: [], // Populate with relevant file data if applicable
        //     })),
        //     packing_slip: {
        //         email: metadata.customer_email,
        //         phone: metadata.customer_phone,
        //         message: "Thank you for your order!",
        //         logo_url: Logo.src, // Use the source of the imported logo
        //     },
        // };

        // await createPrintfulData("/orders", printfulOrderData);

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
            custom_text: {
                shipping_address: {
                    message: `
                        ${metadata.customer_address} 
                        ${metadata.customer_apartment_no} 
                        ${metadata.customer_city} 
                        ${metadata.customer_state} 
                        ${metadata.customer_zip_code} 
                        ${metadata.customer_country}`,
                },
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
