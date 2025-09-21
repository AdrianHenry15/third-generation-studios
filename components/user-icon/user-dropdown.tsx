"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";

// Lazy load SettingsModal for better performance
const SettingsModal = dynamic(() => import("../modals/settings/settings-modal"), {
    loading: () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-96 h-64 animate-pulse bg-white dark:bg-neutral-900 rounded-lg" />
        </div>
    ),
});

interface IUserDropdownProps {
    position?: "top" | "bottom" | "auto";
    align?: "left" | "right" | "center";
    anchorRef?: React.RefObject<HTMLElement | null> | null;
    open?: boolean;
    onClose?: () => void;
}

const dropdownVariants = {
    hiddenTop: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: 0.15 },
    },
    hiddenBottom: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: { duration: 0.15 },
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.2 },
    },
    exitTop: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: 0.15 },
    },
    exitBottom: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: { duration: 0.15 },
    },
};

const UserDropdown = ({ position = "bottom", align = "right", anchorRef, open = false, onClose }: IUserDropdownProps) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    // Use auth context instead of local queries
    const { user, loading, profileLoading, signOut } = useSupabaseAuth();
    const isLoading = loading || profileLoading;

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"general" | "plan">("general");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle sign out with proper navigation
    const handleSignOut = async () => {
        try {
            onClose && onClose();
            await signOut();
            router.push("/sign-in");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
            router.push("/sign-in");
        }
    };

    // Early returns while loading or unauthenticated
    if (isLoading) return null;
    if (!user) return null;

    // Close when clicking outside
    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event: MouseEvent) => {
            const modal = document.querySelector(".fixed.inset-0.z-50");
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                anchorRef?.current &&
                !anchorRef.current.contains(event.target as Node) &&
                (!modal || !modal.contains(event.target as Node))
            ) {
                onClose && onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, anchorRef, onClose]);

    // Determine animation variants based on position
    const getAnimationVariants = () => {
        return {
            hidden: position === "top" ? "hiddenTop" : "hiddenBottom",
            visible: "visible",
            exit: position === "top" ? "exitTop" : "exitBottom",
        };
    };

    const variants = getAnimationVariants();

    // Memoized handlers
    const handleGeneralSettings = useCallback(() => {
        setShowSettingsModal(true);
        setSelectedTab("general");
    }, []);

    const handlePlanSettings = useCallback(() => {
        setShowSettingsModal(true);
        setSelectedTab("plan");
    }, []);

    const handleCloseSettings = useCallback(() => {
        setShowSettingsModal(false);
    }, []);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={dropdownRef}
                        initial={variants.hidden}
                        animate="visible"
                        exit={variants.exit}
                        variants={dropdownVariants}
                        className="w-52 z-60 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded shadow-lg"
                        style={{ minWidth: "13rem" }}
                        role="menu"
                        aria-label="User account menu"
                    >
                        <ul role="none">
                            <li role="none">
                                <button
                                    onClick={handleGeneralSettings}
                                    className="w-full items-center flex text-left p-4 text-sm hover:bg-green-400 dark:hover:bg-red-950 dark:text-white transition-colors duration-200"
                                    role="menuitem"
                                    tabIndex={0}
                                >
                                    <SettingsIcon className="mr-2" size={15} aria-hidden="true" />
                                    <span>Settings</span>
                                </button>
                            </li>
                            {/* <li
                role="none"
                className="border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={handlePlanSettings}
                  className="w-full items-center flex text-left p-4 text-sm hover:bg-green-400 dark:hover:bg-green-950 dark:text-white transition-colors duration-200"
                  role="menuitem"
                  tabIndex={0}>
                  <CoinsIcon className="mr-2" size={15} aria-hidden="true" />
                  <span>My Plan</span>
                  <span
                    className="ml-auto text-xs text-neutral-500"
                    aria-label={`Current plan: ${tierDisplay}`}>
                    {tierDisplay}
                  </span>
                </button>
              </li> */}
                            <li role="none" className="w-full">
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="w-full items-center flex text-left p-4 text-sm hover:bg-green-400 dark:hover:bg-green-950 dark:text-white transition-colors duration-200">
                                        Theme
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                                        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v)}>
                                            <DropdownMenuRadioItem value="light" className="cursor-pointer">
                                                Light
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                                                Dark
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="system" className="cursor-pointer">
                                                System
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            </li>
                            <li role="none">
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex text-left p-4 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                                    role="menuitem"
                                    tabIndex={0}
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            {showSettingsModal && (
                <SettingsModal
                    open={showSettingsModal}
                    onClose={handleCloseSettings}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
            )}
        </>
    );
};

export default memo(UserDropdown);
