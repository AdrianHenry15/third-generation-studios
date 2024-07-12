import { Metadata } from "next";

import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
    title: "Contact Our Team",
    description: "Contact The Third Generation Studios Team",
};

export default function ContactUsPage() {
    return (
        <div className="bg-black  h-full">
            <ContactForm />
        </div>
    );
}
