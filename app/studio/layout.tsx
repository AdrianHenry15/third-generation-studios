import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Brite Studio",
    description: "Create Your Layout",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <main>{children}</main>
        </html>
    );
}
