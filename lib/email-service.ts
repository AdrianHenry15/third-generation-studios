"use server";
import { EmailResponse, EmailTemplateParams } from "../lib/types";

const sendEmail = async (params: EmailTemplateParams): Promise<EmailResponse> => {
    try {
        const isServer = typeof window === "undefined";
        const baseUrl = isServer ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
        const response = await fetch(`${baseUrl}/api/resend/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data: EmailResponse = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to send email");
        }
        return data;
    } catch (error) {
        return { success: false, error };
    }
};

const sendConfirmationEmail = async (params: EmailTemplateParams): Promise<EmailResponse> => {
    try {
        const isServer = typeof window === "undefined";
        const baseUrl = isServer ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
        const response = await fetch(`${baseUrl}/api/resend/send-email-confirmation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        const data: EmailResponse = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to send confirmation email");
        }
        return data;
    } catch (error) {
        return { success: false, error };
    }
};

const subscribeToNewsletter = async ({ email, name }: { email: string; name?: string }): Promise<{ success: boolean; error?: any }> => {
    try {
        const isServer = typeof window === "undefined";
        const baseUrl = isServer ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
        const response = await fetch(`${baseUrl}/api/resend/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to subscribe to newsletter");
        }
        return data;
    } catch (error) {
        return { success: false, error };
    }
};

export { sendConfirmationEmail, subscribeToNewsletter };
export default sendEmail;
