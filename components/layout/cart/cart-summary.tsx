"use client";

import React, { useState } from "react";
import { useCartStore } from "stores/cart-store";
import CartSummaryItem from "./cart-summary-item";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import ConfirmationModal from "@/components/modals/confirmation-modal";

const CartSummary = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { items, getTotalPrice } = useCartStore();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    // Function to send email using EmailJS
    const sendEmail = () => {
        setLoading(true);

        // Prepare template params for EmailJS
        const templateParams = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.primaryEmailAddress,
            phone: user?.primaryPhoneNumber,
            items: items.map((item) => `${item.title} = $${item.price.toFixed(2)}`), // List of items with their titles and prices
            totalItems: items.length, // Total number of items
            totalPrice: `$${getTotalPrice().toFixed(2)}`, // Total price
        };

        // Send email
        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((response) => {
                toast.success("Your email has been sent successfully!");
                console.log("SUCCESS!", response.status, response.text);
            })
            .catch((error) => {
                toast.error("There was an error sending your email. Please try again.");
                console.error("FAILED...", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getBtnText = (): string => {
        // IF LOADING
        if (loading) {
            return "Checking Out...";
        }

        // IF THERE ARE NO ITEMS IN CART
        if (items.length < 1) {
            return "No Items In Cart";
        }

        return "Checkout For Files";
    };

    return (
        <div className="flex flex-col bg-slate-900 h-min p-6 w-full rounded-lg">
            {isOpen && (
                <ConfirmationModal loading={loading} confirmEstimate={sendEmail} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
            )}

            <h5 className="text-white font-semibold text-xl">Cart Summary</h5>
            <div className="flex flex-col w-full h-full">
                {/* Display cart items */}
                {items.length < 1 ? (
                    <div>
                        <h5 className="text-white text-xl text-center pb-4 border-b-[1px] border-zinc-700">Cart is Empty.</h5>
                    </div>
                ) : (
                    items.map((item) => <CartSummaryItem key={item.id} title={item.title} img={item.img} price={item.price} />)
                )}
            </div>
            {/* Display total and button to send email */}
            <div>
                <div className="w-full flex justify-between border-t-[1px] border-zinc-600">
                    <p className="text-white text-lg">Estimate Total: ( {items.length} items )</p>
                    <p className="text-white">${getTotalPrice().toFixed(2)}</p>
                </div>
                <div className="mt-4 w-full text-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`${
                            items.length < 1 ? "bg-red-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                        }  text-white font-bold py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {getBtnText()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
