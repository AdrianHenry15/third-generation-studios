// Artist Types
export type ArtistRole = "singer" | "producer" | "composer" | "band" | "dj" | "instrumentalist";
export type ProductionTool = "Ableton Live" | "FL Studio" | "Logic Pro" | "Pro Tools" | "Cubase" | "GarageBand" | "Other";
export type TrackType = "Released" | "Unreleased" | "Work In Progress" | "Demo" | "Remix";
export type VerificationStatus = "active" | "inactive" | "banned";
export type AlbumType = "Single" | "EP" | "Album";
export type ReleaseDatePrecision = "day" | "month" | "year";
export type CreditRoleType = "composer" | "producer" | "lyricist" | "featured-artist" | "main-artist";
export type InviteStatusType = "pending" | "accepted" | "revoked" | "expired";

// Artist Types
export interface IArtistProps {
    id: string; // ref to auth users table
    stage_name: string;
    profile_image_url: string;
    verified: boolean;
    patreon_url?: string;
    bandcamp_url?: string;
    spotify_url?: string;
    apple_music_url?: string;
    youtube_url?: string;
    soundcloud_url?: string;
    amazon_music_url?: string;
    tidal_url?: string;
    deezer_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    facebook_url?: string;
    website_url?: string;
    tiktok_url?: string;
    created_at: string;
    updated_at: string;
}

export interface IArtistVerificationsProps {
    id: string;
    user_id: string;
    status: VerificationStatus;
    submitted_at: string;
    reviewed_at?: string;
    reviewer_id?: string;
    notes?: string;
}

// Album Types
export interface IAlbumImageProps {
    id: string;
    album_id: string;
    url: string;
    name: string;
    created_at: string;
}

export interface IAlbumProps {
    id: string;
    artist_id: string;
    name: string;
    type: "Single" | "EP" | "Album";
    release_date: string;
    created_at: string;
    updated_at: string;
    images?: IAlbumImageProps[]; // <-- add optional images array to keep album images with the album
}

// Track Types
export interface ITrackCreditProps {
    id: string;
    track_id: string;
    artist_id: string;
    role: CreditRoleType;
    created_at: string;
}
export interface ITrackProps {
    id: string;
    album_id: string;
    artist_id: string;
    title: string;
    artists: IArtistProps[];
    credits: ITrackCreditProps[];
    url: string;
    album: IAlbumProps;
    type: TrackType;
    duration: number;
    release_date: string; // Changed from number | string to just string
    genre: string;
    locked: boolean;
    plays: number;
    is_liked: boolean;
    copyright?: string;
    lyrics?: string;
    spotify_id?: string;
}

export interface IMusicLinkProps {
    spotify?: string;
    apple?: string;
    youtube?: string;
    soundcloud?: string;
    amazon?: string;
    tidal?: string;
    deezer?: string;
}

// Invites
export interface IInviteProps {
    id: string;
    sender_id: string;
    recipient_email: string;
    message?: string;
    status: InviteStatusType;
    track_id?: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
}

// Download Links
export interface IDownloadLinkProps {
    id: string;
    user_id: string;
    track_id: string;
    download_url: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
}
