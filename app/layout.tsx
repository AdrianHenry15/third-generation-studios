import "./globals.css";

import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loader";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/logos/tgs-logo.png" />
            </head>
            <body className={nunito.className}>
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
