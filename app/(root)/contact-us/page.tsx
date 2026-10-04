import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Clock3, Mail, MessageSquare } from "lucide-react";

import ContactForm from "@/components/forms/contact-form";

export const metadata: Metadata = {
    title: "Contact | Third Generation Studios",
    description: "Tell Third Generation Studios about your website, CRM, design, music, Unity, or 3D project.",
};

const benefits = ["Clear project recommendations", "Straightforward pricing and scope", "No-pressure introductory conversation"];

export default function ContactUsPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
            <section className="relative isolate border-b border-gray-200 dark:border-white/10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 sm:pb-24 sm:pt-40 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Contact TGS</p>

                        <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                            Let’s build something useful.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
                            Tell us what you are building, improving, or trying to simplify. We’ll help you identify the right place to
                            start.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
                {/* Contact information */}
                <aside className="space-y-6">
                    <div className="rounded-[2rem] bg-gray-950 p-8 text-white sm:p-10 dark:bg-white dark:text-gray-950">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 dark:bg-gray-950/10">
                            <MessageSquare className="size-5" aria-hidden="true" />
                        </div>

                        <h2 className="mt-8 text-2xl font-semibold tracking-tight">Start with a conversation.</h2>

                        <p className="mt-4 text-sm leading-7 text-gray-300 dark:text-gray-600">
                            You don’t need a finished plan or technical requirements. Give us the idea, problem, or goal and we’ll help
                            organize the next steps.
                        </p>

                        <ul className="mt-8 space-y-4">
                            {benefits.map((benefit) => (
                                <li key={benefit} className="flex items-center gap-3 text-sm">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300 dark:bg-violet-100 dark:text-violet-700">
                                        <Check className="size-3.5" aria-hidden="true" />
                                    </span>

                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-7 dark:border-white/10 dark:bg-white/[0.035]">
                        <CalendarDays className="size-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />

                        <h2 className="mt-5 text-xl font-semibold">Prefer to talk?</h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            Schedule a short introductory call and we’ll discuss your project, goals, and potential next steps.
                        </p>

                        <a
                            href="https://cal.com/ahenry-tgs"
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-950 transition hover:text-violet-600 dark:text-white dark:hover:text-violet-400"
                        >
                            Book an intro call
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </a>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <a
                            href="mailto:contact@thirdgenerationstudios.com"
                            className="rounded-3xl border border-gray-200 p-6 transition hover:border-violet-300 hover:bg-violet-50/50 dark:border-white/10 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/5"
                        >
                            <Mail className="size-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />

                            <p className="mt-4 text-sm font-semibold">Email us directly</p>

                            <p className="mt-1 break-all text-xs text-gray-500 dark:text-gray-400">contact@thirdgenerationstudios.com</p>
                        </a>

                        <div className="rounded-3xl border border-gray-200 p-6 dark:border-white/10">
                            <Clock3 className="size-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />

                            <p className="mt-4 text-sm font-semibold">Response time</p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Usually within 1–2 business days</p>
                        </div>
                    </div>
                </aside>

                {/* Contact form */}
                <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-950/5 sm:p-10 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-black/20">
                    <div className="mb-8 border-b border-gray-200 pb-8 dark:border-white/10">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
                            Project inquiry
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Tell us about your project.</h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            Share as much or as little as you currently know. We’ll follow up with the most useful next questions.
                        </p>
                    </div>

                    <ContactForm />

                    <p className="mt-6 text-xs leading-5 text-gray-500 dark:text-gray-500">
                        By submitting this form, you agree to be contacted about your inquiry. We won’t add you to a marketing list.
                    </p>
                </div>
            </section>

            <section className="border-t border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                    <div>
                        <p className="font-semibold">Still exploring what you need?</p>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Review our web, CRM, and creative services first.</p>
                    </div>

                    <Link
                        href="/services"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold transition hover:border-violet-500 hover:text-violet-600 dark:border-white/20 dark:hover:border-violet-400 dark:hover:text-violet-400"
                    >
                        Explore services
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
