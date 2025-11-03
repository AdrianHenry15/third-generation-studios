"use client";

// Generic sidebar section: optional title + list of navigational items.
// Note: min-w-0 is applied to allow text truncation inside child links.

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

/**
 * SidebarSection
 * - Controls visibility of the title when collapsed
 * - Forwards sizing to SidebarLink via linkSize
 */
export default function SidebarSection({
    section,
    isCollapsed,
    isMobile,
    onMobileClose,
    className = "",
    linkSize = "sm",
}: SidebarSectionProps) {
    return (
        <div className={`px-2 py-2 min-w-0 ${className}`}>
            {/* Title: only visible when not collapsed or on mobile */}
            {section.title && (!isCollapsed || isMobile) && (
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-3 py-2 mb-2 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider truncate"
                >
                    {section.title}
                </motion.h2>
            )}

            {/* Items: each item is a SidebarLink; ensure li has min-w-0 for truncation */}
            <ul className="space-y-1 min-w-0">
                {section.items.map((item) => (
                    <li key={item.href} className="min-w-0">
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
