import { ITrackProps, NavMenuType } from "./types";

export const NavMenuTypeItems: NavMenuType[] = [
    {
        title: "Websites",
        link: "/websites",
    },
    {
        title: "Music",
        link: "/music",
    },
    {
        title: "Pricing",
        link: "/pricing",
    },
    {
        title: "Blog",
        link: "/blog",
    },
    {
        title: "Music",
        link: "/music",
    },
    {
        title: "About",
        link: "/About",
    },
];
export const NavMenuTypeAltItems: NavMenuType[] = [
    {
        title: "Contact Us",
        link: "/contact-us",
    },
    {
        title: "Schedule Your Free Consultation",
        link: "/contact-us",
    },
];

export const ReferralSources = ["Card From Brite", "Magazine", "Google", "Facebook", "Word of Mouth", "Other"];

export const Plans = ["Studio Basic", "Studio Plus", "Studio Pro", "Studio Commerce"];

export const dummyMusic: ITrackProps[] = [
    {
        id: "1",
        title: "Midnight Drive",
        artists: [{ id: "anjin-iso-1", name: "Anjin Iso" }],
        credits: { composer: "", producer: "" },
        url: "",
        album: {
            id: "neon-nights",
            type: "Album",
            total_tracks: 10,
            href: "",
            images: [
                {
                    id: "1",
                    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&q=80",
                    name: "Neon Nights Cover",
                },
            ],
            name: "Neon Nights",
            release_date: "2023",
            artists: [{ id: "anjin-iso-1", name: "Anjin Iso" }],
        },
        type: "Unreleased",
        duration: 222000, // 3:42 in milliseconds
        track_number: 1,
        release_date: 2023,
        genre: "Synthwave",
        locked: true,
        plays: 0,
        is_liked: false,
    },
    {
        id: "2",
        title: "Electric Dreams",
        artists: [{ id: "anjin-iso-1", name: "Anjin Iso" }],
        credits: { composer: "", producer: "" },
        url: "",
        album: {
            id: "electric-avenue",
            type: "Album",
            total_tracks: 8,
            href: "",
            images: [
                {
                    id: "2",
                    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
                    name: "Electric Avenue Cover",
                },
            ],
            name: "Electric Avenue",
            release_date: "2022",
            artists: [{ id: "anjin-iso-1", name: "Anjin Iso" }],
        },
        type: "Remix",
        duration: 250000, // 4:10 in milliseconds
        track_number: 1,
        release_date: 2022,
        genre: "Electronic",
        locked: false,
        plays: 0,
        is_liked: false,
    },
    {
        id: "3",
        title: "Sunset Boulevard",
        artists: [{ id: "jafarri-1", name: "Jafarri" }],
        credits: { composer: "", producer: "" },
        url: "",
        album: {
            id: "golden-hour",
            type: "Album",
            total_tracks: 12,
            href: "",
            images: [
                {
                    id: "3",
                    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80",
                    name: "Golden Hour Cover",
                },
            ],
            name: "Golden Hour",
            release_date: "2021",
            artists: [{ id: "jafarri-1", name: "Jafarri" }],
        },
        type: "Unreleased",
        duration: 235000, // 3:55 in milliseconds
        track_number: 1,
        release_date: 2021,
        genre: "Chillhop",
        locked: false,
        plays: 0,
        is_liked: false,
    },
    {
        id: "4",
        title: "Starlit City",
        artists: [{ id: "belle-morie-1", name: "Belle Morie" }],
        credits: { composer: "", producer: "" },
        url: "",
        album: {
            id: "city-lights",
            type: "Album",
            total_tracks: 9,
            href: "",
            images: [
                {
                    id: "4",
                    url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&q=80",
                    name: "City Lights Cover",
                },
            ],
            name: "City Lights",
            release_date: "2023",
            artists: [{ id: "belle-morie-1", name: "Belle Morie" }],
        },
        type: "Unreleased",
        duration: 262000, // 4:22 in milliseconds
        track_number: 1,
        release_date: 2023,
        genre: "Pop",
        locked: true,
        plays: 0,
        is_liked: false,
    },
];
