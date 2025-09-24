"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useProfileByIdQuery, useProfileUpdate } from "@/hooks/public/use-profiles";
import type { IProfileProps } from "@/lib/solo-q-types/public-types";
import toast from "react-hot-toast";

// Placeholder for canUpdateUsername/canUpdateEmail logic
const canUpdateUsername = async (id: string) => ({ canUpdate: true, daysRemaining: 0 });
// const canUpdateEmail = async (id: string) => ({ canUpdate: true, daysRemaining: 0 });

// Lazy load components for better performance
const EditableSection = dynamic(() => import("./editable-section"), {
    loading: () => (
        <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded" />
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
    ),
});

const ThemeSelector = dynamic(() => import("./theme-selector"), {
    loading: () => <div className="h-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />,
});

const ConfirmModal = dynamic(() => import("@/components/modals/confirm-modal"), {
    loading: () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-80 h-40 animate-pulse bg-white dark:bg-neutral-900 rounded-lg" />
        </div>
    ),
});

// Main component
const GeneralSettingsTab = () => {
    const { theme, setTheme } = useTheme();
    const queryClient = useQueryClient();
    const [showUsernameConfirm, setShowUsernameConfirm] = useState(false);
    const [pendingUsername, setPendingUsername] = useState("");
    const [pendingSetEditing, setPendingSetEditing] = useState<((value: boolean) => void) | null>(null);
    const [usernameUpdateStatus, setUsernameUpdateStatus] = useState<{
        canUpdate: boolean;
        daysRemaining: number;
    }>({
        canUpdate: true,
        daysRemaining: 0,
    });

    // Get current user id from auth (replace with your actual auth user id logic)
    const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        // Replace this with your actual logic to get the current user id
        // Example: setUserId("your-user-id");
    }, []);

    // Fetch profile using the new hook
    const { data: profile } = useProfileByIdQuery<IProfileProps>(userId ?? "");

    // Update profile mutation
    const profileUpdateMutation = useProfileUpdate<IProfileProps>();

    // Check if user can update username
    useEffect(() => {
        if (profile?.id) {
            canUpdateUsername(profile.id).then((status) => {
                setUsernameUpdateStatus(status);
            });
        }
    }, [profile?.id]);

    // Username mutation (use new mutation hook)
    const updateUsernameMutation = {
        isPending: profileUpdateMutation.isPending,
        mutate: (newUsername: string) => {
            if (!profile?.id) throw new Error("No user id");
            profileUpdateMutation.mutate({ id: profile.id, values: { username: newUsername } });
        },
    };

    // Memoize username save handler
    const handleUsernameSave = useCallback(
        (newUsername: string, setEditing: (value: boolean) => void) => {
            if (!newUsername || newUsername === profile?.username) {
                setEditing(false);
                return;
            }

            if (!usernameUpdateStatus.canUpdate) {
                toast.error(
                    `You can only change your username once every 30 days. Please try again in ${usernameUpdateStatus.daysRemaining} days.`,
                );
                setEditing(false);
                return;
            }

            setPendingUsername(newUsername);
            setPendingSetEditing(() => setEditing);
            setShowUsernameConfirm(true);
        },
        [profile?.username, usernameUpdateStatus],
    );

    // Handle username confirmation
    const handleUsernameConfirm = useCallback(() => {
        updateUsernameMutation.mutate(pendingUsername);
        setShowUsernameConfirm(false);
    }, [updateUsernameMutation, pendingUsername]);

    // Memoize confirmation cancel handler
    const handleUsernameCancel = useCallback(() => {
        setShowUsernameConfirm(false);
        pendingSetEditing && pendingSetEditing(false);
    }, [pendingSetEditing]);

    // Memoize computed values
    const usernameValue = useMemo(() => (profile?.username ? profile.username : "-"), [profile?.username]);

    const usernameStatusMessage = useMemo(
        () => (!usernameUpdateStatus.canUpdate ? `You can update again in ${usernameUpdateStatus.daysRemaining} days` : undefined),
        [usernameUpdateStatus],
    );

    return (
        <main className="flex flex-col w-full justify-between items-start p-4 my-1">
            <h1 className="text-xl w-full font-bold border-b border-neutral-200 dark:border-neutral-300 pb-2 mb-4">General</h1>

            {/* Username section */}
            <section className="w-full">
                <EditableSection
                    label="Username"
                    value={usernameValue}
                    onSave={handleUsernameSave}
                    isPending={updateUsernameMutation.isPending}
                    isDisabled={!usernameUpdateStatus.canUpdate}
                    statusMessage={usernameStatusMessage}
                />
            </section>

            <hr className="w-full border-t border-neutral-200 dark:border-neutral-700 my-4" />

            {/* Theme selector */}
            <section className="w-full">
                <ThemeSelector theme={theme as string} setTheme={setTheme} />
            </section>

            {/* Confirmation Modal */}
            {showUsernameConfirm && (
                <ConfirmModal
                    title="You can only change your username once every 30 days. Continue?"
                    confirmText="Update Username"
                    cancelText="Cancel"
                    onConfirm={handleUsernameConfirm}
                    onCancel={handleUsernameCancel}
                />
            )}
        </main>
    );
};

