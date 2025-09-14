export type TechStackName =
    | "Next.js"
    | "JavaScript"
    | "TypeScript"
    | "TailwindCSS"
    | "Vercel"
    | "Clerkjs"
    | "Shopify"
    | "Liquid"
    | "Stripe"
    | "Emailjs"
    | "Sanity.io"
    | "Supabase"
    | "Resend";

export type AvailablePlansType = "Studio Basic" | "Studio Plus" | "Studio Pro" | "Studio Commerce";
export type AlbumTypes = "Single" | "EP" | "Album";
export type NavMenuType = {
    title: string;
    link: string;
};

export type FaqType = {
    question: string;
    answer: string;
};

export type WebsiteType = {
    id: string;
    img: any;
    title: string;
    description: string;
    release_date: string;
    link: string; // Add link property
    tech_stack: TechStackName[];
};

export type EmailResponseProps = {
    success: boolean;
    data?: any;
    error?: any;
};

export type IEmailTemplateParamsType = {
    name: string;
    email: string;
    plan: string;
    product_description: string;
};

export interface IArtistProps {
    id: string;
    name: string;
}

export interface IAlbumImageProps {
    id: string;
    url: string;
    name: string;
}

export interface IAlbumProps {
    id: string;
    type: AlbumTypes;
    total_tracks: number;
    href: string;
    images: IAlbumImageProps[];
    name: string;
    release_date: string;
    artists: IArtistProps[];
}

export interface ICreditsProps {
    composer: string;
    producer: string;
}

export interface ITrackProps {
    id: string;
    title: string;
    artists: IArtistProps[];
    credits: ICreditsProps;
    url: string;
    album: IAlbumProps;
    type: "Spotify" | "Unreleased" | "Remix" | "Cover";
    duration: number;
    track_number: number;
    release_date: number | string;
    genre: string;
    locked: boolean;
    plays: number;
    is_liked: boolean;
    copyright?: string;
    lyrics?: string;
    spotify_id?: string;
}

// Spotify API Types
export interface ISpotifyExternalUrlsProps {
    spotify: string;
}

export interface ISpotifyArtistProps {
    external_urls: ISpotifyExternalUrlsProps;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
}

export interface ISpotifyImageProps {
    height: number;
    width: number;
    url: string;
}

export interface ISpotifyAlbumProps {
    album_type: "single" | "album" | "compilation";
    artists: ISpotifyArtistProps[];
    available_markets: string[];
    external_urls: ISpotifyExternalUrlsProps;
    href: string;
    id: string;
    images: ISpotifyImageProps[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: "day" | "month" | "year";
    total_tracks: number;
    type: "album";
    uri: string;
}

export interface ISpotifyTrackProps {
    album: ISpotifyAlbumProps;
    artists: ISpotifyArtistProps[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: any;
    external_urls: ISpotifyExternalUrlsProps;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
}
