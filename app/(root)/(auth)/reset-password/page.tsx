"use client";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Suspense, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

function ResetPasswordContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        // Handle token_hash from email link or code from API route
        const exchangeTokenForSession = async () => {
            const token_hash = searchParams.get("token_hash");
            const type = searchParams.get("type");
            const code = searchParams.get("code");

            if (token_hash && type) {
                console.log("🔑 Processing token_hash from email link");
                const { error } = await supabase.auth.verifyOtp({
                    type: type as any,
                    token_hash,
                });
                if (error) {
                    console.error("Error verifying OTP:", error);
                    window.location.href = "/auth/auth-code-error";
                }
            } else if (code) {
                console.log("🔑 Processing code from API route");
                const { error } = await supabase.auth.exchangeCodeForSession(code);
                if (error) {
                    console.error("Error exchanging code for session:", error);
                    window.location.href = "/auth/auth-code-error";
                }
            }
        };

        exchangeTokenForSession();
    }, [searchParams]);

    return <ResetPasswordForm />;
}

export default function ResetPassword() {
    return (
        <div className="fixed inset-0 min-h-screen flex items-center justify-center w-full p-4 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-green-950">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
