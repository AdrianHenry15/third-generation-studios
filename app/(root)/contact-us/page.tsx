import { Metadata } from "next";

import ContactForm from "@/components/forms/contact-form";

export const metadata: Metadata = {
    title: "Contact Us | Third Generation Studios",
    description:
        "Get in touch with Third Generation Studios. Start your project or ask questions about our web and media services.",
    keywords: [
        "contact",
        "get in touch",
        "consultation",
        "web development",
        "media engineering",
        "third generation studios",
    ],
    openGraph: {
        url: "https://thirdgenerationstudios.com/contact-us",
        type: "website",
        title: "Contact Us | Third Generation Studios",
        description:
            "Reach out to Third Generation Studios for consultations, quotes, and support.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | Third Generation Studios",
        description:
            "Contact our team to discuss your next project or request more information.",
    },
    alternates: {
        canonical: "https://thirdgenerationstudios.com/contact-us",
    },
};

export default function ContactUsPage() {
    return (
        <div className="bg-black h-full">
            <ContactForm />
        </div>
    );
}
