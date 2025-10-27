"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            const token_hash = searchParams.get("token_hash");

            if (!token_hash) {
                console.log("No token_hash in URL — invalid or already used link");
                setTokenValid(false);
            } else {
                // Token exists in URL, assume valid (Supabase link is temporary and single-use)
                setTokenValid(true);
            }

            setLoading(false);
        };

        checkToken();
    }, [searchParams]);

    if (loading) return <div className="text-center mt-20">Verifying reset link...</div>;

    return tokenValid ? (
        <ResetPasswordForm />
    ) : (
        <div className="text-center mt-20">Invalid or expired link. Please request a new password reset.</div>
    );
}
