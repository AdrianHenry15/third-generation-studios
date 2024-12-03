"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

import Logo from "../public/logos/glowCircle-trans.png";

import ConfirmationModal from "./modals/confirmation-modal";
import SuccessModal from "./modals/success-modal";
import { Loader } from "./loader";
import Button from "./button";
import Dropdown from "./inputs/dropdown";
import Input from "./inputs/input";
import Textarea from "./inputs/textarea";
import { Plans } from "@/lib/constants";

const ContactForm = () => {
    // SWITCH BETWEEN CONTACT AND Consultation FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();
    const { user, isSignedIn } = useUser();

    const [inputClicked, setInputClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [consultationSuccess, setConsultationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phone: user?.primaryPhoneNumber?.phoneNumber || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
            comment: "",
            plan: "",
        },
    });

    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsOpen(true);
        console.log(data);
    };

    const confirmConsultation = () => {
        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("Your Consultation has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your Consultation. Please try again.");
                console.log("FAILED...", error);
            }
        );
        // close modal
        setIsOpen(false);
        setTimeout(() => {
            // open success modal
            setConsultationSuccess(true);
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
        plan: getValues("plan"),
        comment: getValues("comment"),
    };

    return (
        <section className="flex flex-col items-center py-20 shadow-inner relative w-full md:px-4">
            {isOpen && (
                <ConfirmationModal
                    loading={loading}
                    confirmConsultation={confirmConsultation}
                    isOpen={isOpen}
                    closeModal={() => setIsOpen(false)}
                />
            )}
            {consultationSuccess && <SuccessModal isOpen={consultationSuccess} closeModal={() => setConsultationSuccess(false)} />}
            {loading ? <Loader /> : null}
            <h1 className="text-3xl text-white mb-10 font-light animate-bounce">{`${
                pathname === "/contact-us" ? "Contact Us" : "Get Your Free Consultation!"
            }`}</h1>
            {/* FORM CONTAINER */}
            <div className="flex flex-col w-11/12 bg-black p-6 rounded-2xl shadow-white shadow-lg border-2 md:w-[650px]">
                {/* LOGO */}
                <div className="flex justify-center my-10">
                    <Image loading="eager" width={150} src={Logo} alt="Brite Logo" />
                </div>
                {/* FORM */}
                <form className="self-center w-full md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    {/* FIRST NAME */}
                    <Input
                        inputName={"firstName"}
                        inputLabel={"First Name"}
                        placeholder={"First Name*"}
                        defaultValue={isSignedIn ? user.firstName! : ""}
                        control={control}
                        errors={errors}
                        errorPatternText="First Name is required."
                    />
                    {/* LAST NAME */}
                    <Input
                        inputName={"lastName"}
                        inputLabel={"Last Name"}
                        placeholder={"Last Name*"}
                        defaultValue={isSignedIn ? user.lastName! : ""}
                        control={control}
                        errorPatternText="Last Name is required."
                    />
                    {/* PHONE NUMBER */}
                    <Input
                        inputName={"phone"}
                        inputLabel={"Phone Number"}
                        placeholder={"Phone Number*"}
                        defaultValue={isSignedIn ? user.primaryPhoneNumber?.phoneNumber : ""}
                        control={control}
                        errors={errors}
                        errorPatternText={"Phone Number is not valid."}
                    />
                    {/* EMAIL */}
                    <Input
                        inputName={"email"}
                        inputLabel={"Email"}
                        placeholder={"Email*"}
                        defaultValue={isSignedIn ? user?.primaryEmailAddress?.emailAddress : ""}
                        control={control}
                        errors={errors}
                        errorRequiredText={"Email is Required."}
                        errorPatternText={"Email is not valid."}
                    />
                    {/* PACKAGE */}
                    <Dropdown
                        inputName={"plan"}
                        inputLabel={"Choose Plan:"}
                        control={control}
                        errors={errors}
                        options={Plans}
                        errorText="Plan is required."
                    />
                    {/* COMMENT */}
                    <Textarea inputName={"comment"} inputLabel={"Comment"} placeholder={"Comment"} control={control} />
                    <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                        <Button
                            onClick={() => setInputClicked(true)}
                            submit
                            name={`${pathname === "/contact-us" ? "Contact Us" : "Get Your Free Consultation"}`}
                            className="w-full justify-center"
                        ></Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
