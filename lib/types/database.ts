/* ============================================================
   🎵 Core Table Types
   ============================================================ */

import { Enums, Tables, TablesInsert, TablesUpdate } from "./supabase-types";

export type Track = Tables<"tracks">;
export type TrackInsert = TablesInsert<"tracks">;
export type TrackUpdate = TablesUpdate<"tracks">;

export type Album = Tables<"albums">;
export type AlbumInsert = TablesInsert<"albums">;
export type AlbumUpdate = TablesUpdate<"albums">;

export type AlbumImage = Tables<"album_images">;
export type AlbumImageInsert = TablesInsert<"album_images">;
export type AlbumImageUpdate = TablesUpdate<"album_images">;

export type Artist = Tables<"artists">;
export type ArtistInsert = TablesInsert<"artists">;
export type ArtistUpdate = TablesUpdate<"artists">;

export type Profile = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;

export type Playlist = Tables<"playlists">;
export type PlaylistInsert = TablesInsert<"playlists">;
export type PlaylistUpdate = TablesUpdate<"playlists">;

export type PlaylistTrack = Tables<"playlist_tracks">;
export type PlaylistLike = Tables<"playlist_likes">;

export type TrackCredit = Tables<"track_credits">;
export type TrackLike = Tables<"track_likes">;

export type Remix = Tables<"remixes">;
export type DownloadLink = Tables<"download_links">;
export type Invite = Tables<"invites">;

/* ============================================================
   🧩 Enum Types
   ============================================================ */

export type AlbumType = Enums<"album_type">;
export type TrackType = Enums<"track_type">;
export type CreditRoleType = Enums<"credit_role_type">;
export type ProfileRole = Enums<"profile_role">;
export type VerificationStatus = Enums<"verification_status">;

/* ============================================================
   🤝 Common Joined Types (Frontend convenience)
   ============================================================ */

// When selecting tracks with related album and artist
export type TrackWithRelations = Track & {
    album?: AlbumWithRelations | null;
    artist?: ArtistWithRelations | null;
    remixes?: RemixWithRelations[] | null;
    credits?: TrackCreditWithRelations[] | null;
    likes?: TrackLikeWithRelations[] | null;
};

// When selecting albums with related artist and images
export type AlbumWithRelations = Album & {
    artist?: ArtistWithRelations | null;
    images?: AlbumImage[] | null;
    tracks?: TrackWithRelations[] | null;
};

// When selecting an artist with albums or tracks
export type ArtistWithRelations = Artist & {
    albums?: AlbumWithRelations[] | null;
    tracks?: TrackWithRelations[] | null;
};

// When selecting a remix with its original track and remixer
export type RemixWithRelations = Remix & {
    original_track?: TrackWithRelations | null;
    remixer?: ArtistWithRelations | null;
};

// When selecting a track credit with its profile and role
export type TrackCreditWithRelations = TrackCredit & {
    profile?: ProfileWithRelations | null;
    track?: TrackWithRelations | null;
};

// When selecting a track like with its profile and track
export type TrackLikeWithRelations = TrackLike & {
    profile?: ProfileWithRelations | null;
    track?: TrackWithRelations | null;
};

// When selecting a user profile with playlists and liked tracks
export type ProfileWithRelations = Profile & {
    playlists?: PlaylistWithRelations[] | null;
    liked_tracks?: TrackLikeWithRelations[] | null;
};

// When selecting playlists with tracks and creator
export type PlaylistWithRelations = Playlist & {
    tracks?: (PlaylistTrack & { track: TrackWithRelations })[] | null;
    created_by_profile?: ProfileWithRelations | null;
    likes?: PlaylistLike[] | null;
};

/* ============================================================
   🧠 Utility Union Types
   ============================================================ */

// Useful for filtering or conditionally rendering by type
export type MusicEntity = Track | Album | Artist | Playlist | Remix | TrackCredit;

export type InsertableEntity = TrackInsert | AlbumInsert | ArtistInsert | PlaylistInsert;

/* ============================================================
   ✅ Example usage in frontend
   ============================================================ */
// import type { TrackWithRelations, AlbumType } from "@/types/database";
// const myTrack: TrackWithRelations = ...
// const albumType: AlbumType = "EP";
