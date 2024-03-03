import { SongType } from "./types";
import { SearchArtistProfile } from "./artists";

// IMAGES
import AfroBeatImg from "@/public/music/chill-hiphop.jpg";
import ChillImg from "@/public/music/chill.jpg";
import HipHopImg from "@/public/music/hiphop.jpg";
import HipHopImg2 from "@/public/music/hiphop2.jpg";
import HipHopImg3 from "@/public/music/hiphop3.jpg";
import HyperpopImg from "@/public/music/hyperpop.jpg";
import ElectronicImg from "@/public/music/electronic.jpg";
import HouseImg from "@/public/music/house.jpg";

export const AfroBeats: SongType[] = [
    {
        id: "los-bienes",
        img: AfroBeatImg,
        title: "Los Bienes",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/los-bienes-e-flat-minor-101bpm.mp3",
        backdrop_path: AfroBeatImg,
        bpm: "101",
        price: 99.0,
        key: "Eb-Minor",
        isFree: true,
    },
    {
        id: "signals",
        img: AfroBeatImg,
        title: "Signals",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/signals-98bpm-c-sharp-minor.mp3",
        backdrop_path: AfroBeatImg,
        bpm: "98",
        price: 99.0,
        key: "C#-Minor",
        isFree: true,
    },
];

export const ChillHipHopBeats: SongType[] = [
    {
        id: "design",
        img: ChillImg,
        title: "Design",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/design-cminor-180bpm.wav",
        backdrop_path: ChillImg,
        bpm: "180",
        price: 99.0,
        key: "C-Minor",
        isFree: true,
    },
    {
        id: "gaslight",
        img: ChillImg,
        title: "Gaslight",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/gaslight-d-sharp-major-175bpm.mp3",
        backdrop_path: ChillImg,
        bpm: "175",
        price: 99.0,
        key: "D#-Major",
        isFree: false,
    },
];

export const FreeBeats: SongType[] = [
    {
        id: "a-long-run",
        img: HyperpopImg,
        title: "A Long Run",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/a-long-run-88bpm-cminor.mp3",
        backdrop_path: HyperpopImg,
        bpm: "88",
        price: 0,
        key: "C-Minor",
        isFree: true,
    },
    {
        id: "lumps",
        img: HyperpopImg,
        title: "Lumps",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/lumps-140bpm-cminor.mp3",
        backdrop_path: HyperpopImg,
        bpm: "140",
        price: 0,
        key: "C-Minor",
        isFree: true,
    },
    {
        id: "suffer",
        img: HipHopImg,
        title: "Suffer",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/suffer-141bpm-cminor.mp3",
        backdrop_path: HipHopImg,
        bpm: "141",
        price: 0,
        key: "C-Minor",
        isFree: true,
    },
    {
        id: "swarm",
        img: HyperpopImg,
        title: "Swarm",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/swarm-140bpm-emajor.mp3",
        backdrop_path: HyperpopImg,
        bpm: "140",
        price: 0,
        key: "E-Major",
        isFree: true,
    },
    {
        id: "the-valley",
        img: ElectronicImg,
        title: "The Valley",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/the-valley-80bpm-aminor.mp3",
        backdrop_path: ElectronicImg,
        bpm: "80",
        price: 0,
        key: "A-Minor",
        isFree: true,
    },
    {
        id: "vibrant",
        img: HipHopImg,
        title: "Vibrant",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/vibrant-120bpm-fminor.mp3",
        backdrop_path: HipHopImg,
        bpm: "120",
        price: 0,
        key: "F-Minor",
        isFree: true,
    },
];

