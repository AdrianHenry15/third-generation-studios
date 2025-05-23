import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";
import { EmailTemplateParams } from "../../../lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as EmailTemplateParams;
        const { name, email, plan, productDescription } = body;

        if (!name || !email || !plan || !productDescription) {
            return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const formatSentenceCase = (str: string) =>
            str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
        const formattedProductDescription = formatSentenceCase(productDescription);

        const { data, error } = await resend.emails.send({
            from: `${formattedProductDescription} Client <ahenry@thirdgenerationstudios.com>`,
            to: [email],
            subject: "Third Generation Studios - Form Submission",
            react: EmailTemplate({ name, email, plan, productDescription: formattedProductDescription }),
        });

        if (error) {
            return Response.json({ success: false, error }, { status: 500 });
        }

        return Response.json({ success: true, data }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
