import { ArtistType, MusicProjectType, WebsiteProjectType } from "./types";

// WEBSITES IMAGES
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

// ARTIST IMAGES
import Search from "@/public/music/plane.jpg";
// MUSIC IMAGES
import Jack from "@/public/music/jack.jpg";
import Succession from "@/public/music/succession.jpg";
import Timb from "@/public/music/timb.jpg";
import Uzi from "@/public/music/uzivert.jpg";
import Lotus from "@/public/music/wlotus.jpg";

export const PersonalProjects: WebsiteProjectType[] = [
    {
        id: "website-1",
        img: Gameboy,
        title: "Sound Boy",
        genre: "Website",
        technologies: "React, SCSS, TypeScript, Git, GitHub",
        description: "A Gameboy Display Application",
        release_date: "2023",
        link: "https://gameboy-sim.vercel.app/",
    },
    {
        id: "website-2",
        img: Portfolio,
        title: "Past Portfolio",
        genre: "Website",
        technologies: "React, TailwindCSS JavaScript, Git, Github, HTML",
        description: "A Portfolio",
        release_date: "2022",
        link: "https://react-portfolio-2.vercel.app/",
    },
];
export const SchoolProjects: WebsiteProjectType[] = [
    {
        id: "website-3",
        img: Zoo,
        title: "Zoo Keeper Store",
        genre: "Website",
        technologies: "JavaScript, Insomnia, Vercel, Node, Express, Git, GitHub",
        description: "An Ice Cream Shop Application",
        release_date: "2022",
        link: "https://zookeepr.vercel.app/",
    },
    {
        id: "website-4",
        img: Calendar,
        title: "Calendar Application",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, Moment.js, jQuery, Git, GitHub",
        description: "A Calendar Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Calendar-Application/",
    },
    {
        id: "website-5",
        img: Taskmaster,
        title: "Taskmaster Pro",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, jQuery, Git, GitHub",
        description: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Task-Master-Pro-App/",
    },
    {
        id: "website-6",
        img: Taskinator,
        title: "Taskinator",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, Web Storage API, Git, GitHub",
        description: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Taskinator-Website/",
    },
    {
        id: "website-7",
        img: GitBook,
        title: "Git Book",
        genre: "Website",
        technologies: "HTML, CSS, JavaScript, Server-Side APIs, Git, GitHub",
        description: "A Github Search Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Git-Book/",
    },
    {
        id: "website-8",
        img: BudgetTracker,
        title: "Budget Tracker",
        genre: "Website",
        technologies: "HTML, CSS, Node, Mongoose, IndexedDB, Service Workers, Express, JavaScript, Git, GitHub",
        description: "A Budget Tracker Application",
        release_date: "2022",
        link: "https://budget-tracker-nn0wutpe9-adrianhenry15.vercel.app/",
    },
];

export const ClientProjects: WebsiteProjectType[] = [
    {
        id: "website-9",
        img: Mollys,
        title: "Molly's Specialty Sweets",
        genre: "Website",
        technologies: "JavaScript, TypeScript, React, Nextjs, TailwindCSS, Vercel, Git, GitHub",
        description: "A Bakery Application",
        release_date: "2024",
        link: "https://mollyspecialtysweets-git-main-adrianhenry15.vercel.app/",
    },
    {
        id: "website-10",
        img: Brite,
        title: "Brite Lighting LLC",
        genre: "Website",
        technologies: "JavaScript, TypeScript, React, Nextjs, TailwindCSS, Vercel, Git, GitHub",
        description: "A Building Maintenance Application",
        release_date: "2024",
        link: "https://brite-adrianhenry15.vercel.app/",
    },
    {
        id: "website-11",
        img: TaharkaDemo,
        title: "Taharka Demo",
        genre: "Website",
        technologies: "JavaScript, TypeScript, React, Nextjs, TailwindCSS, Shopify, Vercel, Git, GitHub",
        description: "An Ice Cream Shop Application",
        release_date: "2024",
        link: "https://taharka-abh3na2sk-adrianhenry15.vercel.app/",
    },
    {
        id: "website-12",
        img: TaharkaShopify,
        title: "Taharka Shopify Store",
        genre: "Website",
        technologies: "Shopify",
        description: "An Ice Cream Shop Application",
        release_date: "2023",
        link: "https://taharkabrothers.com/",
    },
];

export const Artists: ArtistType[] = [
    {
        id: "artist-1",
        img: Search,
        title: "Search",
        genre: "Hip-Hop/Rap",
        description: "An Artist",
        release_date: "2024",
    },
    {
        id: "artist-2",
        img: Search,
        title: "Jafarri",
        genre: "Hip-Hop/Rap",
        description: "An Artist",
        release_date: "2024",
    },
];

export const JafarriProjects: MusicProjectType[] = [
    {
        id: "song-1",
        img: Jack,
        title: "Song 1",
        album_name: "Search",
        artist: "Original",
        genre: "Hip-Hop/Rap",
        release_date: "2021",
        duration: "2:33",
        plays: 0,
        song: "",
    },
];

export const SearchOriginalProjects: MusicProjectType[] = [
    {
        id: "song-2",
        img: Jack,
        title: "Song 1",
        album_name: "Search",
        artist: "Original",
        genre: "Hip-Hop/Rap",
        release_date: "2021",
        duration: "2:33",
        plays: 0,
        song: "",
    },
    {
        id: "artist-3",
        img: Timb,
        title: "Song 2",
        album_name: "Search",
        artist: "Original",
        genre: "Hip-Hop/Rap",
        release_date: "2021",
        duration: "2:33",
        plays: 0,
        song: "",
    },
    {
        id: "artist-4",
        img: Succession,
        title: "Song 3",
        album_name: "Search",
        artist: "Original",
        genre: "Hip-Hop/Rap",
        release_date: "2021",
        duration: "2:33",
        plays: 0,
        song: "",
    },
    {
        id: "artist-5",
        img: Uzi,
        title: "Song 3",
        album_name: "Search",
        artist: "Original",
        genre: "Hip-Hop/Rap",
        release_date: "2021",
        duration: "2:33",
        plays: 0,
        song: "",
    },
    {
        id: "artist-6",
        img: Lotus,
        title: "Song 3",
        album_name: "Search",
        artist: "Original",
        genre: "Hip-Hop/Rap",
        release_date: "2021",
        duration: "2:33",
        plays: 0,
        song: "",
    },
];
