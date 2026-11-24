import "./globals.css";

import { Metadata } from "next";
import "@fontsource-variable/nunito";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loader";
import Analytics from "@/features/marketing/analytics";
import { pageMetadata, siteOrigin } from "@/features/marketing/site";

const homepage = pageMetadata("/", "Third Generation Studios", "Web design, SEO, and ongoing website support for service businesses.");
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
    ...homepage,
    metadataBase: new URL(siteOrigin),
    title: { default: "Third Generation Studios | Web Design & SEO", template: "%s | Third Generation Studios" },
    alternates: undefined,
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    icons: { icon: "/logos/tgs-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-[Nunito_Variable,sans-serif]">
                {measurementId && /^G-[A-Z0-9]+$/.test(measurementId) && <Analytics measurementId={measurementId} />}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Third Generation Studios",
                    url: siteOrigin,
                    logo: `${siteOrigin}/logos/tgs-logo.png`,
                }) }} />
                <Suspense fallback={<Loading />}>
                    <Toaster position="top-center" />
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
}
