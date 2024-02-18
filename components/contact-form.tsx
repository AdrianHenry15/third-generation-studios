"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

import Logo from "../public/logos/thirdgenstudios-logo.png";

import ConfirmationModal from "./modals/confirmation-modal";
import SuccessModal from "./modals/success-modal";
import { Loader } from "./loader";
import Button from "./button";
import Dropdown from "./inputs/dropdown";
import Input from "./inputs/input";
import Textarea from "./inputs/textarea";
import { LicensePackageType, WebsitePricingData } from "@/lib/pricing-data";

const ContactForm = () => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();

    const [inputClicked, setInputClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const InputClass = "border-2 border-gray-400 my-2 p-2 rounded-sm w-full shadow-md";

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsOpen(true);
        console.log(data);
    };

    const confirmEstimate = () => {
        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("Your estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your estimate. Please try again.");
                console.log("FAILED...", error);
            }
        );
        // close modal
        setIsOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };

    //EMAIL JS
    const templateParams = {
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        phone: getValues("phone"),
        email: getValues("email"),
        address: getValues("address"),
        service: getValues("package"),
        serviceType: getValues("packageType"),
        comment: getValues("comment"),
    };

    return (
        <section className="flex flex-col items-center py-20 shadow-inner relative w-full md:px-4">
            {isOpen && <ConfirmationModal confirmEstimate={confirmEstimate} isOpen={isOpen} closeModal={() => setIsOpen(false)} />}
            {estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />}
            {loading ? <Loader /> : null}
            <h1 className="text-3xl mb-10 font-light animate-bounce">{`${
                pathname === "/contact-us" ? "Contact Us" : "Get Your Free Estimate!"
            }`}</h1>
            {/* FORM CONTAINER */}
            <div className="flex flex-col w-11/12 bg-white p-6 rounded-2xl shadow-red-600 shadow-lg border-2 md:w-[650px]">
                {/* LOGO */}
                <div className="flex justify-center my-2">
                    <Image loading="eager" width={200} src={Logo} alt="Brite Logo" />
                </div>
                {/* FORM */}
                <form className="self-center w-full md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    {/* FIRST NAME */}
                    <Input
                        inputName={"firstName"}
                        inputLabel={"First Name"}
                        placeholder={"First Name*"}
                        control={control}
                        errors={errors}
                        errorPatternText="First Name is required."
                    />
                    {/* LAST NAME */}
                    <Input
                        inputName={"lastName"}
                        inputLabel={"Last Name"}
                        placeholder={"Last Name*"}
                        control={control}
                        errorPatternText="Last Name is required."
                    />
                    {/* PHONE NUMBER */}
                    <Input
                        inputName={"phoneNumber"}
                        inputLabel={"Phone Number"}
                        placeholder={"Phone Number*"}
                        control={control}
                        errors={errors}
                        errorPatternText={"Phone Number is not valid."}
                    />
                    {/* EMAIL */}
                    <Input
                        inputName={"email"}
                        inputLabel={"Email"}
                        placeholder={"Email*"}
                        control={control}
                        errors={errors}
                        errorRequiredText={"Email is Required."}
                        errorPatternText={"Email is not valid."}
                    />
                    {/* PACKAGE TYPE */}
                    <Dropdown
                        inputName={"packageType"}
                        inputLabel={"Choose Package Type:"}
                        control={control}
                        errors={errors}
                        options={LicensePackageType}
                        errorText="Package Type is required."
                    />
                    {/* PACKAGE */}
                    <Dropdown
                        inputName={"package"}
                        inputLabel={"Choose Package:"}
                        control={control}
                        errors={errors}
                        options={WebsitePricingData}
                        errorText="Package is required."
                    />
                    {/* COMMENT */}
                    <Textarea inputName={"comment"} inputLabel={"Comment"} placeholder={"Comment"} control={control} />
                    <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                        <Button
                            onClick={() => {}}
                            submit
                            name={`${pathname === "/contact-us" ? "Contact Us" : "Get Your Free Estimate"}`}
                            className="w-full justify-center"
                        ></Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
