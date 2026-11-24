import Link from "next/link";
import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata } from "@/features/marketing/site";

const description = "Manage leads and customers in a shared workspace built for service businesses.";
export const metadata = pageMetadata("/products/coffeeshop-crm", "CoffeeShop CRM", description);

export default function CoffeeShopPage() {
    return (
        <DetailPage title="CoffeeShop CRM" intro={description}>
            <p className="rounded-xl border border-purple-400/30 bg-purple-400/10 p-4">
                <strong>Early beta.</strong> We’re inviting a small group of service businesses to try CoffeeShop CRM and share feedback on
                how they track leads and manage follow-ups.
            </p>

            <p>
                <Link href="/contact-us">Request CoffeeShop CRM Beta Access</Link>
            </p>
        </DetailPage>
    );
}
