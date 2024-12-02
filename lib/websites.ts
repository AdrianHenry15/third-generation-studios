import { WebsiteType } from "./types";

// WEBSITES IMAGES
import Mollys from "@/public/websites/mollys.jpg";
import Brite from "@/public/websites/brite.png";
import TaharkaDemo from "@/public/websites/taharkabros1.webp";
import TaharkaShopify from "@/public/websites/taharkabros2.jpg";
import Zoo from "@/public/websites/zoo.png";
import Gameboy from "@/public/websites/gameboy.png";
import Calendar from "@/public/websites/calendar.png";
import Taskmaster from "@/public/websites/task-app-2.png";
import Taskinator from "@/public/websites/task-app-1.png";
import GitBook from "@/public/websites/git-book.png";
import BudgetTracker from "@/public/websites/budget-tracker.png";
import Portfolio from "@/public/websites/past-portfolio.png";
import EGSImg from "@/public/websites/egs-screenshot.png";

// AUDIO FILES

export const PersonalWebsites: WebsiteType[] = [
    {
        id: "pw-1",
        img: Gameboy,
        title: "Sound Boy",
        overview: "A Gameboy Display Application",
        release_date: "2023",
        link: "https://gameboy-sim.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "pw-2",
        img: Portfolio,
        title: "Past Portfolio",
        overview: "A Portfolio",
        release_date: "2022",
        link: "https://react-portfolio-2.vercel.app/",
        backdrop_path: "",
    },
];
export const SchoolWebsites: WebsiteType[] = [
    {
        id: "sc-3",
        img: Zoo,
        title: "Zoo Keeper Store",
        overview: "An Ice Cream Shop Application",
        release_date: "2022",
        link: "https://zookeepr.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "sc-4",
        img: Calendar,
        title: "Calendar Application",
        overview: "A Calendar Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Calendar-Application/",
        backdrop_path: "",
    },
    {
        id: "sc-5",
        img: Taskmaster,
        title: "Taskmaster Pro",
        overview: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Task-Master-Pro-App/",
        backdrop_path: "",
    },
    {
        id: "sc-6",
        img: Taskinator,
        title: "Taskinator",
        overview: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Taskinator-Website/",
        backdrop_path: "",
    },
    {
        id: "sc-7",
        img: GitBook,
        title: "Git Book",
        overview: "A Github Search Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Git-Book/",
        backdrop_path: "",
    },
    {
        id: "sc-8",
        img: BudgetTracker,
        title: "Budget Tracker",
        overview: "A Budget Tracker Application",
        release_date: "2022",
        link: "https://budget-tracker-nn0wutpe9-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
];

export const ClientWebsites: WebsiteType[] = [
    {
        id: "cw-1",
        img: Mollys,
        title: "Molly's Specialty Sweets",
        overview: "A Bakery Application",
        release_date: "2024",
        link: "https://mollyspecialtysweets-git-main-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "cw-2",
        img: Brite,
        title: "Brite Lighting LLC",
        overview: "A Building Maintenance Application",
        release_date: "2024",
        link: "https://brite-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "cw-3",
        img: TaharkaDemo,
        title: "Taharka Demo",
        overview: "An Ice Cream Shop Application",
        release_date: "2024",
        link: "https://taharka-abh3na2sk-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "cw-4",
        img: TaharkaShopify,
        title: "Taharka Shopify Store",
        overview: "An Ice Cream Shop Application",
        release_date: "2023",
        link: "https://taharkabrothers.com/",
        backdrop_path: "",
    },
    {
        id: "cw-5",
        img: EGSImg,
        title: "EGS Equipment",
        overview: "A Grass Maintenance Solutions Company",
        release_date: "2025",
        link: "https://eckert-equipment.vercel.app/",
        backdrop_path: "",
    },
];
