import { users } from "@clerk/clerk-sdk-node"; // For fetching user data
import Stripe from "stripe";
import stripe from "../stripe";
import { printfulClient } from "./client";

export async function createPrintfulOrder(session: Stripe.Checkout.Session) {
    const { id, amount_total, currency, metadata, total_details } = session;

    // Recipient metadata fields
    const orderNumber = metadata?.order_number ?? "";
    const customerPhone = metadata?.customer_phone ?? "";
    const customerEmail = metadata?.customer_email ?? "";
    const clerkUserId = metadata?.clerk_user_id ?? "";
    // Shipping metadata fields
    const customerAddress = metadata?.customer_address ?? "";
    const customerApartmentNo = metadata?.customer_apartment_no ?? "";
    const customerZipCode = metadata?.customer_zip_code ?? "";
    const customerState = metadata?.customer_state ?? "";
    const customerCity = metadata?.customer_city ?? "";

    // Ensure that address1 is provided
    if (!customerAddress) {
        throw new Error("Address line 1 cannot be blank.");
    }

    // Retrieve line items with expanded product data
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, { expand: ["data.price.product"] });
    // console.log(lineItemsWithProduct.data[0].price?.metadata);

    // Map line items to match Printful items object structure
    const printfulProducts = await Promise.all(
        lineItemsWithProduct.data.map(async (item) => {
            const product = item.price?.product as Stripe.Product;
            const variantId = parseInt(product?.metadata.variant_id || "0", 10);

            // Check if the variant ID is valid
            if (!variantId || variantId <= 0) {
                throw new Error("Product variant ID is invalid.");
            }

            return {
                variant_id: variantId, // Ensure a valid variant ID
                quantity: item.quantity || 0, // Default quantity to 0 if undefined
                files: [
                    {
                        url: product.metadata.file_url,
                        options: [
                            {
                                id: "auto_thread_color",
                                value: true,
                            },
                        ],
                    },
                ],
            };
        })
    );

    // Fetch user data from Clerk using clerkUserId
    let user;
    try {
        user = await users.getUser(clerkUserId);
    } catch (error) {
        console.error("Error fetching user from Clerk:", error);
        throw new Error("User not found in Clerk.");
    }

    if (!user) {
        throw new Error("User not found.");
    }

    const recipient = {
        name: `${user.firstName} ${user.lastName}`,
        address1: customerAddress.toString(),
        address2: customerApartmentNo,
        city: customerCity,
        state_code: customerState,
        country_code: "US",
        zip: customerZipCode,
        phone: `${user.phoneNumbers[0].phoneNumber}`,
    };
    // Prepare the Printful order payload
    const orderPayload = {
        recipient,
        items: printfulProducts,
        packing_slip: {
            phone: customerPhone,
            email: customerEmail,
            message: `Order #${orderNumber}`,
        },
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toDateString(),
        currency,
        discount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    };

    // Send the request to Printful API to create the order
    try {
        const response = await printfulClient.post("/orders", orderPayload);
        // console.log("Printful Order Created:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Printful API Error:", error.response?.data || error.message);
        throw new Error("Failed to create Printful order");
    }
}
