import { Metadata } from "next";

import ContactForm from "@/components/forms/contact-form";
import CalendlyComponent from "@/components/forms/calendly";

export const metadata: Metadata = {
    title: "Contact Our Team",
    description: "Contact The Third Generation Studios Team",
};

export default function ContactUsPage() {
    return (
        <main className="min-h-screen pb-12 pt-24 px-4 md:px-12 bg-gradient-to-br from-black via-gray-900 to-purple-900">
            <header className="max-w-3xl mx-auto text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Our Team</h1>
                <p className="text-lg text-purple-200">We're here to help! Schedule a meeting or send us a message directly.</p>
            </header>
            <section className="max-w-2xl mx-auto flex flex-col gap-10">
                {/* Calendly Component */}
                <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center border-2 border-purple-600">
                    <h2 className="text-2xl font-semibold text-purple-200 mb-2">Book a Meeting</h2>
                    <p className="text-purple-300 mb-6 text-center">
                        Easily schedule a call with our team at your convenience using our Calendly integration.
                    </p>
                    <div className="w-full">
                        <CalendlyComponent />
                    </div>
                </article>
                {/* Contact Form */}
                <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center border-2 border-purple-600">
                    <h2 className="text-2xl font-semibold text-purple-200 mb-2">Send Us a Message</h2>
                    <p className="text-purple-300 mb-6 text-center">
                        Prefer to reach out directly? Fill out our contact form and we'll get back to you soon.
                    </p>
                    <div className="w-full">
                        <ContactForm />
                    </div>
                </article>
            </section>
        </main>
    );
}
