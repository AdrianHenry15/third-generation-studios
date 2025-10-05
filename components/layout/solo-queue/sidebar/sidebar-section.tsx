"use client";

import { motion } from "framer-motion";
import { SidebarSection as SidebarSectionType } from "./sidebar-data";
import SidebarLink from "./sidebar-link";

interface SidebarSectionProps {
    section: SidebarSectionType;
    isCollapsed: boolean;
    isMobile: boolean;
    onMobileClose: () => void;
    className?: string;
    linkSize?: "sm" | "md";
}

export default function SidebarSection({
    section,
    isCollapsed,
    isMobile,
    onMobileClose,
    className = "",
    linkSize = "sm",
}: SidebarSectionProps) {
    return (
        <div className={`p-2 ${className}`}>
            {/* Section title */}
            {section.title && (!isCollapsed || isMobile) && (
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-3 py-2 mb-2 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider"
                >
                    {section.title}
                </motion.h2>
            )}

            {/* Section items */}
            <ul className="space-y-1">
                {section.items.map((item) => (
                    <li key={item.href}>
                        <SidebarLink
                            item={item}
                            isCollapsed={isCollapsed}
                            isMobile={isMobile}
                            onMobileClose={onMobileClose}
                            size={linkSize}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
