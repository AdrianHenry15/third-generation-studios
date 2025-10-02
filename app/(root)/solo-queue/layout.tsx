"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/solo-queue/sidebar/sidebar";

export default function SoloQLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            if (mobile) {
                setIsCollapsed(true);
                setIsMobileMenuOpen(false);
            } else {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Calculate margin left based on screen size and collapsed state
    const getMarginLeft = () => {
        if (isMobile) return 0;
        return isCollapsed ? 72 : 280;
    };

    return (
        <div className="min-h-screen bg-black">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main
                className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 transition-all duration-300 ease-in-out"
                style={{
                    marginLeft: getMarginLeft(),
                }}
            >
                <div>{children}</div>
            </main>
        </div>
    );
}
