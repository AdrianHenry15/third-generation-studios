import Image from "next/image";
import Link from "next/link";
import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata } from "@/features/marketing/site";

const description = "A website refresh for Eckert Golf that made turf equipment, operating manuals, and contact information easier to find.";
export const metadata = pageMetadata("/websites/eckert-golf", "Eckert Golf Website Refresh", description);

export default function EckertGolfPage() {
    return (
        <DetailPage title="Eckert Golf" intro={description}>
            <Image src="/websites/eckert-golf.png" width={1200} height={675} alt="Eckert Golf website project" sizes="(max-width: 896px) 100vw, 896px" className="rounded-xl border border-white/10" />
            <h2 className="text-2xl font-bold">What we improved</h2>
            <ul className="list-disc space-y-2 pl-6">
                <li>Updated the product and brand pages so visitors can browse turf equipment more easily.</li>
                <li>Made operating manuals easier to open from product pages.</li>
                <li>Refined the sitewide navigation, contact experience, and footer.</li>
                <li>Updated sitemap and crawler configuration and added accessibility and privacy information.</li>
            </ul>
            <p><a href="https://www.eckertgolf.com/">Visit Eckert Golf</a></p>
            <p><Link href="/contact-us">Request a review of your website</Link></p>
        </DetailPage>
    );
}
