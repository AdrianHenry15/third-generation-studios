export type NavMenu = {
    title: string;
    link: string;
};

export enum Category {
    WEBSITE = "Website",
    MUSIC = "Music",
    ARTIST = "Artist",
    MOVIE = "Movie",
    NONE = "",
}

export type ItemType = {
    id: string;
    img: any;
    title: string;
    genre?: string;
    description?: string;
    release_date: string;
};

export type WebsiteType = ItemType & {
    link: string;
};

export type SongType = ItemType & {
    album_name?: string;
    lyrics?: string;
    artist: string;
    duration: string;
    plays: number;
    song: any;
};

export type ArtistType = ItemType & {
    link?: string;
    label?: string;
    songs: [];
};

export type MovieType = ItemType & {
    backdrop_path: string;
    overview: string;
};
