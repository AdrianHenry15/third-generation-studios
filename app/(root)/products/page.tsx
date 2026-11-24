import DetailPage from "@/features/marketing/detail-page";
import ProductCards from "@/features/marketing/product-cards";
import { pageMetadata } from "@/features/marketing/site";

const title = "Products from Third Generation Studios";
const description = "Explore CoffeeShop CRM and preview the upcoming TGS Website Manager.";
export const metadata = pageMetadata("/products", title, description);

export default function ProductsPage() {
    return (
        <DetailPage title={title} intro={description}>
            <section aria-label="TGS products"><ProductCards /></section>
        </DetailPage>
    );
}
