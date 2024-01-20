export type NavMenu = {
    title: string;
    link: string;
};

export type ProjectType = {
    id: number;
    img: any;
    title: string;
    genre?: string;
    description?: string;
    release_date: string;
};

export type WebsiteProjectType = ProjectType & {
    technologies: string;
    link: string;
};

export type MusicProjectType = ProjectType & {
    album_name?: string;
    lyrics?: string;
    artist: string;
    duration: string;
    plays: number;
    song: any;
};

export type ArtistType = ProjectType & {
    link?: string;
    label?: string;
};

export type MovieType = ProjectType & {
    backdrop_path: string;
    overview: string;
};
