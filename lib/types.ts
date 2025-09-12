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

export interface EmailResponse {
    success: boolean;
    data?: any;
    error?: any;
}

export interface EmailTemplateParams {
    name: string;
    email: string;
    plan: string;
    productDescription: string;
}

export type TrackType = {
    id: number;
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    source: string;
    duration: string;
    year: number | string;
    genre: string;
    locked: boolean;
};
