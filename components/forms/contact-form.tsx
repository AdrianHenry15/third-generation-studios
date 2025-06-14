"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePathname } from "next/navigation";

import Logo from "@/public/logos/tgs-logo.png";
import { toast } from "react-hot-toast";
import { Loader } from "../loader";
import Dropdown from "./components/dropdown";
import Input from "./components/input";
import sendEmail, { sendConfirmationEmail } from "@/lib/email-service";
import Textarea from "../inputs/textarea";
import AuthorizationCheckbox from "./components/authorization-checkbox";
import StatusModal from "../modals/status-modal";

// Available plan options
const PLAN_OPTIONS = ["Studio Basic", "Studio Plus", "Studio Pro", "Studio Commerce"];

type FormValues = {
    name: string;
    email: string;
    plan: string;
    productDescription: string;
    authorization: boolean;
};

const ContactFormOverlay = () => {
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            plan: "",
            productDescription: "",
            authorization: true,
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);

        const templateParams = {
            name: data.name,
            email: data.email,
            plan: data.plan,
            productDescription: data.productDescription,
        };

        try {
            const response = await sendEmail(templateParams);
            console.log("sendEmail response:", response);
            if (response.success) {
                // Send confirmation email to the user
                await sendConfirmationEmail(templateParams);
                toast.success("Your estimate has been submitted successfully!");
                setSuccessModal(true);
                reset();
            } else {
                toast.error("There was an error submitting your estimate. Please try again.");
                setErrorModal(true);
                reset();
            }
        } catch (error) {
            console.error(error);
            setErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact-form-overlay"
            className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        >
            {loading && <Loader />}

            {/* Success Modal */}
            {successModal && (
                <StatusModal
                    title="Request Submitted Successfully!"
                    description="Thank you for your submission. We'll get back to you shortly."
                    isOpen={successModal}
                    closeModal={() => setSuccessModal(false)}
                    status="success"
                    buttonText="Got it, thanks!"
                />
            )}

            {/* Error Modal */}
            {errorModal && (
                <StatusModal
                    title="Submission Failed"
                    description="There was an error processing your request. Please try again."
                    isOpen={errorModal}
                    closeModal={() => setErrorModal(false)}
                    status="error"
                    buttonText="Try Again"
                />
            )}

            <div className="w-full py-12 max-w-md lg:max-w-lg">
                <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/20 p-8">
                    {/* Decorative elements */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

                    {/* Logo and heading */}
                    <div className="flex flex-col items-center mb-8 relative z-10">
                        <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-sm">
                            <Image loading="eager" width={60} height={60} src={Logo} alt="Studio Logo" className="drop-shadow-glow" />
                        </div>
                        <h1 className="text-3xl font-light text-white text-center mb-2">
                            {pathname === "/contact-us" ? "Contact Us" : "Start Your Studio Journey"}
                        </h1>
                        <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                        {/* Name Field */}
                        <Input
                            inputName="name"
                            inputLabel="Name"
                            placeholder="Your full name"
                            control={control}
                            errors={errors}
                            validationRules={{ required: "Name is required" }}
                        />

                        {/* Email Field */}
                        <Input
                            inputName="email"
                            inputLabel="Email"
                            placeholder="Your email address"
                            control={control}
                            errors={errors}
                            validationRules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            }}
                        />

                        {/* Plan Selection */}
                        <Dropdown
                            inputName="plan"
                            inputLabel="Choose Your Plan"
                            control={control}
                            errors={errors}
                            options={PLAN_OPTIONS}
                            textColor="light"
                        />

                        {/* Product Description */}
                        <Textarea
                            inputName="productDescription"
                            inputLabel="Product Description"
                            placeholder="Briefly describe your product or service"
                            control={control}
                        />

                        {/* Authorization Checkbox */}
                        <AuthorizationCheckbox
                            inputName="authorization"
                            control={control}
                            validationRules={{ required: "Authorization is required" }}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-6 text-white font-medium rounded-lg
                         bg-gradient-to-r from-green-300 to-green-500 hover:from-green-700 hover:to-green-600
                         transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                         shadow-lg shadow-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactFormOverlay;
