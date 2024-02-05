export type NavMenu = {
    title: string;
    link: string;
};

export enum Category {
    WEBSITE = "Website",
    SONG = "Song",
    ARTIST = "Artist",
    MOVIE = "Movie",
    NONE = "",
}

export type ItemType = {
    id: string;
    img: any;
    title: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
};

export type WebsiteType = ItemType & {
    link: string;
};

export type SongType = ItemType & {
    artist: string;
    audio_file: any;
};

export type ArtistType = ItemType & {
    stream_links?: string;
    songs: [];
};
