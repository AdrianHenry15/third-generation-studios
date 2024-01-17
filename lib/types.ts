export type NavMenu = {
    title: string;
    link: string;
};

export type WebsiteProjectType = {
    id: number;
    img: any;
    title: string;
    genre: string;
    technologies: string;
    description: string;
    year: string;
    link: string;
};

export type MusicProjectType = {
    id: number;
    img: any;
    songName: string;
    albumName?: string;
    lyrics?: string;
    artist: string;
    genre: string;
    year: number;
    duration: string;
    plays: number;
    song: any;
};

export type ArtistType = {
    id: number;
    img: any;
    name: string;
    genre?: string;
    description?: string;
    link?: string;
    label?: string;
};

export type MovieType = {
    id: number;
    title: string;
    backdrop_path: string;
};
