// These styles apply to every route in the application
import "@/styles/globals.css";

import { Metadata } from "next";
import { Expletus_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

import { Loader } from "@/components/loader";
import { ClerkProvider } from "@clerk/nextjs";

const font = Expletus_Sans({
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
                <body className={font.className}>
                    <Toaster />
                    <div className="flex flex-col">
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
