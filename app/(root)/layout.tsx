"use client";

import { ReactNode } from "react";
import Footer from "@/app/(root)/components/layout/footer";
import Navbar from "./components/layout/navigation/navigation-bar";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
