"use client";

import { signInAction, checkEmailExistsAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, memo, useCallback, useRef } from "react";
import { Eye, EyeOff, ArrowDown } from "lucide-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { SubmitButton } from "../submit-button";
import { useHCaptchaStore } from "@/stores/hcaptcha-store";

// Animation variants moved outside component to prevent recreation
const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: custom * 0.1, duration: 0.4 },
    }),
};

// Password validation regex moved outside to prevent recreation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

// Memoized SignInForm component for build optimization
const SignInForm = memo(({ searchParams }: { searchParams: Message }) => {
    const router = useRouter();
    const urlSearchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
    const [showEmailNotFound, setShowEmailNotFound] = useState(false);
    const [captchaError, setCaptchaError] = useState<string | null>(null);

    // hCaptcha store integration
    const { token: hcaptchaToken, setToken } = useHCaptchaStore();

    // hCaptcha ref for resetting
    const hcaptchaRef = useRef<HCaptcha>(null);

    // Memoized validation function
    const validatePassword = useCallback((password: string) => {
        return PASSWORD_REGEX.test(password);
    }, []);

    // Memoized hCaptcha verification handler
    const handleCaptchaVerify = useCallback(
        (token: string) => {
            setToken(token);
            setFormError(null); // Clear any captcha-related errors
            setCaptchaError(null); // Clear captcha-specific errors
        },
        [setToken],
    );

    // Memoized hCaptcha expiry handler
    const handleCaptchaExpire = useCallback(() => {
        setToken("");
        setCaptchaError("Captcha expired. Please verify again.");
    }, [setToken]);

    // Memoized hCaptcha error handler
    const handleCaptchaError = useCallback(
        (error: string) => {
            setToken("");
            setCaptchaError("Captcha verification failed. Please try again.");
            console.error("hCaptcha error:", error);
        },
        [setToken],
    );

    // Optimized form submission handler
    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setFormError(null);
            setShowEmailNotFound(false);
            setCaptchaError(null); // Clear captcha errors on new submission

            // Client-side validation
            if (!validatePassword(password)) {
                setFormError(
                    "Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and symbol.",
                );
                return;
            }

            // Validate hCaptcha token
            if (!hcaptchaToken) {
                setFormError("Please complete the captcha verification.");
                return;
            }

            // Check if email exists in database using server action
            const emailCheckFormData = new FormData();
            emailCheckFormData.append("email", email);

            const emailCheckResult = await checkEmailExistsAction(emailCheckFormData);

            if ((emailCheckResult as any)?.error) {
                setFormError("Unable to verify email. Please try again.");
                return;
            }

            if (!(emailCheckResult as any)?.exists) {
                setFormError("Email does not exist in our database");
                setShowEmailNotFound(true);
                return;
            }

            // Now try to sign in
            try {
                const formData = new FormData();
                formData.append("email", email);
                formData.append("password", password);
                formData.append("hcaptcha_token", hcaptchaToken);

                const result = await signInAction(formData);
                if ((result as any)?.error) {
                    const code = (result as any)?.errorCode;
                    if (code === "invalid_credentials") {
                        setFormError("Incorrect password. Please try again.");
                    } else if (code === "email_not_confirmed") {
                        setFormError("Your email is not confirmed. Please check your inbox for the confirmation link or resend it below.");
                    } else if (code === "captcha_required") {
                        setFormError("Please complete the captcha verification.");
                    } else if (code === "rate_limited") {
                        setFormError("Too many attempts. Please wait a bit and try again.");
                    } else if (code === "user_not_found") {
                        setFormError("Email does not exist in our database");
                        setShowEmailNotFound(true);
                    } else {
                        setFormError((result as any)?.error);
                    }
                    // Reset captcha on server error
                    setToken("");
                    hcaptchaRef.current?.resetCaptcha();
                } else if ((result as any)?.success) {
                    // Handle successful sign-in with client-side navigation
                    const redirectTo = urlSearchParams.get("redirect_url") || "/dashboard";

                    // Only decode if it's not the default dashboard route
                    const finalRedirectTo = redirectTo === "/dashboard" ? redirectTo : decodeURIComponent(redirectTo);

                    router.push(finalRedirectTo);
                    router.refresh();
                }
            } catch (err: any) {
                console.error("Sign-in error:", err);
                setFormError(err.message || "Failed to sign in. Please try again.");
                // Reset captcha on error
                setToken("");
                hcaptchaRef.current?.resetCaptcha();
            }
        },
        [email, password, validatePassword, hcaptchaToken, setToken, router, urlSearchParams],
    );

    // Memoized resend confirmation handler
    const handleResendConfirmation = useCallback(async () => {
        setConfirmationMessage(null);
        if (!email) {
            setConfirmationMessage("Please enter your email above.");
            return;
        }
        try {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email: email,
            });
            if (error) {
                setConfirmationMessage(error.message || "Failed to send confirmation email.");
            } else {
                setConfirmationMessage("Confirmation email sent! Please check your inbox.");
            }
        } catch (err: any) {
            setConfirmationMessage(err.message || "Failed to send confirmation email.");
        }
    }, [email]);

    return (
        <section className="flex items-center justify-center w-full pb-8 pt-24 px-4" aria-label="Sign in form">
            <motion.form
                variants={formVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col min-w-[90vw] sm:min-w-[400px] max-w-md mx-auto bg-gradient-to-br from-white/95 to-white/90 dark:from-neutral-900/95 dark:to-neutral-800/90 rounded-2xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-10 border border-white/20 dark:border-neutral-700/50 backdrop-blur-xl"
                noValidate
            >
                <header className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-200 bg-clip-text text-transparent drop-shadow">
                        Sign in
                    </h1>
                    <div className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-center relative">
                        Don't have an account?{" "}
                        <Link
                            className={`text-green-600 dark:text-green-400 font-medium underline hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 ${
                                showEmailNotFound ? "bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-md" : ""
                            }`}
                            href="/sign-up"
                        >
                            Sign up
                        </Link>
                        {showEmailNotFound && (
                            <div className="absolute bottom-6 right-1/3 transform translate-x-[9px] flex items-center">
                                <ArrowDown className="text-yellow-500 dark:text-yellow-400 w-5 h-5 animate-bounce" />
                            </div>
                        )}
                    </div>
                </header>

                {/* Error message display */}
                {formError && (
                    <div
                        className="text-red-600 dark:text-red-400 text-sm text-center mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/50"
                        role="alert"
                    >
                        {formError}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {/* Email field */}
                    <motion.div variants={inputVariants} custom={0}>
                        <Label htmlFor="email" className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300">
                            Email
                        </Label>
                        <Input
                            autoComplete="email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="focus:ring-2 focus:ring-green-500/50 text-base sm:text-lg px-4 py-3 mt-1 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm transition-all hover:border-green-300 dark:hover:border-green-600"
                        />
                    </motion.div>

                    {/* Password field with forgot password link */}
                    <motion.div variants={inputVariants} custom={1}>
                        <div className="flex justify-between items-center mb-1">
                            <Label htmlFor="password" className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300">
                                Password
                            </Label>
                            <Link
                                className="text-xs sm:text-sm text-green-600 dark:text-green-400 underline hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                                href="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                autoComplete="current-password"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (formError && validatePassword(e.target.value)) setFormError(null);
                                }}
                                className="focus:ring-2 focus:ring-green-500/50 text-base sm:text-lg px-4 py-3 mt-1 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm transition-all pr-12 hover:border-green-300 dark:hover:border-green-600"
                                aria-describedby="password-help"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 p-1"
                                tabIndex={-1}
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </motion.div>

                    {/* Password requirements */}
                    <div
                        id="password-help"
                        className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700/50"
                    >
                        Password requirements: at least <span className="text-green-600 dark:text-green-400 font-medium">8 characters</span>
                        , <span className="text-green-600 dark:text-green-400 font-medium">lowercase</span>,{" "}
                        <span className="text-green-600 dark:text-green-400 font-medium">uppercase</span>,{" "}
                        <span className="text-green-600 dark:text-green-400 font-medium">number</span>, and{" "}
                        <span className="text-green-600 dark:text-green-400 font-medium">symbol</span>.
                    </div>

                    {/* Resend confirmation email */}
                    <motion.div variants={inputVariants} custom={2}>
                        <button
                            type="button"
                            className="text-xs text-green-600 dark:text-green-400 underline hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 self-start"
                            onClick={handleResendConfirmation}
                        >
                            Resend confirmation email
                        </button>
                        {confirmationMessage && (
                            <div className="text-green-600 dark:text-green-400 text-xs mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800/50">
                                {confirmationMessage}
                            </div>
                        )}
                    </motion.div>

                    {/* hCaptcha verification */}
                    <motion.div variants={inputVariants} custom={3} className="flex justify-center flex-col items-center">
                        <div className="rounded-lg overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700/50">
                            <HCaptcha
                                ref={hcaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
                                onVerify={handleCaptchaVerify}
                                onExpire={handleCaptchaExpire}
                                onError={handleCaptchaError}
                                theme="light"
                                size="normal"
                                reCaptchaCompat={false}
                            />
                        </div>
                        {/* Captcha-specific error message */}
                        {captchaError && (
                            <div className="text-red-600 dark:text-red-400 text-xs text-center mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800/50">
                                {captchaError}
                            </div>
                        )}
                    </motion.div>

                    {/* Submit button */}
                    <motion.div variants={inputVariants} custom={4} className="mt-6">
                        <SubmitButton
                            pendingText="Signing In..."
                            disabled={!hcaptchaToken}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-400 dark:hover:from-green-600 dark:hover:to-green-500 disabled:from-neutral-400 disabled:to-neutral-400 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25 dark:shadow-green-400/25 text-base sm:text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign in
                        </SubmitButton>
                    </motion.div>

                    {/* Form message */}
                    <FormMessage message={searchParams} />
                </div>
            </motion.form>
        </section>
    );
});

// Display name for dev tools
SignInForm.displayName = "SignInForm";

export default SignInForm;
