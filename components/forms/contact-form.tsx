"use client";

import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

type ContactPayload = {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    message: string;
    website: string;
    privacyAccepted: boolean;
};

type FormStatus =
    | {
          type: "idle";
          message: "";
      }
    | {
          type: "success" | "error";
          message: string;
      };

const inputStyles = `
    mt-2 w-full rounded-xl border border-gray-300 bg-white
    px-4 py-3 text-sm text-gray-950 outline-none transition
    placeholder:text-gray-400
    hover:border-gray-400
    focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10
    disabled:cursor-not-allowed disabled:opacity-60
    dark:border-white/10 dark:bg-white/[0.04] dark:text-white
    dark:placeholder:text-gray-500 dark:hover:border-white/20
    dark:focus:border-violet-400
`;

const selectStyles = `
    ${inputStyles}
    appearance-none pr-11
    [color-scheme:light]
    dark:[color-scheme:dark]
`;

const optionStyles = "bg-white text-gray-950 dark:bg-gray-900 dark:text-white";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [status, setStatus] = useState<FormStatus>({
        type: "idle",
        message: "",
    });

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload: ContactPayload = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            company: String(formData.get("company") || ""),
            service: String(formData.get("service") || ""),
            budget: String(formData.get("budget") || ""),
            message: String(formData.get("message") || ""),
            website: String(formData.get("website") || ""),
            privacyAccepted: formData.get("privacyAccepted") === "on",
        };

        setIsSubmitting(true);
        setStatus({
            type: "idle",
            message: "",
        });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = (await response.json()) as {
                success?: boolean;
                message?: string;
            };

            if (!response.ok || !result.success) {
                throw new Error(result.message || "We couldn't submit your message.");
            }

            setStatus({
                type: "success",
                message: result.message || "Your project inquiry was submitted successfully.",
            });

            form.reset();
        } catch (error) {
            setStatus({
                type: "error",
                message: error instanceof Error ? error.message : "We couldn't submit your message. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form id="tgs-contact-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field for basic bot protection */}
            <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>

                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                        <span className="ml-1 text-violet-600 dark:text-violet-400">*</span>
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        placeholder="Your name"
                        disabled={isSubmitting}
                        className={inputStyles}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                        <span className="ml-1 text-violet-600 dark:text-violet-400">*</span>
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        placeholder="you@company.com"
                        disabled={isSubmitting}
                        className={inputStyles}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="company" className="text-sm font-medium">
                    Company
                    <span className="ml-2 text-xs font-normal text-gray-500">Optional</span>
                </label>

                <input
                    id="company"
                    name="company"
                    type="text"
                    maxLength={150}
                    autoComplete="organization"
                    placeholder="Company or organization"
                    disabled={isSubmitting}
                    className={inputStyles}
                />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="service" className="text-sm font-medium">
                        What can we help with?
                        <span className="ml-1 text-violet-600 dark:text-violet-400">*</span>
                    </label>

                    <div className="relative">
                        <select id="service" name="service" required defaultValue="" disabled={isSubmitting} className={selectStyles}>
                            <option value="" disabled className={optionStyles}>
                                Select a service
                            </option>

                            <option value="Web Design & Development" className={optionStyles}>
                                Web Design & Development
                            </option>

                            <option value="Custom CRM & Business Systems" className={optionStyles}>
                                Custom CRM & Business Systems
                            </option>

                            <option value="Graphic Design & Branding" className={optionStyles}>
                                Graphic Design & Branding
                            </option>

                            <option value="Music & Audio" className={optionStyles}>
                                Music & Audio
                            </option>

                            <option value="Unity & Interactive Development" className={optionStyles}>
                                Unity & Interactive Development
                            </option>

                            <option value="3D Modeling" className={optionStyles}>
                                3D Modeling
                            </option>

                            <option value="Other" className={optionStyles}>
                                Something else
                            </option>
                        </select>

                        <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-gray-500" aria-hidden="true" />
                    </div>
                </div>

                <div>
                    <label htmlFor="budget" className="text-sm font-medium">
                        Estimated budget
                        <span className="ml-2 text-xs font-normal text-gray-500">Optional</span>
                    </label>

                    <div className="relative">
                        <select id="budget" name="budget" defaultValue="" disabled={isSubmitting} className={selectStyles}>
                            <option value="" className={optionStyles}>
                                Not sure yet
                            </option>

                            <option value="Under $1,000" className={optionStyles}>
                                Under $1,000
                            </option>

                            <option value="$1,000–$3,000" className={optionStyles}>
                                $1,000–$3,000
                            </option>

                            <option value="$3,000–$7,500" className={optionStyles}>
                                $3,000–$7,500
                            </option>

                            <option value="$7,500–$15,000" className={optionStyles}>
                                $7,500–$15,000
                            </option>

                            <option value="$15,000+" className={optionStyles}>
                                $15,000+
                            </option>
                        </select>

                        <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-gray-500" aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="message" className="text-sm font-medium">
                    Project details
                    <span className="ml-1 text-violet-600 dark:text-violet-400">*</span>
                </label>

                <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={7}
                    placeholder="Tell us what you're building, what you need help with, or what you would like to improve."
                    disabled={isSubmitting}
                    className={`${inputStyles} resize-y`}
                />
            </div>

            <label className="flex cursor-pointer items-start gap-3">
                <input
                    name="privacyAccepted"
                    type="checkbox"
                    required
                    disabled={isSubmitting}
                    className="mt-1 size-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-white/20 dark:bg-white/5"
                />

                <span className="text-xs leading-5 text-gray-600 dark:text-gray-400">
                    I agree to be contacted about this inquiry and understand that my information will be used according to the{" "}
                    <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-violet-600 underline underline-offset-2 hover:text-violet-500 dark:text-violet-400"
                    >
                        privacy policy
                    </a>
                    .
                </span>
            </label>

            {status.type !== "idle" && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                        status.type === "success"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
                    }`}
                >
                    {status.type === "success" ? (
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    ) : (
                        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    )}

                    <span>{status.message}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-950 dark:hover:bg-violet-400"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Sending message
                    </>
                ) : (
                    <>
                        Send project inquiry
                        <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-gray-500">Your information is only used to respond to your inquiry.</p>
        </form>
    );
}
