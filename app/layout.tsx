// These styles apply to every route in the application
import "./globals.css";

import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

import { Loader } from "@/components/loader";
import { ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import DisableDraftMode from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "Third Generation Studios",
    description:
        "Expert web development and music production services. Elevate your digital presence and sound with Third Generation Studios.",
    openGraph: {
        title: "Third Generation Studios",
        description:
            "Providing top-tier web development and music production services. Transform your ideas into reality with our expert team.",
        url: "https://thirdgenerationstudios.com", // Make sure this is the homepage URL
        siteName: "Third Generation Studios",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Third Generation Studios",
        description:
            "Discover professional web development and music production services with Third Generation Studios. Your vision, our expertise.",
    },
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider dynamic>
            <html lang="en">
                <link rel="icon" href="/logos/glowCircle-trans.png" sizes="96x96" />
                <body className={nunito.variable}>
                    {(await draftMode()).isEnabled && (
                        <>
                            <DisableDraftMode />
                            <VisualEditing />
                        </>
                    )}
                    <Toaster />
                    <div className="flex flex-col">
                        <Suspense fallback={<Loader />}>
                            <ClerkLoading>
                                <Loader />
                            </ClerkLoading>
                            {children}
                        </Suspense>
                        {/* Higher order component for live settings when product is published */}
                        <SanityLive />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
