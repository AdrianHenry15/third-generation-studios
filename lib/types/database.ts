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
    album?: Album | null;
    artist?: Artist | null;
    remixes?: Remix | null;
    credits?: TrackCredit[];
    likes?: TrackLike[];
};

// When selecting playlists with tracks and creator
export type PlaylistWithRelations = Playlist & {
    tracks?: (PlaylistTrack & { track: TrackWithRelations })[];
    created_by_profile?: Profile;
    likes?: PlaylistLike[];
};

// When selecting an artist with albums or tracks
export type ArtistWithRelations = Artist & {
    albums?: Album[];
    tracks?: Track[];
};

// When selecting a user profile with playlists and liked tracks
export type ProfileWithRelations = Profile & {
    playlists?: Playlist[];
    liked_tracks?: (TrackLike & { track: TrackWithRelations })[];
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
