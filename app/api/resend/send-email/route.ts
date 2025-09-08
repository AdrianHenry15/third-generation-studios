import EmailTemplate from "@/components/forms/email-templates/email-template";
import { EmailTemplateParams } from "@/lib/types";
import { Resend } from "resend";

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    try {
        const body = (await request.json()) as EmailTemplateParams;
        const { name, email, plan, productDescription } = body;

        if (!name || !email || !plan || !productDescription) {
            return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const formatSentenceCase = (str: string) =>
            str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
        const formattedPlan = formatSentenceCase(plan);

        const { data, error } = await resend.emails.send({
            from: `${formattedPlan} Client <ahenry@thirdgenerationstudios.com>`,
            to: ["ahenry@thirdgenerationstudios.com"],
            subject: "Third Generation Studios - Form Submission",
            react: EmailTemplate({ name, email, plan: formattedPlan, productDescription }),
        });

        if (error) {
            return Response.json({ success: false, error }, { status: 500 });
        }

        return Response.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error("API /api/resend/send-email error:", error);
        return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
