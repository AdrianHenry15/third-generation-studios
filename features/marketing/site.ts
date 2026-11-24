import type { Metadata } from "next";

export const siteOrigin = "https://www.thirdgenerationstudios.com";
export const crmUrl = "https://coffeeshopcrm.thirdgenerationstudios.com";
export const publicPages = [
    ["/", "Home"],
    ["/services", "Web Design & Digital Marketing"],
    ["/websites/eckert-golf", "Eckert Golf Case Study"],
    ["/products", "Products"],
    ["/products/coffeeshop-crm", "CoffeeShop CRM"],
    ["/website-care", "Website Care & Website Manager"],
    ["/studio-sessions", "Studio Sessions"],
    ["/about", "About"],
    ["/contact-us", "Request a Website Review"],
    ["/privacy-policy", "Privacy Policy"],
    ["/accessibility", "Accessibility"],
    ["/sitemap", "Sitemap"],
] as const;

export function pageMetadata(path: string, title: string, description: string): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: path,
            siteName: "Third Generation Studios",
            type: "website",
            images: ["/logos/tgs-logo.png"],
        },
    };
}
