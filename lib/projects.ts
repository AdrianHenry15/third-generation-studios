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
import Search from "@/public/music/backdrops/plane-backdrop.jpg";
// MUSIC IMAGES
import Carmack from "@/public/music/CARMACK.jpg";
import Drake from "@/public/music/drake.jpg";
import Durks from "@/public/music/durks.jpg";
import Inception from "@/public/music/inception.jpg";
import JackHarlow from "@/public/music/jack.jpg";
import Rema from "@/public/music/rema.jpg";
import Succession from "@/public/music/succession.jpg";
import Timb from "@/public/music/timb.jpg";
import TobiLou from "@/public/music/tobi-lou.jpg";
import TrippieRedd from "@/public/music/tredd.jpg";
import TravisScott from "@/public/music/tscotty.jpg";
import UziVert from "@/public/music/uzivert.jpg";
import Lotus from "@/public/music/wlotus.jpg";
import KidCudi from "@/public/music/ye cudi.jpg";
import Future from "@/public/music/futue.jpg";
import Yeat from "@/public/music/yeatt.jpg";
// BACKDROPS
import DrakeBackdrop from "@/public/music/backdrops/drake-backdrop.webp";
import FutureBackdrop from "@/public/music/backdrops/future-backdrop.webp";
import JackHarlowBackdrop from "@/public/music/backdrops/jack-harlow-backdrop.webp";
import KidCudiBackdrop from "@/public/music/backdrops/kid-cudi-backdrop.webp";
import LogicBackdrop from "@/public/music/backdrops/logic-backdrop.webp";
import PlaneBackdrop from "@/public/music/backdrops/plane-backdrop.jpg";
import TimbalandBackdrop from "@/public/music/backdrops/timbaland-backdrop.jpg";
import TobiLouBackdrop from "@/public/music/backdrops/tobi-lou-backdrop.jpg";
import TravisScottBackdrop from "@/public/music/backdrops/travis-scott-backdrop.webp";
import YeatBackdrop from "@/public/music/backdrops/yeat-backdrop.webp";
import UziBackdrop from "@/public/music/backdrops/uzibackdrop.webp";

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

export const SearchArtistProfile: ArtistType = {
    id: "artist-1",
    img: Search,
    title: "Search",
    overview: "An Artist",
    release_date: "2024",
    songs: [],
    backdrop_path: "",
};

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

export const AllSearchTracks: SongType[] = [
    {
        id: "a-long-run",
        img: TobiLou,
        title: "A Long Run",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/a-long-run-cminor-88bpm.wav",
        backdrop_path: TobiLou,
        bpm: "88bpm",
        price: 99.0,
        key: "C-Minor",
        isFree: true,
    },
    {
        id: "aggro",
        img: Future,
        title: "Aggro",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/aggro-120bpm-gminor.wav",
        backdrop_path: FutureBackdrop,
        bpm: "120bpm",
        price: 99.0,
        key: "G-Minor",
        isFree: true,
    },
    // {
    //     id: "candy",
    //     img: Yeat,
    //     title: "Candy",
    //     overview: "",
    //     artist: SearchArtistProfile, // Reference the SearchArtistProfile object
    //     release_date: "2024",
    //     audio_file: "../audio-files/candy-f#minor-165bpm.wav",
    //     backdrop_path: Yeat,
    //     bpm: "165bpm",
    //     price: 99.0,
    //     key: "F#-Minor",
    //     isFree: true,
    // },
    {
        id: "chance",
        img: Timb,
        title: "Chance",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/chance-90bpm-emajor.mp3",
        backdrop_path: Timb,
        bpm: "90bpm",
        price: 99.0,
        key: "E-Major",
        isFree: true,
    },
    {
        id: "chedda",
        img: KidCudi,
        title: "Chedda",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/chedda-(charfin)-73bpm-d#minor.mp3",
        backdrop_path: KidCudi,
        bpm: "73bpm",
        price: 99.0,
        key: "D#-Minor",
        isFree: true,
    },
    {
        id: "common",
        img: JackHarlow,
        title: "Common",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/common-gminor-95bpm.mp3",
        backdrop_path: JackHarlow,
        bpm: "95bpm",
        price: 99.0,
        key: "G-Minor",
        isFree: true,
    },
    {
        id: "cripple",
        img: Drake,
        title: "Cripple",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/cripple-95bpm-dminor.wav",
        backdrop_path: Drake,
        bpm: "95bpm",
        price: 99.0,
        key: "D-Minor",
        isFree: true,
    },
    // {
    //     id: "design",
    //     img: Logic,
    //     title: "Design",
    //     overview: "",
    //     artist: SearchArtistProfile, // Reference the SearchArtistProfile object
    //     release_date: "2024",
    //     audio_file: "../audio-files/design-cminor-180bpm.wav",
    //     backdrop_path: Logic,
    //     bpm: "180bpm",
    //     price: 99.0,
    //     key: "C-Minor",
    //     isFree: true,
    // },
    {
        id: "dillon-brooks",
        img: UziVert,
        title: "Design",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/design-cminor-180bpm.wav",
        backdrop_path: UziBackdrop,
        bpm: "180bpm",
        price: 99.0,
        key: "C-Minor",
        isFree: true,
    },
];
