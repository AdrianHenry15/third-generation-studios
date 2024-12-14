"use client";

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { createCheckoutSession, StripeMetadata } from "@/app/actions";
import { Loader } from "@/components/loader";
import useCartStore from "@/stores/cart-store";
import ShippingModal from "./components/shipping-modal";
import useShippingStore from "@/stores/shipping-store";
import SelectProductModal from "./components/selected-product-modal";
import CartItem from "./components/cart-item";

const CartPage = () => {
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const { state, city, zip_code, address, apartment_no } = useShippingStore();

    const { isSignedIn } = useAuth();
    const { user } = useUser();

    // State
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Wait for client to mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true);

        try {
            const StripeMetadata: StripeMetadata = {
                order_number: crypto.randomUUID(),
                customer_name: user?.fullName ?? "Guest",
                customer_email: user?.emailAddresses[0]?.emailAddress ?? "Guest",
                customer_phone: user?.phoneNumbers[0]?.phoneNumber ?? "Guest",
                customer_country: "US",
                customer_state: state?.isoCode || "",
                customer_city: city?.name || "",
                customer_zip_code: zip_code,
                customer_address: address,
                customer_apartment_no: apartment_no,
                clerk_user_id: user!.id,
            };

            const checkoutUrl = await createCheckoutSession(groupedItems, StripeMetadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isClient) {
        return <Loader />;
    }

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
                <p className="text-gray-600 text-lg">Your cart is empty.</p>
            </div>
        );
    }

    // console.log(groupedItems);
    return (
        <div className="container mx-auto p-4 max-w-6xl pb-48">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-grow">
                    {groupedItems.map((item) => (
                        <>
                            <CartItem openModal={() => setIsModalOpen(true)} item={item} key={item.product.id} />
                            {isModalOpen && (
                                <SelectProductModal item={item} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                            )}
                        </>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full z-20 lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <div className="mt-4 space-y-2">
                        <p className="justify-between flex w-full">
                            <span>Items:</span>
                            <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
                        </p>
                        <p className="flex justify-between text-2xl font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>${useCartStore.getState().getTotalPrice().toFixed(2)}</span>
                        </p>
                    </div>
                    {isSignedIn ? (
                        <button
                            onClick={() => setIsShippingModalOpen(true)}
                            disabled={isLoading}
                            className="mt-4 w-full bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 disabled:bg-gray-400"
                        >
                            {isLoading ? "Processing..." : "Enter Shipping Information"}
                        </button>
                    ) : (
                        <SignInButton fallbackRedirectUrl={"/cart"} mode="modal">
                            <button className="mt-4 w-full bg-black text-white px-4 py-2 rounded hover:bg-zinc-800">
                                Sign in to Checkout
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>

            {/* Shipping Modal */}
            {isShippingModalOpen && (
                <ShippingModal isModalOpen={isShippingModalOpen} setIsModalOpen={setIsShippingModalOpen} handleCheckout={handleCheckout} />
            )}
        </div>
    );
};

export default CartPage;
