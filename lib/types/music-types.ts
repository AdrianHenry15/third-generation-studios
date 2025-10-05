// ==================== ENUM TYPES ====================

// Artist Types
export type ArtistRole = "singer" | "producer" | "composer" | "band" | "dj" | "instrumentalist";

export type ProductionTool = "Ableton Live" | "FL Studio" | "Logic Pro" | "Pro Tools" | "Cubase" | "GarageBand" | "Other";

export type TrackType = "Released" | "Unreleased" | "Work In Progress" | "Demo" | "Remix";

export type VerificationStatus = "active" | "inactive" | "banned";

export type AlbumType = "Single" | "EP" | "Album";

export type ReleaseDatePrecision = "day" | "month" | "year";

export type CreditRoleType = "main-artist" | "composer" | "producer" | "lyricist" | "featured-artist" | "singer";

export type InviteStatusType = "pending" | "accepted" | "revoked" | "expired";

// Playlist Types
export type PlaylistPrivacy = "public" | "private"; // frontend convenience wrapper over is_public boolean

// ==================== ARTIST ====================
export interface IArtistProps {
    id: string; // ref to profiles table (not auth directly)
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

// ==================== ALBUM ====================
export interface IAlbumImageProps {
    id: string;
    album_id: string;
    url: string;
    name: string;
    created_at: string;
}

export interface IAlbumProps {
    id: string;
    artist_id: string; // ref to profiles.id
    name: string;
    type: AlbumType;
    release_date: string;
    created_at: string;
    updated_at: string;
    images?: IAlbumImageProps[]; // optional joined images
}

// ==================== TRACK ====================
export interface ITrackCreditProps {
    id: string;
    track_id: string;
    name: string;
    role: CreditRoleType;
    created_at: string;
    updated_at: string;
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

export interface ITrackProps {
    id: string;
    album_id: string;
    artist_id: string; // ref to profiles.id
    title: string;
    url: string;
    duration: number; // ms in frontend, sec in DB
    release_date: string;
    genre: string;
    locked: boolean;
    plays: number;
    lyrics?: string;
    links?: IMusicLinkProps; // JSONB
    is_public: boolean;
    created_at: string;
    updated_at: string;

    // Computed/joined
    artists: IArtistProps[];
    credits: ITrackCreditProps[];
    album: IAlbumProps;
    type: TrackType; // computed from release_date + locked
    is_liked: boolean; // user-specific flag
    remix?: IRemixProps;
}

// ==================== PLAYLIST ====================
export interface IPlaylistProps {
    id: string;
    name: string;
    description?: string;
    created_by: string; // ref to profiles.id
    is_public: boolean;
    cover_image_url?: string;
    track_count: number;
    total_duration: number; // in seconds
    created_at: string;
    updated_at: string;

    // Computed/joined
    creator?: IArtistProps; // joined profile info
    tracks?: IPlaylistTrackProps[]; // ordered list of playlist tracks
    is_liked?: boolean; // user-specific
    likes_count?: number;
}

export interface IPlaylistTrackProps {
    id: string;
    playlist_id: string;
    track_id: string;
    position: number;
    added_by: string; // ref to profiles.id
    added_at: string;

    // Joined
    track: ITrackProps;
    added_by_profile?: IArtistProps;
}

export interface IPlaylistLikeProps {
    id: string;
    playlist_id: string;
    profile_id: string;
    liked_at: string;

    // Joined
    playlist?: IPlaylistProps;
}

// ==================== INVITES ====================
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

// ==================== DOWNLOAD LINKS ====================
export interface IDownloadLinkProps {
    id: string;
    user_id: string;
    track_id: string;
    download_url: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
}

// ==================== REMIX ====================
export interface IRemixProps {
    id: string;
    track_id: string;
    original_song: string;
    original_artists: string[]; // JSONB array of artist names
    additional_artists?: string[];
    url?: string;
    created_at: string;
    updated_at: string;

    // Joined
    track?: ITrackProps;
}
