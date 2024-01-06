import { ProjectType } from "./types";

import Mollys from "@/public/websites/mollys-edit.png";
import Brite from "@/public/websites/brite-edit.png";

export const WebsiteProjects: ProjectType[] = [
    {
        id: 1,
        img: Mollys,
        title: "Molly's Specialty Sweets",
        genre: "Website",
        technologies: "Javascript, Typescript, React, Nextjs, TailwindCSS",
        description: "A Bakery Application",
        year: "Last Updated: 2024",
        link: "https://mollyspecialtysweets-git-main-adrianhenry15.vercel.app/",
    },
    {
        id: 2,
        img: Brite,
        title: "Brite Lighting LLC",
        genre: "Website",
        technologies: "Javascript, Typescript, React, Nextjs, TailwindCSS",
        description: "A Building Maintenance Application",
        year: "Last Updated: 2024",
        link: "https://brite-adrianhenry15.vercel.app/",
    },
];
