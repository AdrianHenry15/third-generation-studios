"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-data";

interface SidebarLinkProps {
    item: SidebarItem & { onClick?: (e: React.MouseEvent) => void };
    isCollapsed: boolean;
    isMobile: boolean;
    onMobileClose: () => void;
    size?: "sm" | "md";
}

export default function SidebarLink({ item, isCollapsed, isMobile, onMobileClose, size = "sm" }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === item.href && item.href !== "#";

    const iconSize = size === "md" ? (isMobile ? 22 : 20) : isMobile ? 20 : 18;
    const padding = size === "md" ? "px-3 sm:px-4 py-3 sm:py-2" : "px-3 py-2 sm:py-2";
    const textSize = size === "md" ? "font-medium text-sm sm:text-base" : "text-sm";

    const handleClick = (e: React.MouseEvent) => {
        if (item.onClick) {
            item.onClick(e);
        } else {
            onMobileClose();
        }
    };

    // If there's a custom onClick, render as button, otherwise as Link
    if (item.onClick) {
        return (
            <button
                onClick={handleClick}
                className={`w-full flex items-center gap-3 ${padding} rounded-lg transition-all duration-200 group touch-manipulation text-left ${
                    isActive ? "bg-green-600 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700"
                }`}
            >
                <item.icon size={iconSize} className="flex-shrink-0" />
                {(!isCollapsed || isMobile) && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={textSize}>
                        {item.label}
                    </motion.span>
                )}
            </button>
        );
    }

    return (
        <Link
            href={item.href}
            onClick={handleClick}
            className={`flex items-center gap-3 ${padding} rounded-lg transition-all duration-200 group touch-manipulation ${
                isActive ? "bg-green-600 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700"
            }`}
        >
            <item.icon size={iconSize} className="flex-shrink-0" />
            {(!isCollapsed || isMobile) && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={textSize}>
                    {item.label}
                </motion.span>
            )}
        </Link>
    );
}
