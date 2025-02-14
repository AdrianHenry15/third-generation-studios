import ContactForm from "@/components/forms/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Schedule A Consultation Today",
    description: "Schedule An Consultation For Your Web Design Needs",
};

export default function ConsultationPage() {
    return (
        <div className="bg-black h-full">
            <ContactForm />
        </div>
    );
}
