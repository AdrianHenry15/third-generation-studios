"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navigation/navigation-bar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
