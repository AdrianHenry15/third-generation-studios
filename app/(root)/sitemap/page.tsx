import Link from "next/link";
import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata, publicPages } from "@/features/marketing/site";

const description = "Browse the public pages on the Third Generation Studios website.";
export const metadata = pageMetadata("/sitemap", "Sitemap", description);

export default function SitemapPage() {
    return (
        <DetailPage title="Sitemap" intro={description}>
            <ul className="space-y-2">
                {publicPages.filter(([path]) => path !== "/sitemap").map(([path, label]) => (
                    <li key={path}><Link href={path}>{label}</Link></li>
                ))}
            </ul>
        </DetailPage>
    );
}
