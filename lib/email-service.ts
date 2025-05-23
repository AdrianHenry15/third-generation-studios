"use server";
import { EmailResponse, EmailTemplateParams } from "../lib/types";

const sendEmail = async (params: EmailTemplateParams): Promise<EmailResponse> => {
    try {
        console.log(params);
        const isServer = typeof window === "undefined";
        const baseUrl = isServer ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
        const response = await fetch(`${baseUrl}/api/send`, {
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

export default sendEmail;
