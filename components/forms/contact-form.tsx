"use client";

import Image from "next/image";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePathname } from "next/navigation";

import Logo from "@/public/logos/glowCircle-trans.png";

import ConfirmationModal from "../modals/confirmation-modal";
import SuccessModal from "../modals/success-modal";
import { Loader } from "../loader";
import Dropdown from "./components/dropdown";
import Input from "./components/input";
import sendEmail from "@/lib/email-service";
import { ReferralSources } from "@/lib/constants";
import Textarea from "../inputs/textarea";
import AuthorizationCheckbox from "./components/authorization-checkbox";

type FormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comment: string;
    referralSource: string;
};

const ContactFormOverlay = () => {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [estimateFail, setEstimateFail] = useState(false);
    const [loading, setLoading] = useState(false);

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY as string;
    const PRIVATE_KEY = process.env.NEXT_PRIVATE_EMAILJS_KEY as string;

    const {
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);

        setIsOpen(true); // Show confirmation modal

        setLoading(false);
    };

    const confirmEstimate = () => {
        setLoading(true);

        const templateParams = {
            firstName: getValues("firstName"),
            lastName: getValues("lastName"),
            phone: getValues("phone"),
            email: getValues("email"),
            comment: getValues("comment"),
            referralSource: getValues("referralSource"),
        };

        sendEmail(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY, PRIVATE_KEY)
            .then(({ success }) => {
                setEstimateSuccess(success);
                setEstimateFail(!success);
                setIsOpen(false); // Close confirmation modal
            })
            .catch(() => setEstimateFail(true))
            .finally(() => setLoading(false));
    };

    return (
        <section id="contact-form-overlay" className="flex flex-col items-center text-white px-4 py-20 relative w-full">
            {isOpen && <ConfirmationModal confirmEstimate={confirmEstimate} isOpen={isOpen} closeModal={() => setIsOpen(false)} />}
            {estimateSuccess && (
                <SuccessModal
                    title="Estimate Request Successful"
                    description="Your Estimate Request has been successfully submitted."
                    isOpen={estimateSuccess}
                    closeModal={() => setEstimateSuccess(false)}
                />
            )}
            {estimateFail && (
                <SuccessModal
                    title="Estimate Request Failed"
                    description="Your Estimate Request submission failed. Please try again."
                    isOpen={estimateFail}
                    closeModal={() => setEstimateFail(false)}
                />
            )}
            {loading && <Loader />}
            <h1 className="text-3xl mb-10 font-light animate-bounce">
                {pathname === "/contact-us" ? "Contact Us" : "Get Your Free Consultation!"}
            </h1>
            <div className="flex flex-col w-full p-6 rounded-2xl shadow-blue-600 shadow-lg border-2 md:w-[850px]">
                <div className="flex justify-center">
                    <Image loading="eager" width={100} src={Logo} alt="tgs-logo" />
                </div>
                <form className="self-center w-full md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="font-semibold text-lg text-black mb-2 underline">Contact Info</h5>
                    <Input
                        inputName="firstName"
                        inputLabel="First Name"
                        placeholder="First Name*"
                        control={control}
                        errors={errors}
                        validationRules={{ required: "First Name is required" }}
                    />
                    <Input
                        inputName="lastName"
                        inputLabel="Last Name"
                        placeholder="Last Name*"
                        control={control}
                        errors={errors}
                        validationRules={{ required: "Last Name is required" }}
                    />
                    <Input
                        inputName="phone"
                        inputLabel="Phone Number"
                        placeholder="Phone Number*"
                        control={control}
                        errors={errors}
                        validationRules={{ required: "Phone number is required" }}
                    />
                    <Input
                        inputName="email"
                        inputLabel="Email"
                        placeholder="Email*"
                        control={control}
                        errors={errors}
                        validationRules={{ required: "Email is required" }}
                    />
                    <Input
                        inputName="address"
                        inputLabel="Address"
                        placeholder="Address*"
                        control={control}
                        errors={errors}
                        validationRules={{ required: "Address is required" }}
                    />

                    <Dropdown
                        inputName="referralSource"
                        inputLabel="How Did You Hear About Us?"
                        control={control}
                        errors={errors}
                        options={ReferralSources}
                        textColor="light"
                    />
                    <Textarea inputName="comment" inputLabel="Comment" placeholder="Comment" control={control} />
                    <AuthorizationCheckbox inputName="authorization" control={control} />
                    <Button type="submit" variant="contained" color="primary" className="bg-blue-500" fullWidth sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default ContactFormOverlay;
