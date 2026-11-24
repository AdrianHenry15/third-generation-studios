import { NextResponse } from "next/server";

import { sendContactEmails, type ContactSubmission } from "@/lib/email-service";

export const runtime = "nodejs";

const MAX_REQUEST_SIZE = 25_000;

const serviceOptions = [
    "Web Design & Development",
    "Custom CRM & Business Systems",
    "SEO & Lead Tracking",
    "Website Care",
    "Other",
];

function getString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        const contentLength = Number(request.headers.get("content-length") || 0);

        if (contentLength > MAX_REQUEST_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    message: "The submission is too large.",
                },
                { status: 413 },
            );
        }

        const payload = (await request.json()) as Record<string, unknown>;

        /*
         * Honeypot field. Bots commonly fill every input.
         * Return success so they do not repeatedly retry.
         */
        if (getString(payload.website)) {
            return NextResponse.json({
                success: true,
                message: "Your project inquiry was submitted successfully.",
            });
        }

        const name = getString(payload.name);
        const email = getString(payload.email);
        const company = getString(payload.company);
        const service = getString(payload.service);
        const budget = getString(payload.budget);
        const message = getString(payload.message);

        const privacyAccepted = payload.privacyAccepted === true;

        if (name.length < 2) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter your name.",
                },
                { status: 400 },
            );
        }

        if (name.length > 100) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Your name is too long.",
                },
                { status: 400 },
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address.",
                },
                { status: 400 },
            );
        }

        if (email.length > 200) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Your email address is too long.",
                },
                { status: 400 },
            );
        }

        if (company.length > 150) {
            return NextResponse.json(
                {
                    success: false,
                    message: "The company name is too long.",
                },
                { status: 400 },
            );
        }

        if (!serviceOptions.includes(service)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please select a valid service.",
                },
                { status: 400 },
            );
        }

        if (budget.length > 100) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please select a valid budget.",
                },
                { status: 400 },
            );
        }

        if (!message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter your project details.",
                },
                { status: 400 },
            );
        }

        if (message.length > 5_000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Your project description is too long.",
                },
                { status: 400 },
            );
        }

        if (!privacyAccepted) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please accept the privacy agreement.",
                },
                { status: 400 },
            );
        }

        const submission: ContactSubmission = {
            name,
            email,
            company: company || undefined,
            service,
            budget: budget || undefined,
            message,
        };

        const token = getString(payload.turnstileToken);

        if (!token || token.length > 2048) {
            return NextResponse.json({ success: false, message: "Please complete the verification and try again." }, { status: 400 });
        }

        const secret = process.env.TURNSTILE_SECRET_KEY;
        const expectedHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME;

        if (!secret || (process.env.NODE_ENV === "production" && !expectedHostname)) {
            throw new Error("Turnstile is missing required configuration.");
        }

        const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: new URLSearchParams({ secret, response: token }),
            signal: AbortSignal.timeout(5000),
        });

        if (!verification.ok) {
            throw new Error("Turnstile verification service is unavailable.");
        }

        const result = (await verification.json()) as {
            success?: boolean;
            hostname?: string;
            action?: string;
        };

        if (result.success !== true || (expectedHostname && (result.hostname !== expectedHostname || result.action !== "contact"))) {
            return NextResponse.json({ success: false, message: "Verification failed. Please try again." }, { status: 400 });
        }

        /*
         * Keep the app key server-side so visitors cannot
         * select another application's configuration.
         */
        await sendContactEmails("tgs", submission);

        return NextResponse.json({
            success: true,
            delivered: true,
            message: "Your project inquiry was submitted successfully.",
        });
    } catch (error) {
        console.error("Contact form submission failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "We couldn't submit your message. Please try again shortly.",
            },
            { status: 500 },
        );
    }
}
