"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sessionValid, setSessionValid] = useState(false);

    useEffect(() => {
        const verifyPasswordReset = async () => {
            const token = searchParams.get("token");

            if (!token) {
                console.log("No PKCE code found in URL — likely invalid or already verified link");
                setLoading(false);
                return;
            }

            try {
                // Supabase PKCE verification step
                const { error } = await supabase.auth.exchangeCodeForSession(token);

                if (error) {
                    console.error("Error exchanging PKCE code:", error.message);
                    router.replace(`/auth/auth-code-error?error=${encodeURIComponent(error.message || "invalid_link")}`);
                    return;
                }

                setSessionValid(true);
                console.log("✅ PKCE session established — user can reset password");
            } catch (err: any) {
                console.error("Unexpected error verifying PKCE code:", err);
                router.replace(`/auth/auth-code-error?error=${encodeURIComponent(err.message || "unexpected_error")}`);
            } finally {
                setLoading(false);
            }
        };

        verifyPasswordReset();
    }, [searchParams, router]);

    if (loading) return <div className="text-center mt-20">Verifying reset link...</div>;

    return sessionValid ? (
        <ResetPasswordForm />
    ) : (
        <div className="text-center mt-20">Invalid or expired link. Please request a new password reset.</div>
    );
}
