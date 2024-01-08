import { WebsiteProjectType } from "./types";

import Mollys from "@/public/websites/mollys-edit.png";
import Brite from "@/public/websites/brite-edit.png";
import TaharkaDemo from "@/public/websites/taharka-vercel-shopify-edit.png";
import TaharkaShopify from "@/public/websites/taharka-shopify-edit.png";
import Zoo from "@/public/websites/zookeeper-edit.png";
import Gameboy from "@/public/websites/gameboy-edit.png";
import Osk from "@/public/websites/osk-edit.png";
import Calendar from "@/public/websites/calendar-edit.png";
import Taskmaster from "@/public/websites/taskmaster-edit.png";
import Taskinator from "@/public/websites/taskinator-edit.png";
import GitBook from "@/public/websites/git-book-edit.png";
import BudgetTracker from "@/public/websites/budget-tracker-edit.png";
import Portfolio from "@/public/websites/past-portfolio-edit.png";

export const PersonalProjects: WebsiteProjectType[] = [
    {
        id: 1,
        img: Gameboy,
        title: "Sound Boy",
        genre: "Website",
        technologies: "React, SCSS, TypeScript, Git, GitHub",
        description: "A Gameboy Display Application",
        year: "Last Updated: 2023",
        link: "https://gameboy-sim.vercel.app/",
    },
    {
        id: 2,
        img: Portfolio,
        title: "Past Portfolio",
        genre: "Website",
        technologies: "React, TailwindCSS JavaScript, Git, Github, HTML",
        description: "A Portfolio",
        year: "Last Updated: 2022",
        link: "https://react-portfolio-2.vercel.app/",
    },
];
export const SchoolProjects: WebsiteProjectType[] = [
    {
        id: 1,
        img: Zoo,
        title: "Zoo Keeper Store",
        genre: "Website",
        technologies: "JavaScript, Insomnia, Vercel, Node, Express, Git, GitHub",
        description: "An Ice Cream Shop Application",
        year: "Last Updated: 2022",
        link: "https://zookeepr.vercel.app/",
    },
    {
        id: 2,
        img: Osk,
        title: "Zoo Keeper Store",
        genre: "Website",
        technologies: "JavaScript, Handlebars, CSS, Node, Express, MySQL, Sequelize, Heroku, JawsDB, Git, GitHub",
        description: "An Animal Organization Application",
        year: "Last Updated: 2022",
        link: "https://zookeepr.vercel.app/",
    },
    {
        id: 3,
        img: Calendar,
        title: "Calendar Application",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, Moment.js, jQuery, Git, GitHub",
        description: "A Calendar Application",
        year: "Last Updated: 2022",
        link: "https://adrianhenry15.github.io/Calendar-Application/",
    },
    {
        id: 4,
        img: Taskmaster,
        title: "Taskmaster Pro",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, jQuery, Git, GitHub",
        description: "A Tasking Application",
        year: "Last Updated: 2022",
        link: "https://adrianhenry15.github.io/Task-Master-Pro-App/",
    },
    {
        id: 5,
        img: Taskinator,
        title: "Taskinator",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, Web Storage API, Git, GitHub",
        description: "A Tasking Application",
        year: "Last Updated: 2022",
        link: "https://adrianhenry15.github.io/Taskinator-Website/",
    },
    {
        id: 6,
        img: GitBook,
        title: "Git Book",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, Server-Side APIs, Git, GitHub",
        description: "A Github Search Application",
        year: "Last Updated: 2022",
        link: "https://adrianhenry15.github.io/Git-Book/",
    },
    {
        id: 7,
        img: BudgetTracker,
        title: "Budget Tracker",
        genre: "Website",
        technologies: "HTML, CSS, Node, Mongoose, IndexedDB, Service Workers, Express, JavaScript, Git, GitHub",
        description: "A Budget Tracker Application",
        year: "Last Updated: 2022",
        link: "https://budget-tracker-nn0wutpe9-adrianhenry15.vercel.app/",
    },
];

export const ClientProjects: WebsiteProjectType[] = [
    {
        id: 1,
        img: Mollys,
        title: "Molly's Specialty Sweets",
        genre: "Website",
        technologies: "JavaScript, TypeScript, React, Nextjs, TailwindCSS, Vercel, Git, GitHub",
        description: "A Bakery Application",
        year: "Last Updated: 2024",
        link: "https://mollyspecialtysweets-git-main-adrianhenry15.vercel.app/",
    },
    {
        id: 2,
        img: Brite,
        title: "Brite Lighting LLC",
        genre: "Website",
        technologies: "JavaScript, TypeScript, React, Nextjs, TailwindCSS, Vercel, Git, GitHub",
        description: "A Building Maintenance Application",
        year: "Last Updated: 2024",
        link: "https://brite-adrianhenry15.vercel.app/",
    },
    {
        id: 3,
        img: TaharkaDemo,
        title: "Taharka Demo",
        genre: "Website",
        technologies: "JavaScript, TypeScript, React, Nextjs, TailwindCSS, Shopify, Vercel, Git, GitHub",
        description: "An Ice Cream Shop Application",
        year: "Last Updated: 2024",
        link: "https://taharka-abh3na2sk-adrianhenry15.vercel.app/",
    },
    {
        id: 4,
        img: TaharkaShopify,
        title: "Taharka Shopify Store",
        genre: "Website",
        technologies: "Shopify",
        description: "An Ice Cream Shop Application",
        year: "Last Updated: 2023",
        link: "https://taharkabrothers.com/",
    },
];
