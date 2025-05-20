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
    overview: string;
    release_date: string;
    link: string; // Add link property
    backdrop_path: any;
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
