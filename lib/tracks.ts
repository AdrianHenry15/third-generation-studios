import { SongType } from "./types";
import { SearchArtistProfile } from "./artists";

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
    {
        id: "candy",
        img: Yeat,
        title: "Candy",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/candy-f-sharp-minor-165bpm.wav",
        backdrop_path: Yeat,
        bpm: "165bpm",
        price: 99.0,
        key: "F#-Minor",
        isFree: true,
    },
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
        audio_file: "../audio-files/chedda-73bpm-d-sharp-minor.mp3",
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
        id: "dillon-brooks",
        img: UziVert,
        title: "Dillon Brooks",
        overview: "",
        artist: SearchArtistProfile, // Reference the SearchArtistProfile object
        release_date: "2024",
        audio_file: "../audio-files/dillon-brooks-f-sharp-minor-156bpm.mp3",
        backdrop_path: UziBackdrop,
        bpm: "156bpm",
        price: 99.0,
        key: "F#-Minor",
        isFree: true,
    },
];
