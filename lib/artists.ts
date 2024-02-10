import { ArtistType } from "./types";
// ARTIST IMAGES
import Search from "@/public/music/backdrops/plane-backdrop.jpg";

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