export const HipHopBeats: SongType[] = [
    {
        id: "aggro",
        img: HipHopImg,
        title: "Aggro",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/aggro-120bpm-gminor.wav",
        backdrop_path: HipHopImg,
        bpm: "120",
        price: 99.0,
        key: "G-Minor",
        isFree: false,
    },
    {
        id: "ancestors",
        img: HipHopImg2,
        title: "Ancestors",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/ancestors-140bpm-cminor.mp3",
        backdrop_path: HipHopImg2,
        bpm: "140",
        price: 99.0,
        key: "C-Minor",
        isFree: false,
    },
    {
        id: "association",
        img: HipHopImg3,
        title: "Association",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/association-140bpm-c-sharp-minor.mp3",
        backdrop_path: HipHopImg3,
        bpm: "140",
        price: 99.0,
        key: "C#-Minor",
        isFree: false,
    },
    {
        id: "chance",
        img: HipHopImg,
        title: "Chance",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/chance-90bpm-emajor.mp3",
        backdrop_path: HipHopImg,
        bpm: "90",
        price: 99.0,
        key: "E-Major",
        isFree: false,
    },
    {
        id: "chedda",
        img: HipHopImg2,
        title: "Chedda",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/chedda-73bpm-d-sharp-minor.mp3",
        backdrop_path: HipHopImg2,
        bpm: "73",
        price: 99.0,
        key: "D#-Minor",
        isFree: false,
    },
    {
        id: "cripple",
        img: HipHopImg3,
        title: "Cripple",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/cripple-95bpm-dminor.wav",
        backdrop_path: HipHopImg3,
        bpm: "95",
        price: 99.0,
        key: "D-Minor",
        isFree: false,
    },
    {
        id: "dressin",
        img: HipHopImg,
        title: "Dressin",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/dressin-d-sharp-minor-160bpm.mp3",
        backdrop_path: HipHopImg,
        bpm: "160",
        price: 99.0,
        key: "D#-Minor",
        isFree: false,
    },
    {
        id: "festival",
        img: HipHopImg2,
        title: "Festival",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/festival-142bpm-fminor.wav",
        backdrop_path: HipHopImg2,
        bpm: "142",
        price: 99.0,
        key: "F-Minor",
        isFree: false,
    },
    {
        id: "ghosts",
        img: HipHopImg3,
        title: "Ghosts",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/ghosts-80bpm-cminor.mp3",
        backdrop_path: HipHopImg3,
        bpm: "142",
        price: 99.0,
        key: "F-Minor",
        isFree: false,
    },
    {
        id: "god",
        img: HipHopImg,
        title: "God",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/god-eminor-80bpm.mp3",
        backdrop_path: HipHopImg,
        bpm: "80",
        price: 99.0,
        key: "E-Minor",
        isFree: false,
    },
    {
        id: "hyphee",
        img: HipHopImg2,
        title: "Hyphee",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/hyphee-94bpm-f-sharp-minor.mp3",
        backdrop_path: HipHopImg2,
        bpm: "94",
        price: 99.0,
        key: "F#-Minor",
        isFree: false,
    },
    {
        id: "im-up",
        img: HipHopImg3,
        title: "Im Up",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/im-up-cminor-148bpm.mp3",
        backdrop_path: HipHopImg3,
        bpm: "148",
        price: 99.0,
        key: "C-Minor",
        isFree: false,
    },
    {
        id: "in-da-sky",
        img: HipHopImg,
        title: "Im Da Sky",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/in-da-sky-fminor-140bpm.mp3",
        backdrop_path: HipHopImg,
        bpm: "140",
        price: 99.0,
        key: "F-Minor",
        isFree: false,
    },
    {
        id: "jackman-drake",
        img: HipHopImg2,
        title: "Jackman Drake",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/jackman-drake-99bpm-bminor.mp3",
        backdrop_path: HipHopImg2,
        bpm: "99",
        price: 99.0,
        key: "B-Minor",
        isFree: false,
    },
    {
        id: "ja-morant",
        img: HipHopImg3,
        title: "Ja Morant",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/ja-morant-83bpm-eminor.mp3",
        backdrop_path: HipHopImg3,
        bpm: "83",
        price: 99.0,
        key: "E-Minor",
        isFree: false,
    },
    {
        id: "sumn-groovy",
        img: HipHopImg,
        title: "Sumn Groovy",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/sumn-groovy-78bpm-cminor.wav",
        backdrop_path: HipHopImg,
        bpm: "78",
        price: 99.0,
        key: "C-Minor",
        isFree: false,
    },
    {
        id: "this-kounts",
        img: HipHopImg2,
        title: "This Kounts",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/this-kounts-a-sharp-minor-140bpm.wav",
        backdrop_path: HipHopImg2,
        bpm: "140",
        price: 99.0,
        key: "A#-Minor",
        isFree: false,
    },
];

export const HouseBeats: SongType[] = [
    {
        id: "ocean-vibes",
        img: HouseImg,
        title: "Ocean Vibes",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/ocean-vibes-gminor-100bpm.mp3",
        backdrop_path: HouseImg,
        bpm: "100",
        price: 99.0,
        key: "G-Minor",
        isFree: false,
    },
];

export const HyperpopBeats: SongType[] = [
    {
        id: "candy",
        img: HyperpopImg,
        title: "Candy",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/candy-f-sharp-minor-165bpm.wav",
        backdrop_path: HyperpopImg,
        bpm: "165",
        price: 99.0,
        key: "F#-Minor",
        isFree: false,
    },
    {
        id: "dillon-brooks",
        img: HyperpopImg,
        title: "Dillon Brooks",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/dillon-brooks-f-sharp-minor-156bpm.mp3",
        backdrop_path: HyperpopImg,
        bpm: "156",
        price: 99.0,
        key: "F#-Minor",
        isFree: false,
    },
    {
        id: "grindin-top",
        img: HyperpopImg,
        title: "Grindin Top",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/grindin-top-154bpm-amajor.mp3",
        backdrop_path: HyperpopImg,
        bpm: "154",
        price: 99.0,
        key: "A-Major",
        isFree: false,
    },
];

export const AllSearchTracks: SongType[] = [
    ...AfroBeats,
    ...ChillHipHopBeats,
    ...FreeBeats,
    ...HipHopBeats,
    ...HouseBeats,
    ...HyperpopBeats,
];
