"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, memo, useCallback, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { SubmitButton } from "../submit-button";
import { useHCaptchaStore } from "@/stores/hcaptcha-store";
import { useRouter } from "next/navigation";

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

// Memoized SignUpForm component for build optimization
const SignUpForm = memo(({ searchParams }: { searchParams: Message }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        },
        [setToken],
    );

    // Memoized hCaptcha expiry handler
    const handleCaptchaExpire = useCallback(() => {
        setToken("");
        setFormError("Captcha expired. Please verify again.");
    }, [setToken]);

    // Memoized hCaptcha error handler
    const handleCaptchaError = useCallback(
        (error: string) => {
            setToken("");
            setFormError("Captcha verification failed. Please try again.");
            console.error("hCaptcha error:", error);
        },
        [setToken],
    );

    // Optimized form submission handler
    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setFormError(null);

            // Client-side validation
            if (!validatePassword(password)) {
                setFormError(
                    "Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and symbol.",
                );
                return;
            }

            if (password !== confirmPassword) {
                setFormError("Passwords do not match");
                return;
            }

            // Validate hCaptcha token
            if (!hcaptchaToken) {
                setFormError("Please complete the captcha verification.");
                return;
            }

            // Validate username format (additional client-side check)
            if (username.length < 3) {
                setFormError("Username must be at least 3 characters long.");
                return;
            }

            if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
                setFormError("Username can only contain letters, numbers, underscores, and hyphens.");
                return;
            }

            try {
                const formData = new FormData();
                formData.append("username", username);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("confirm_password", confirmPassword);
                formData.append("hcaptcha_token", hcaptchaToken);

                const result = await signUpAction(formData);

                if (result?.error) {
                    setFormError(result.error);
                    // Reset captcha on server error
                    setToken("");
                    hcaptchaRef.current?.resetCaptcha();
                    return;
                }

                // On success navigate to verification page
                if (result?.success) {
                    // Clear form state before navigation
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setToken("");

                    router.push("/sign-up/verify");
                    return;
                }
            } catch (err: any) {
                setFormError(err.message || "Failed to sign up. Please try again.");
                // Reset captcha on error
                setToken("");
                hcaptchaRef.current?.resetCaptcha();
            }
        },
        [username, email, password, confirmPassword, validatePassword, hcaptchaToken, setToken, router],
    );

    return (
        <section className="flex items-center justify-center w-full pb-8 pt-24 px-4" aria-label="Sign up form">
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
                        Sign up
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-center">
                        Already have an account?{" "}
                        <Link
                            className="text-green-600 dark:text-green-400 font-medium underline hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                            href="/sign-in"
                        >
                            Sign in
                        </Link>
                    </p>
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
                    {/* Username field */}
                    <motion.div variants={inputVariants} custom={0}>
                        <Label htmlFor="username" className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300">
                            Username
                        </Label>
                        <Input
                            autoComplete="username"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                            className="focus:ring-2 focus:ring-green-500/50 text-base sm:text-lg px-4 py-3 mt-1 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm transition-all hover:border-green-300 dark:hover:border-green-600"
                            aria-describedby="username-help"
                            minLength={3}
                            maxLength={30}
                        />
                        <div id="username-help" className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            3-30 characters, letters, numbers, underscores, and hyphens only
                        </div>
                    </motion.div>

                    {/* Email field */}
                    <motion.div variants={inputVariants} custom={1}>
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

                    {/* Password field */}
                    <motion.div variants={inputVariants} custom={2}>
                        <Label htmlFor="password" className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                autoComplete="new-password"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                required
                                title="Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and symbol."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    {/* Confirm Password field */}
                    <motion.div variants={inputVariants} custom={3}>
                        <Label
                            htmlFor="confirm_password"
                            className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300"
                        >
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                autoComplete="new-password"
                                id="confirm_password"
                                type={showConfirm ? "text" : "password"}
                                name="confirm_password"
                                placeholder="Re-enter your password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="focus:ring-2 focus:ring-green-500/50 text-base sm:text-lg px-4 py-3 mt-1 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm transition-all pr-12 hover:border-green-300 dark:hover:border-green-600"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 p-1"
                                tabIndex={-1}
                                onClick={() => setShowConfirm((v) => !v)}
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
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

                    {/* hCaptcha verification */}
                    <motion.div variants={inputVariants} custom={4} className="flex justify-center">
                        <div className="rounded-lg overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700/50">
                            <HCaptcha
                                ref={hcaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                                onVerify={handleCaptchaVerify}
                                onExpire={handleCaptchaExpire}
                                onError={handleCaptchaError}
                                theme="light"
                                size="normal"
                                reCaptchaCompat={false}
                            />
                        </div>
                    </motion.div>

                    {/* Submit button */}
                    <motion.div variants={inputVariants} custom={5} className="mt-6">
                        <SubmitButton
                            pendingText="Creating Account..."
                            disabled={!hcaptchaToken}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-400 dark:hover:from-green-600 dark:hover:to-green-500 disabled:from-neutral-400 disabled:to-neutral-400 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25 dark:shadow-green-400/25 text-base sm:text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Create Account
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
SignUpForm.displayName = "SignUpForm";

export default SignUpForm;
