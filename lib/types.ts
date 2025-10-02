export * from "./solo-queue-types/analytics-types";
export * from "./solo-queue-types/billing-types";
export * from "./solo-queue-types/public-types";
export * from "./solo-queue-types/music-types";

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

export type FaqType = {
    question: string;
    answer: string;
};

export type WebsiteType = {
    id: string;
    img: any;
    title: string;
    description: string;
    release_date: string;
    link: string; // Add link property
    tech_stack: TechStackName[];
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
    product_description: string;
};

// For infinite queries
export type PagedResult<T> = { data: T[]; nextCursor?: string };
