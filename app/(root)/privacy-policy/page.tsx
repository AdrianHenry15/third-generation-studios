import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Brite Exterior Cleaning Services",
    description:
        "Read Brite Exterior Cleaning's privacy policy to learn how we collect, use, and protect your personal information when using our services.",
    openGraph: {
        title: "Privacy Policy | Brite Exterior Cleaning Services",
        description:
            "Learn about how Brite Exterior Cleaning collects, uses, and protects your personal information in accordance with our privacy policy.",
        url: "https://briteclt.com/privacy-policy",
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Brite Exterior Cleaning Services",
        description:
            "Learn about how Brite Exterior Cleaning collects, uses, and protects your personal information in our privacy policy.",
    },
};

const PrivacyPolicyPage = () => {
    return (
        <article className="flex flex-col justify-start px-4 py-10 md:p-10">
            {/* PRIVACY POLICY */}
            <section id="privacy-policy">
                <h1 className="font-bold text-5xl pb-10">Privacy Policy</h1>
                <div className="flex items-center">
                    <strong className="mr-2">Effective Date:</strong>
                    <p>04/25/2024</p>
                </div>
                <p className="">
                    Brite Lighting LLC: DBA Brite Exterior Services ("we," "us," or "our") is
                    committed to protecting the privacy of our customers ("you" or "your"). This
                    Privacy Policy explains how we collect, use, disclose, and protect your
                    information when you engage with us through text messages, phone calls, and
                    emails. By using our services, you consent to the practices described in this
                    Privacy Policy.
                </p>
            </section>
            {/* INFORMATION WE COLLECT  */}
            <section className="flex flex-col" id="information-we-collect">
                <h5 className="font-bold my-10 text-xl">1. Information We Collect</h5>
                <p className=" mb-10">
                    We may collect the following types of information from you:
                </p>
                {/* PERSOANL INFORMATION */}
                <div className="flex flex-col mb-4 " id="personal-information">
                    <h3 className="font-bold my-4 text-lg">1.1 Personal Information:</h3>
                    <ul className="ml-10">
                        <li>
                            <strong className="mr-2">Contact Information:</strong>
                            <p>- Name, phone number, email address, and mailing address.</p>
                        </li>
                    </ul>
                </div>
                {/* USAGE INFORMATION */}
                <div className="flex flex-col " id="usage-information">
                    <h3 className="font-bold mb-4 text-lg">1.2 Usage Information:</h3>
                    <ul className="ml-10">
                        <li>
                            <strong>Interaction Data:</strong>
                            <p>
                                - Details about how you interact with our communications, including
                                date, time, and content of text messages, phone calls, and emails.
                            </p>
                        </li>
                        <li>
                            <strong>Device Information:</strong>
                            <p>
                                - Information about the device you use to communicate with us, such
                                as your phone's operating system, browser type, and IP address.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
            {/* HOW WE USE YOUR INFORMATION */}
            <section id="how-we-use-your-information">
                <h5 className="font-bold my-10 text-xl">2. How We Use Your Information</h5>
                <p className=" my-10">
                    We use the information we collect for the following purposes:
                </p>
                {/* COMMUNICATION */}
                <div className="flex flex-col ">
                    <h3 className="font-bold mb-4 text-lg">2.1 Communication</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - To send you updates, promotional offers, and other information via
                                text, phone call, or email based on your preferences.
                            </p>
                        </li>
                        <li>
                            <p> - To respond to your inquiries and provide customer support.</p>
                        </li>
                    </ul>
                </div>
                {/* PERSONALIZATION */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">2.2 Personalization</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - To tailor our communications and offers to your interests and
                                preferences.
                            </p>
                        </li>
                    </ul>
                </div>
                {/* COMPLIANCE */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">2.3 Compliance</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - To comply with legal obligations and enforce our terms and
                                conditions.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
            {/* HOW WE SHARE YOUR INFORMATION */}
            <section>
                <h5 className="font-bold my-10 text-xl">3. How We Share Your Information</h5>
                <p className=" mb-10">We may share your information with:</p>
                {/* SERVICE PROVIDERS */}
                <div className="flex flex-col ">
                    <h3 className="font-bold mb-4 text-lg">3.1 Service providers</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - Third-party vendors who assist us in delivering our services,
                                including communication platforms, analytics providers, and
                                marketing partners.
                            </p>
                        </li>
                    </ul>
                </div>
                {/* LEGAL OBLIGATIONS */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">3.2 Legal Obligations</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - When required by law, or to protect the rights, property, or
                                safety of [Company Name], our customers, or others.
                            </p>
                        </li>
                    </ul>
                </div>
                {/* BUSINESS TRANSFERS */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">3.3 Business Transfers</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - In connection with a merger, acquisition, or sale of all or part
                                of our assets.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
            {/* YOUR CHOICES */}
            <section id="your-choices">
                <h5 className="font-bold my-10 text-xl">4. Your Choices</h5>
                {/* OPT OUT */}
                <div className="flex flex-col ">
                    <h3 className="font-bold mb-4 text-lg">4.1 Opt-Out:</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - You can opt out of receiving promotional communications from us at
                                any time by following the instructions in those communications or by
                                contacting us directly.
                            </p>
                        </li>
                    </ul>
                </div>
                {/* ACCESS AND CORRECTION */}
                <div className="flex flex-col">
                    <h3 className="font-bold my-4 text-lg">4.2 Access and Correction:</h3>
                    <ul className="ml-10">
                        <li>
                            <p>
                                - You have the right to access, correct, or delete your personal
                                information. To exercise these rights, please contact us using the
                                information provided below.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
            {/* SECURITY */}
            <section className="" id="security">
                <h5 className="font-bold my-4 text-xl">5. Security</h5>
                <p>
                    We take reasonable measures to protect your information from unauthorized
                    access, use, or disclosure. However, no method of transmission over the Internet
                    or method of electronic storage is 100% secure, and we cannot guarantee absolute
                    security.
                </p>
            </section>
            {/* CHILDRENS PRIVACY */}
            <section className="" id="childrens-privacy">
                <h5 className="font-bold my-4 text-xl">6. Children's Privacy</h5>
                <p>
                    Our services are not intended for individuals under the age of 13, and we do not
                    knowingly collect personal information from children under 13. If we become
                    aware that we have collected such information, we will take steps to delete it.
                </p>
            </section>
            {/* CHANGES TO THIS PRIVACY POLICY */}
            <section className="" id="changes-to-this-privacy-policy">
                <h5 className="font-bold my-4 text-xl">7. Changes to This Privacy Policy</h5>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any
                    significant changes by posting the new Privacy Policy on our website and, where
                    appropriate, contacting you directly.
                </p>
            </section>
            {/* CONTACT US */}
            <section className="" id="contact-us">
                <h5 className="font-bold my-4 text-xl">8. Contact Us</h5>
                <p className="mb-4">
                    If you have any questions or concerns about this Privacy Policy or our
                    practices, please contact us at:
                </p>
                <div className="flex flex-col">
                    <p>Brite Exterior Services</p>
                    <address>10130 Mallard Creek Rd. Suite 300 Charlotte, NC 28262</address>
                    <Link
                        className="underline underline-offset-2 text-blue-500"
                        href={"nick.walker@briteclt.com"}
                    >
                        nick.walker@briteclt.com
                    </Link>
                    <Link className="underline underline-offset-2" href={"tel:7048423535"}>
                        704-842-3535
                    </Link>
                </div>
            </section>
        </article>
    );
};

export default PrivacyPolicyPage;
