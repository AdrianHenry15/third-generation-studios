"use client";

import { useState, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon, LogOut, Laptop, Moon, Sun, User } from "lucide-react";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { useProfile } from "@/hooks/use-profiles";

// Lazy load SettingsModal for better performance
const SettingsModal = dynamic(() => import("../modals/settings/settings-modal"), {
    loading: () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-96 h-64 animate-pulse bg-white dark:bg-neutral-900 rounded-lg" />
        </div>
    ),
});

const UserIcon = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"general" | "plan">("general");

    // Use auth context instead of local queries
    const { user, loading, signOut } = useSupabaseAuth();
    const { profile } = useProfile();
    const ProfileLoading = useProfile().loading;

    const isLoading = loading || ProfileLoading;

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/sign-in");
            router.refresh();
        } catch {
            router.push("/sign-in");
        }
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-end flex-1 relative">
                <div className="w-8 h-8 animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="relative flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="flex items-center gap-2 p-1 transition-colors rounded-full duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                        aria-label={`User menu for ${profile?.username || user?.email || "user"}`}
                        type="button"
                    >
                        <Image
                            width={32}
                            height={32}
                            quality={75}
                            priority={false}
                            src={profile?.avatar_url || "/user-default-image.png"}
                            alt={`${profile?.username || user?.email || "User"} avatar`}
                            className="w-8 h-8 p-1 rounded-full border-2 bg-neutral-100 dark:bg-neutral-600"
                            sizes="32px"
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg">
                    <DropdownMenuItem
                        className="text-sm text-black hover:text-white hover:bg-green-400 dark:hover:bg-green-950 dark:text-white cursor-pointer transition-colors duration-200"
                        onClick={() => {
                            router.push("/solo-q/profile");
                        }}
                    >
                        <User className="mr-2" size={15} aria-hidden="true" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-sm text-black hover:text-white hover:bg-green-400 dark:hover:bg-green-950 dark:text-white cursor-pointer transition-colors duration-200"
                        onClick={() => {
                            setSelectedTab("general");
                            setShowSettingsModal(true);
                        }}
                    >
                        <SettingsIcon className="mr-2" size={15} aria-hidden="true" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                        className="text-sm text-black hover:text-white hover:bg-green-400 dark:hover:bg-green-950 dark:text-white cursor-pointer transition-colors duration-200"
                        onClick={() => {
                            setSelectedTab("plan");
                            setShowSettingsModal(true);
                        }}
                    >
                        <CoinsIcon className="mr-2" size={15} aria-hidden="true" />
                        <span>My Plan</span>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="text-sm text-black hover:text-white hover:bg-green-400 dark:hover:bg-green-950 dark:text-white cursor-pointer transition-colors duration-200">
                            <span className="mr-2">Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v)}>
                                <DropdownMenuRadioItem value="light" className="cursor-pointer">
                                    <Sun className="mr-2 h-4 w-4" /> Light
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                                    <Moon className="mr-2 h-4 w-4" /> Dark
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="system" className="cursor-pointer">
                                    <Laptop className="mr-2 h-4 w-4" /> System
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 dark:text-red-400 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {showSettingsModal && (
                <SettingsModal
                    open={showSettingsModal}
                    onClose={() => setShowSettingsModal(false)}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
            )}
        </div>
    );
};

export default memo(UserIcon);
