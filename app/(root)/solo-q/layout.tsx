"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/solo-q/sidebar/sidebar";

export default function SoloQLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
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
                    marginLeft: typeof window !== "undefined" && window.innerWidth < 768 
                        ? 0 
                        : isCollapsed 
                        ? 72 
                        : 280
                }}
            >
                <div className="p-4 md:p-6 pt-16 md:pt-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
