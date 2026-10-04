import { Resend } from "resend";

const emailApps = {
    tgs: {
        name: "Third Generation Studios",
        from: process.env.TGS_CONTACT_FROM,
        recipient: process.env.TGS_CONTACT_TO,
    },
} as const;

export type EmailApp = keyof typeof emailApps;

export type ContactSubmission = {
    name: string;
    email: string;
    company?: string;
    service: string;
    budget?: string;
    message: string;
};

let resendClient: Resend | null = null;

function getResend() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not configured.");
    }

    resendClient ??= new Resend(apiKey);

    return resendClient;
}

function getEmailApp(app: EmailApp) {
    const config = emailApps[app];

    if (!config.from || !config.recipient) {
        throw new Error(`Email settings for "${app}" are not configured.`);
    }

    return {
        ...config,
        from: config.from,
        recipient: config.recipient,
    };
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatMessage(value: string) {
    return escapeHtml(value).replaceAll("\n", "<br />");
}

function buildTeamEmail(appName: string, submission: ContactSubmission) {
    const name = escapeHtml(submission.name);
    const email = escapeHtml(submission.email);
    const company = escapeHtml(submission.company || "Not provided");
    const service = escapeHtml(submission.service);
    const budget = escapeHtml(submission.budget || "Not provided");
    const message = formatMessage(submission.message);

    return `
        <!doctype html>
        <html>
            <body style="margin:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#18181b;">
                <div style="padding:40px 16px;">
                    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:20px;overflow:hidden;">
                        <div style="padding:28px 32px;background:#18181b;color:#ffffff;">
                            <p style="margin:0 0 8px;color:#c4b5fd;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                                ${appName}
                            </p>

                            <h1 style="margin:0;font-size:26px;line-height:1.3;">
                                New project inquiry
                            </h1>
                        </div>

                        <div style="padding:32px;">
                            <table style="width:100%;border-collapse:collapse;">
                                <tr>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">
                                        Name
                                    </td>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;text-align:right;font-weight:600;">
                                        ${name}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">
                                        Email
                                    </td>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;text-align:right;">
                                        <a href="mailto:${email}" style="color:#7c3aed;text-decoration:none;">
                                            ${email}
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">
                                        Company
                                    </td>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;text-align:right;font-weight:600;">
                                        ${company}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">
                                        Service
                                    </td>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;text-align:right;font-weight:600;">
                                        ${service}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;">
                                        Budget
                                    </td>
                                    <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;text-align:right;font-weight:600;">
                                        ${budget}
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-top:28px;">
                                <p style="margin:0 0 10px;color:#71717a;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
                                    Project details
                                </p>

                                <div style="padding:20px;background:#f4f4f5;border-radius:12px;font-size:15px;line-height:1.7;">
                                    ${message}
                                </div>
                            </div>

                            <a
                                href="mailto:${email}"
                                style="display:inline-block;margin-top:28px;padding:13px 22px;background:#7c3aed;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700;"
                            >
                                Reply to ${name}
                            </a>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;
}

function buildConfirmationEmail(appName: string, submission: ContactSubmission) {
    const name = escapeHtml(submission.name);
    const service = escapeHtml(submission.service);

    return `
        <!doctype html>
        <html>
            <body style="margin:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#18181b;">
                <div style="padding:40px 16px;">
                    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:20px;overflow:hidden;">
                        <div style="padding:32px;background:#7c3aed;color:#ffffff;">
                            <p style="margin:0 0 8px;color:#ede9fe;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                                ${appName}
                            </p>

                            <h1 style="margin:0;font-size:28px;line-height:1.3;">
                                We received your message.
                            </h1>
                        </div>

                        <div style="padding:32px;">
                            <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">
                                Hi ${name},
                            </p>

                            <p style="margin:0 0 18px;color:#52525b;font-size:15px;line-height:1.7;">
                                Thank you for contacting ${appName}. Your inquiry
                                about <strong>${service}</strong> was submitted
                                successfully.
                            </p>

                            <p style="margin:0;color:#52525b;font-size:15px;line-height:1.7;">
                                We’ll review the details and typically respond
                                within one to two business days.
                            </p>

                            <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e4e4e7;">
                                <p style="margin:0;font-size:14px;font-weight:700;">
                                    Third Generation Studios
                                </p>

                                <p style="margin:6px 0 0;color:#71717a;font-size:13px;">
                                    Websites, business systems, and creative technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;
}

export async function sendContactEmails(app: EmailApp, submission: ContactSubmission) {
    const resend = getResend();
    const config = getEmailApp(app);

    const { data, error } = await resend.batch.send([
        {
            from: config.from,
            to: config.recipient,
            replyTo: submission.email,
            subject: `New ${submission.service} inquiry from ${submission.name}`,
            html: buildTeamEmail(config.name, submission),
        },
        {
            from: config.from,
            to: submission.email,
            replyTo: config.recipient,
            subject: `We received your message | ${config.name}`,
            html: buildConfirmationEmail(config.name, submission),
        },
    ]);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
