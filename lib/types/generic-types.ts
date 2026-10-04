// General Web Types
export type TechStackName =
    | "Next.js"
    | "JavaScript"
    | "TypeScript"
    | "TailwindCSS"
    | "Vercel"
    | "Clerkjs"
    | "Shopify"
    | "Liquid"
    | "Stripe"
    | "Emailjs"
    | "Sanity.io"
    | "Supabase"
    | "Resend";

export type AvailablePlansType = "Studio Basic" | "Studio Plus" | "Studio Pro" | "Studio Commerce";
export type NavMenuType = {
    title: string;
    link: string;
};

export type EmailResponseProps = {
    success: boolean;
    data?: any;
    error?: any;
};

export type EmailTemplateParamsType = {
    name: string;
    email: string;
    plan: string;
};

// For infinite queries
export type PagedResult<T> = { data: T[]; nextCursor?: string };