export default memo(GeneralSettingsTab);
        setShowUsernameConfirm(false);
    }, [updateUsernameMutation, pendingUsername]);

    // Handle email confirmation
    const handleEmailConfirm = useCallback(() => {
        updateEmailMutation.mutate(pendingEmail);
        setShowEmailConfirm(false);
    }, [updateEmailMutation, pendingEmail]);

    // Memoize confirmation cancel handlers
    const handleUsernameCancel = useCallback(() => {
        setShowUsernameConfirm(false);
        pendingSetEditing && pendingSetEditing(false);
    }, [pendingSetEditing]);

    const handleEmailCancel = useCallback(() => {
        setShowEmailConfirm(false);
        pendingSetEditing && pendingSetEditing(false);
    }, [pendingSetEditing]);

    // Memoize computed values
    const usernameValue = useMemo(() => (profile?.username ? profile.username : "-"), [profile?.username]);

    const emailValue = useMemo(() => authUser?.email || "-", [authUser?.email]);

    const usernameStatusMessage = useMemo(
        () => (!usernameUpdateStatus.canUpdate ? `You can update again in ${usernameUpdateStatus.daysRemaining} days` : undefined),
        [usernameUpdateStatus],
    );

    const emailStatusMessage = useMemo(
        () => (!emailUpdateStatus.canUpdate ? `You can update again in ${emailUpdateStatus.daysRemaining} days` : undefined),
        [emailUpdateStatus],
    );

    return (
        <main className="flex flex-col w-full justify-between items-start p-4 my-1">
            <h1 className="text-xl w-full font-bold border-b border-neutral-200 dark:border-neutral-300 pb-2 mb-4">General</h1>

            {/* Username section */}
            <section className="w-full">
                <EditableSection
                    label="Username"
                    value={usernameValue}
                    onSave={handleUsernameSave}
                    isPending={updateUsernameMutation.isPending}
                    isDisabled={!usernameUpdateStatus.canUpdate}
                    statusMessage={usernameStatusMessage}
                />
            </section>

            <hr className="w-full border-t border-neutral-200 dark:border-neutral-700 my-4" />

            {/* Email section */}
            <section className="w-full">
                <EditableSection
                    label="Email"
                    value={emailValue}
                    pendingValue={authUser?.new_email || undefined}
                    onSave={handleEmailSave}
                    isPending={updateEmailMutation.isPending}
                    showEmailVerification={true}
                    isEmailVerified={!!authUser?.email_confirmed_at}
                    isDisabled={!emailUpdateStatus.canUpdate}
                    statusMessage={emailStatusMessage}
                />
            </section>

            <hr className="w-full border-t border-neutral-200 dark:border-neutral-700 my-4" />

            {/* Theme selector */}
            <section className="w-full">
                <ThemeSelector theme={theme as string} setTheme={setTheme} />
            </section>

            {/* Confirmation Modals */}
            {showUsernameConfirm && (
                <ConfirmModal
                    title="You can only change your username once every 30 days. Continue?"
                    confirmText="Update Username"
                    cancelText="Cancel"
                    onConfirm={handleUsernameConfirm}
                    onCancel={handleUsernameCancel}
                />
            )}

            {showEmailConfirm && (
                <ConfirmModal
                    title="You can only change your email once every 30 days. Continue?"
                    confirmText="Update Email"
                    cancelText="Cancel"
                    onConfirm={handleEmailConfirm}
                    onCancel={handleEmailCancel}
                />
            )}
        </main>
    );
};

export default memo(GeneralSettingsTab);
