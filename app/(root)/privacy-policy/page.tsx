import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Third Generation Studios",
    description:
        "Read Third Generation Studios' privacy policy to learn how we collect, use, and protect your information when using our web, media, music, and engineering services.",
    openGraph: {
        title: "Privacy Policy | Third Generation Studios",
        description:
            "Learn how Third Generation Studios collects, uses, and protects your information across our web, media, and music services.",
        url: "https://thirdgenerationstudios.com/privacy-policy",
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Third Generation Studios",
        description: "Review Third Generation Studios' privacy policy covering web, media, and music-related data usage.",
    },
};

const PrivacyPolicyPage = () => {
    return (
        <article className="flex flex-col justify-start px-4 py-10 md:p-10 mt-16">
            {/* PRIVACY POLICY */}
            <section id="privacy-policy">
                <h1 className="font-bold text-5xl pb-10">Privacy Policy</h1>
                <div className="flex items-center">
                    <strong className="mr-2">Effective Date:</strong>
                    <p>04/25/2024</p>
                </div>
                <p>
                    Third Generation Studios (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of
                    our clients and users (&quot;you&quot; or &quot;your&quot;). This Privacy Policy explains how we collect, use, disclose,
                    and protect your information when you engage with us through our website, digital products, music platform,
                    communications, and our engineering services for music, sound, web, software (MVP), and media. By using our services,
                    you consent to the practices described in this Privacy Policy.
                </p>
            </section>

            {/* TECHNOLOGY STACK */}
            <section id="technology-stack">
                <h5 className="font-bold my-10 text-xl">Our Technology Stack</h5>
                <p className="mb-10">
                    Third Generation Studios uses a modern technology stack to deliver our services, including Next.js, TypeScript, Zustand,
                    Supabase, Sanity, Clerk.js, EmailJS, and audio engineering tools. These tools help us build, manage, and secure your
                    projects, and may process or store some of your information as part of our service delivery. For more information about
                    how these providers handle data, please refer to their respective privacy policies.
                </p>
            </section>

            {/* INFORMATION WE COLLECT */}
            <section className="flex flex-col" id="information-we-collect">
                <h5 className="font-bold my-10 text-xl">1. Information We Collect</h5>
                <p className=" mb-10">We may collect the following types of information from you:</p>

                {/* PERSONAL INFORMATION */}
                <div className="flex flex-col mb-4 " id="personal-information">
                    <h3 className="font-bold my-4 text-lg">1.1 Personal Information:</h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            <strong className="mr-2">Contact Information:</strong>
                            Name, company, phone number, email address, and mailing address.
                        </li>
                        <li>
                            <strong className="mr-2">Project Information:</strong>
                            Details about your business, project requirements, and creative or technical needs.
                        </li>
                    </ul>
                </div>

                {/* USAGE INFORMATION */}
                <div className="flex flex-col " id="usage-information">
                    <h3 className="font-bold mb-4 text-lg">1.2 Usage Information:</h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            <strong>Interaction Data:</strong>
                            Details about how you interact with our website, communications, and services, including date, time, and content
                            of messages, calls, and emails.
                        </li>
                        <li>
                            <strong>Device Information:</strong>
                            Information about the device you use to communicate with us, such as your operating system, browser type, and IP
                            address.
                        </li>
                    </ul>
                </div>

                {/* MUSIC & AUDIO DATA */}
                <div className="flex flex-col " id="music-audio-data">
                    <h3 className="font-bold mb-4 text-lg">1.3 Music & Audio Data (For Music Platform Features):</h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            <strong>Uploaded Audio Files:</strong> Songs, instrumentals, vocals, cover art, metadata, and related media you
                            upload.
                        </li>
                        <li>
                            <strong>Listening Activity:</strong> Track plays, playlists, likes, shares, session history, and engagement
                            statistics.
                        </li>
                        <li>
                            <strong>Music Metadata:</strong> Titles, genres, collaborators, lyrics, credits, release details, and ownership
                            or licensing information you provide.
                        </li>
                        <li>
                            <strong>Analytics Data:</strong> Performance insights such as stream counts, listener demographics
                            (non-identifiable), completion rate, skip rate, and trending data.
                        </li>
                    </ul>
                </div>
            </section>

            {/* HOW WE USE YOUR INFORMATION */}
            <section id="how-we-use-your-information">
                <h5 className="font-bold my-10 text-xl">2. How We Use Your Information</h5>
                <p className=" my-10">We use the information we collect for the following purposes:</p>

                {/* COMMUNICATION */}
                <div className="flex flex-col ">
                    <h3 className="font-bold mb-4 text-lg">2.1 Communication</h3>
                    <ul className="ml-10 list-disc">
                        <li>To send you updates, proposals, offers, and service notifications via text, call, or email.</li>
                        <li>To respond to inquiries and provide support.</li>
                    </ul>
                </div>

                {/* PROJECT DELIVERY */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">2.2 Project Delivery</h3>
                    <ul className="ml-10 list-disc">
                        <li>To deliver web, MVP, music, and media engineering services tailored to your needs.</li>
                    </ul>
                </div>

                {/* PERSONALIZATION */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">2.3 Personalization</h3>
                    <ul className="ml-10 list-disc">
                        <li>To tailor services, recommendations, and user experiences.</li>
                    </ul>
                </div>

                {/* MUSIC FEATURES */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">2.4 Music Platform Features</h3>
                    <ul className="ml-10 list-disc">
                        <li>To enable music uploads, streaming, playlists, sharing, credits, and social music features.</li>
                        <li>To provide artists with analytics, insights, and growth tools.</li>
                        <li>To improve music discovery and engagement features.</li>
                    </ul>
                </div>

                {/* COMPLIANCE */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">2.5 Compliance</h3>
                    <ul className="ml-10 list-disc">
                        <li>To comply with legal obligations and enforce our terms.</li>
                    </ul>
                </div>
            </section>

            {/* HOW WE SHARE YOUR INFORMATION */}
            <section>
                <h5 className="font-bold my-10 text-xl">3. How We Share Your Information</h5>
                <p className=" mb-10">We may share your information with:</p>

                {/* SERVICE PROVIDERS */}
                <div className="flex flex-col ">
                    <h3 className="font-bold mb-4 text-lg">3.1 Service Providers</h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            Third-party vendors who assist with hosting, storage, audio processing, analytics, payment processing (if
                            applicable), and marketing services.
                        </li>
                    </ul>
                </div>

                {/* MUSIC SHARING */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">3.2 Artist & Music Sharing</h3>
                    <ul className="ml-10 list-disc">
                        <li>Public uploads may be displayed to other users if your settings permit.</li>
                        <li>
                            If you upload music that includes collaborators, you confirm that you have the right to share that content and
                            its associated data.
                        </li>
                    </ul>
                </div>

                {/* LEGAL */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">3.3 Legal Obligations</h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            When required by law or to protect the rights, property, or safety of Third Generation Studios, users, or
                            others.
                        </li>
                    </ul>
                </div>

                {/* BUSINESS TRANSFERS */}
                <div className="flex flex-col ">
                    <h3 className="font-bold my-4 text-lg">3.4 Business Transfers</h3>
                    <ul className="ml-10 list-disc">
                        <li>In connection with a merger, acquisition, or sale of assets.</li>
                    </ul>
                </div>
            </section>

            {/* YOUR CHOICES */}
            <section id="your-choices">
                <h5 className="font-bold my-10 text-xl">4. Your Choices</h5>

                {/* OPT OUT */}
                <div className="flex flex-col ">
                    <h3 className="font-bold mb-4 text-lg">4.1 Opt-Out</h3>
                    <ul className="ml-10 list-disc">
                        <li>Opt out of promotional communications anytime by contacting us or using unsubscribe tools.</li>
                    </ul>
                </div>

                {/* ACCESS & CONTROL */}
                <div className="flex flex-col">
                    <h3 className="font-bold my-4 text-lg">4.2 Access & Control</h3>
                    <ul className="ml-10 list-disc">
                        <li>Request access, correction, or deletion of your personal or music data.</li>
                        <li>
                            Artists may delete songs or projects, but copies may remain in backups for a limited period for security and
                            compliance.
                        </li>
                    </ul>
                </div>
            </section>

            {/* SECURITY */}
            <section id="security">
                <h5 className="font-bold my-4 text-xl">5. Security</h5>
                <p>
                    We implement reasonable security measures to protect your data. However, no system is fully secure, and we cannot
                    guarantee absolute protection.
                </p>
            </section>

            {/* CHILDREN */}
            <section id="childrens-privacy">
                <h5 className="font-bold my-4 text-xl">6. Children&apos;s Privacy</h5>
                <p>
                    Our services are not intended for individuals under 13, and we do not knowingly collect data from children under 13. If
                    such data is discovered, we will delete it.
                </p>
            </section>

            {/* CHANGES */}
            <section id="changes-to-this-privacy-policy">
                <h5 className="font-bold my-4 text-xl">7. Changes to This Privacy Policy</h5>
                <p>
                    We may update this Privacy Policy periodically. Notification will be provided through our website and, when appropriate,
                    direct communication.
                </p>
            </section>

            {/* CONTACT */}
            <section id="contact-us">
                <h5 className="font-bold my-4 text-xl">8. Contact Us</h5>
                <p className="mb-4">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="flex flex-col">
                    <p>Third Generation Studios</p>
                    <Link className="underline underline-offset-2 text-blue-500" href="mailto:ahenry@thirdgenerationstudios.com">
                        ahenry@thirdgenerationstudios.com
                    </Link>
                    <Link className="underline underline-offset-2" href="tel:3213700836">
                        321-370-0836
                    </Link>
                </div>
            </section>
        </article>
    );
};

export default PrivacyPolicyPage;
