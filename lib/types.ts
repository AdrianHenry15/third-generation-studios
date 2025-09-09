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
    tech_stack: string[];
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

export type AvailablePlansType = "Studio Basic" | "Studio Plus" | "Studio Pro" | "Studio Commerce";
