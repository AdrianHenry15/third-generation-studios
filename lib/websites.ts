import { WebsiteType } from "./types/generic-types";

// WEBSITES IMAGES
import Mollys from "@/public/websites/mollys.jpg";
import Alexandria from "@/public/websites/alexandria.png";
import Brite from "@/public/websites/brite.png";
import TaharkaDemo from "@/public/websites/taharkabros1.webp";
import TaharkaShopify from "@/public/websites/taharkabros2.jpg";
import EGSImg from "@/public/websites/egs-screenshot.png";

export const DemoWebsites: WebsiteType[] = [];

export const ClientWebsites: WebsiteType[] = [
    {
        id: "cw-1",
        img: Alexandria,
        title: "Project Alexandria",
        description:
            "An innovative eReader platform that transforms text into vivid AI-generated images, enhancing reading with immersive visual storytelling.",
        release_date: "2025",
        link: "https://projectalexandria.ai/",
        tech_stack: ["Next.js", "TypeScript", "TailwindCSS", "Vercel", "Supabase", "Resend", "Stripe"],
    },
    {
        id: "cw-2",
        img: Mollys,
        title: "Molly's Specialty Sweets",
        description: "A custom bakery web app for online orders, menu browsing, and customer engagement.",
        release_date: "2024",
        link: "https://mollyspecialtysweets.com/",
        tech_stack: ["Next.js", "TypeScript", "TailwindCSS", "Vercel", "Clerkjs", "Stripe"],
    },
    {
        id: "cw-3",
        img: Brite,
        title: "Brite Lighting LLC",
        description: "A modern business site for a building maintenance company, featuring service listings and contact forms.",
        release_date: "2024",
        link: "https://www.briteclt.com/",
        tech_stack: ["Next.js", "TailwindCSS", "Sanity.io", "Clerkjs"],
    },
    {
        id: "cw-4",
        img: TaharkaDemo,
        title: "Taharka Demo",
        description: "Demo e-commerce platform for an ice cream shop, with product showcase and ordering features.",
        release_date: "2024",
        link: "https://taharka-abh3na2sk-adrianhenry15.vercel.app/",
        tech_stack: ["Next.js", "TypeScript", "Stripe", "TailwindCSS"],
    },
    {
        id: "cw-5",
        img: TaharkaShopify,
        title: "Taharka Shopify Store",
        description: "Official Shopify-powered storefront for Taharka Brothers, supporting online sales and inventory.",
        release_date: "2023",
        link: "https://taharkabrothers.com/",
        tech_stack: ["Shopify", "Liquid", "JavaScript"],
    },
    {
        id: "cw-6",
        img: EGSImg,
        title: "EGS Equipment",
        description: "Corporate site for a grass maintenance solutions company, with product info and contact options.",
        release_date: "2025",
        link: "https://www.eckertgolf.com/",
        tech_stack: ["Next.js", "TypeScript", "TailwindCSS"],
    },
];
