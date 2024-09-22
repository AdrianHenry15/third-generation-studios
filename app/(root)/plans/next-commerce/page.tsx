import PlansSplash from "@/components/plans-splash";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Full Next e-commerce Website Development Package",
    description: "Website developed with Nextjs, Emailjs (email service), Clerkjs (user authentication) and Square (payment processing)",
};

export default function NextCommercePage() {
    return <PlansSplash />;
}
