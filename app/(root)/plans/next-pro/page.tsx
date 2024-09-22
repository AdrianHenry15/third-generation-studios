import PlansSplash from "@/components/plans-splash";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pro Website Development Package",
    description: "Website developed with Nextjs, Emailjs for email service, and Clerkjs for user authentication.",
};

export default function NextProPage() {
    return <PlansSplash />;
}
