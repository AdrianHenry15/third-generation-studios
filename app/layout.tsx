// These styles apply to every route in the application
import "@/styles/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

import { Loader } from "@/components/loader";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const title = "Third Generation Studios";
const description = "Adrian Henry";
export const metadata: Metadata = {
    title,
    description,
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <link rel="icon" href="/logos/triangle.png" sizes="96x96" />
                {/* <link rel="icon" href="/triangle-32.png" sizes="32x32" />
                <link rel="icon" href="/triangle-16.png" sizes="16x16" /> */}
                <body className={inter.variable}>
                    <Toaster />
                    <div className="flex flex-col">
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
