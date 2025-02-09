// These styles apply to every route in the application
import "./globals.css";

import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

import { Loader } from "@/components/loader";
import { ClerkProvider } from "@clerk/nextjs";

const nunito = Nunito({
    variable: "--font-inter",
    subsets: ["latin"],
});

const title = "Third Generation Studios";
const description = "The best developers of websites and sound production";
export const metadata: Metadata = {
    title,
    description,
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <link rel="icon" href="/logos/glowCircle-trans.png" sizes="96x96" />
                <body className={nunito.variable}>
                    <Toaster />
                    <div className="flex flex-col">
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
