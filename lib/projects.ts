import { ArtistType, SongType, WebsiteType } from "./types";

// WEBSITES IMAGES
import Mollys from "@/public/websites/mollys-edit.png";
import Brite from "@/public/websites/brite-edit.png";
import TaharkaDemo from "@/public/websites/taharka-vercel-shopify-edit.png";
import TaharkaShopify from "@/public/websites/taharka-shopify-edit.png";
import Zoo from "@/public/websites/zookeeper-edit.png";
import Gameboy from "@/public/websites/gameboy-edit.png";
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

export const PersonalProjects: WebsiteType[] = [
    {
        id: "website-1",
        img: Gameboy,
        title: "Sound Boy",
        description: "A Gameboy Display Application",
        release_date: "2023",
        link: "https://gameboy-sim.vercel.app/",
    },
    {
        id: "website-2",
        img: Portfolio,
        title: "Past Portfolio",
        description: "A Portfolio",
        release_date: "2022",
        link: "https://react-portfolio-2.vercel.app/",
    },
];
export const SchoolProjects: WebsiteType[] = [
    {
        id: "website-3",
        img: Zoo,
        title: "Zoo Keeper Store",
        description: "An Ice Cream Shop Application",
        release_date: "2022",
        link: "https://zookeepr.vercel.app/",
    },
    {
        id: "website-4",
        img: Calendar,
        title: "Calendar Application",
        description: "A Calendar Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Calendar-Application/",
    },
    {
        id: "website-5",
        img: Taskmaster,
        title: "Taskmaster Pro",
        description: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Task-Master-Pro-App/",
    },
    {
        id: "website-6",
        img: Taskinator,
        title: "Taskinator",
        description: "A Tasking Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Taskinator-Website/",
    },
    {
        id: "website-7",
        img: GitBook,
        title: "Git Book",
        description: "A Github Search Application",
        release_date: "2022",
        link: "https://adrianhenry15.github.io/Git-Book/",
    },
    {
        id: "website-8",
        img: BudgetTracker,
        title: "Budget Tracker",
        description: "A Budget Tracker Application",
        release_date: "2022",
        link: "https://budget-tracker-nn0wutpe9-adrianhenry15.vercel.app/",
    },
];

export const ClientProjects: WebsiteType[] = [
    {
        id: "website-9",
        img: Mollys,
        title: "Molly's Specialty Sweets",
        description: "A Bakery Application",
        release_date: "2024",
        link: "https://mollyspecialtysweets-git-main-adrianhenry15.vercel.app/",
    },
    {
        id: "website-10",
        img: Brite,
        title: "Brite Lighting LLC",
        description: "A Building Maintenance Application",
        release_date: "2024",
        link: "https://brite-adrianhenry15.vercel.app/",
    },
    {
        id: "website-11",
        img: TaharkaDemo,
        title: "Taharka Demo",
        description: "An Ice Cream Shop Application",
        release_date: "2024",
        link: "https://taharka-abh3na2sk-adrianhenry15.vercel.app/",
    },
    {
        id: "website-12",
        img: TaharkaShopify,
        title: "Taharka Shopify Store",
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
        songs: [],
    },
    {
        id: "artist-2",
        img: Search,
        title: "Jafarri",
        genre: "Hip-Hop/Rap",
        description: "An Artist",
        release_date: "2024",
        songs: [],
    },
];

export const JafarriProjects: SongType[] = [
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

export const SearchOriginalProjects: SongType[] = [
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
