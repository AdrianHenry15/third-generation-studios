import ContactForm from "@/components/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get An Estimate Today",
    description: "Get An Estimate For Your Web Design Needs",
};

export default function EstimatePage() {
    return (
        <div className="bg-black h-full">
            <ContactForm />
        </div>
    );
}
