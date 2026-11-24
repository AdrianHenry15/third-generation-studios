import Link from "next/link";
import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata } from "@/features/marketing/site";

const description = "Ongoing website support for businesses that need updates, maintenance, and a clear place to request help.";
export const metadata = pageMetadata("/website-care", "Website Care", description);

export default function WebsiteCarePage() {
    return (
        <DetailPage title="Website Care" intro={description}>
            <p>We can help keep content current, review site issues, and scope larger improvements as your business changes.</p>
            <section id="website-manager" className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/5 p-7">
                <p className="mb-2 font-semibold text-purple-300">Coming soon</p>
                <h2 className="mb-3 text-2xl font-bold">TGS Website Manager</h2>
                <p>We’re building a client portal where you’ll be able to submit update requests, see their status, and review completed maintenance.</p>
            </section>
            <p><Link href="/contact-us">Ask about website care</Link></p>
        </DetailPage>
    );
}
