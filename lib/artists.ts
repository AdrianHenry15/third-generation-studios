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
    backdrop_path: Search,
};

export const Artists: ArtistType[] = [
    {
        id: "search",
        img: Search,
        title: "Search",
        overview: "An Artist",
        release_date: "2024",
        songs: [],
        backdrop_path: Search,
    },
    {
        id: "jafarri",
        img: Search,
        title: "Jafarri",
        overview: "An Artist",
        release_date: "2024",
        songs: [],
        backdrop_path: Search,
    },
];
