import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    if (token_hash && type) {
        const supabase = await createClient();

        // only verify otp for signup or magiclink (PKCE flow handles recovery itself)
        if (type === "signup" || type === "magiclink") {
            const { error } = await supabase.auth.verifyOtp({ type, token_hash });
            if (!error) {
                switch (type) {
                    case "signup":
                        redirect("/solo-queue"); // onboarding route
                    case "magiclink":
                        redirect(next); // user logged in
                }
            }
        }

        // recovery (password reset) is now handled by PKCE at /reset-password
        if (type === "recovery") {
            const { error } = await supabase.auth.verifyOtp({ type: "recovery", token_hash });
            if (error) {
                console.log("Error verifying recovery OTP:", error.message);
                redirect("/error");
            } else {
                // Preserve token_hash for the client reset page
                redirect(`/reset-password?token_hash=${encodeURIComponent(token_hash)}&next=${encodeURIComponent(next)}`);
            }
        }
    }

    redirect("/error");
}
