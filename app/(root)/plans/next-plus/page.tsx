import PlansSplash from "@/components/plans-splash";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Plus Website Development Package",
    description: "Website developed with Nextjs and Emailjs for email services.",
};

export default function NextPlusPage() {
    return <PlansSplash />;
}
