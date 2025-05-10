// emailService.ts
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import toast from "react-hot-toast";

type TemplateParams = {
    [key: string]: string | number | boolean;
};

interface EmailResponse {
    success: boolean;
    response?: EmailJSResponseStatus;
    error?: any;
}

const sendEmail = async (
    serviceId: string,
    templateId: string,
    templateParams: TemplateParams,
    publicKey: string
): Promise<EmailResponse> => {
    try {
        const response = await emailjs.send(
            serviceId, 
            templateId, 
            templateParams, 
            publicKey
        );
        
        toast.success("Your estimate has been submitted successfully!");
        return { success: true, response };
    } catch (error) {
        toast.error("There was an error submitting your estimate. Please try again.");
        return { success: false, error };
    }
};

export default sendEmail;