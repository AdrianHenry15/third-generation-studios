import { ArtistType, SongType, WebsiteType } from "./types";

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

// ARTIST IMAGES
import Search from "@/public/music/plane.jpg";
// MUSIC IMAGES
import Jack from "@/public/music/jack.jpg";
import Succession from "@/public/music/succession.jpg";
import Timb from "@/public/music/timb.jpg";
import Uzi from "@/public/music/uzivert.jpg";
import Lotus from "@/public/music/wlotus.jpg";

// AUDIO FILES

export const PersonalProjects: WebsiteType[] = [
    {
        id: "website-1",
        img: Gameboy,
        title: "Sound Boy",
        overview: "A Gameboy Display Application",
        release_date: "2023",
        link: "https://gameboy-sim.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "website-2",
        img: Portfolio,
        title: "Past Portfolio",
        overview: "A Portfolio",
        release_date: "2022",
        link: "https://react-portfolio-2.vercel.app/",
        backdrop_path: "",
    },
];
export const SchoolProjects: WebsiteType[] = [
    {
        id: "website-3",
        img: Zoo,
        title: "Zoo Keeper Store",
        overview: "An Ice Cream Shop Application",
        release_date: "2022",
        link: "https://zookeepr.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "website-4",
        img: Calendar,
        title: "Calendar Application",
        overview: "A Calendar Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Calendar-Application/",
        backdrop_path: "",
    },
    {
        id: "website-5",
        img: Taskmaster,
        title: "Taskmaster Pro",
        overview: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Task-Master-Pro-App/",
        backdrop_path: "",
    },
    {
        id: "website-6",
        img: Taskinator,
        title: "Taskinator",
        overview: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Taskinator-Website/",
        backdrop_path: "",
    },
    {
        id: "website-7",
        img: GitBook,
        title: "Git Book",
        overview: "A Github Search Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Git-Book/",
        backdrop_path: "",
    },
    {
        id: "website-8",
        img: BudgetTracker,
        title: "Budget Tracker",
        overview: "A Budget Tracker Application",
        release_date: "2022",
        link: "https://budget-tracker-nn0wutpe9-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
];

export const ClientProjects: WebsiteType[] = [
    {
        id: "website-9",
        img: Mollys,
        title: "Molly's Specialty Sweets",
        overview: "A Bakery Application",
        release_date: "2024",
        link: "https://mollyspecialtysweets-git-main-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "website-10",
        img: Brite,
        title: "Brite Lighting LLC",
        overview: "A Building Maintenance Application",
        release_date: "2024",
        link: "https://brite-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "website-11",
        img: TaharkaDemo,
        title: "Taharka Demo",
        overview: "An Ice Cream Shop Application",
        release_date: "2024",
        link: "https://taharka-abh3na2sk-adrianhenry15.vercel.app/",
        backdrop_path: "",
    },
    {
        id: "website-12",
        img: TaharkaShopify,
        title: "Taharka Shopify Store",
        overview: "An Ice Cream Shop Application",
        release_date: "2023",
        link: "https://taharkabrothers.com/",
        backdrop_path: "",
    },
];

export const Artists: ArtistType[] = [
    {
        id: "artist-1",
        img: Search,
        title: "Search",
        overview: "An Artist",
        release_date: "2024",
        songs: [],
        backdrop_path: "",
    },
    {
        id: "artist-2",
        img: Search,
        title: "Jafarri",
        overview: "An Artist",
        release_date: "2024",
        songs: [],
        backdrop_path: "",
    },
];

export const JafarriProjects: SongType[] = [
    {
        id: "song-1",
        img: Jack,
        title: "Song 1",
        overview: "",
        artist: "Original",
        release_date: "2021",
        audio_file: "",
        backdrop_path: "",
    },
];

export const SearchOriginalProjects: SongType[] = [
    {
        id: "a-long-run",
        img: Jack,
        title: "A Long Run",
        overview: "",
        artist: "Search",
        release_date: "2021",
        audio_file: "../audio-files/a-long-run-cminor-88bpm.wav",
        backdrop_path: "",
    },
    {
        id: "artist-3",
        img: Timb,
        title: "Song 2",
        overview: "",
        artist: "Original",
        release_date: "2021",
        audio_file: "../audio-files/aggro-120bpm-gminor.wav",
        backdrop_path: "",
    },
];
