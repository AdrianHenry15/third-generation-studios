// lib/fetchers/playlist-fetchers.ts
import { supabase } from "../supabase/client";
import type { Database } from "../types/supabase-types";
import type { TrackWithRelations } from "../types/database";

// ------------------------------
// Types
// ------------------------------
export type PlaylistRow = Database["public"]["Tables"]["playlists"]["Row"];
export type PlaylistTrackRow = Database["public"]["Tables"]["playlist_tracks"]["Row"];
export type PlaylistLikeRow = Database["public"]["Tables"]["playlist_likes"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

// A single playlist track including its full track object
export type PlaylistTrackWithRelations = PlaylistTrackRow & {
    track?: TrackWithRelations | null;
};

// Playlist including tracks and creator profile
export type PlaylistWithRelations = PlaylistRow & {
    tracks?: PlaylistTrackWithRelations[] | null;
    created_by_profile?: ProfileRow | null;
    likes?: PlaylistLikeRow[] | null;
};

// ------------------------------
// Fetchers
// ------------------------------

// Fetch all playlists
export async function fetchPlaylistsWithJoins(): Promise<PlaylistWithRelations[]> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      created_by_profile:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artist:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          )
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as unknown as PlaylistWithRelations[]) || [];
}

// Fetch single playlist by ID
export async function fetchPlaylistByIdWithJoins(id: string): Promise<PlaylistWithRelations> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      created_by_profile:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artist:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          )
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .eq("id", id)
        .single();

    if (error) throw error;
    if (!data) throw new Error("Playlist not found");
    return data as unknown as PlaylistWithRelations;
}

// Fetch playlists for a specific user
export async function fetchPlaylistsByUser(userId: string): Promise<PlaylistWithRelations[]> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      created_by_profile:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artist:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          )
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .eq("created_by", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as unknown as PlaylistWithRelations[]) || [];
}

// Fetch public playlists only
export async function fetchPublicPlaylists(): Promise<PlaylistWithRelations[]> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      created_by_profile:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artist:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          )
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .eq("is_public", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as unknown as PlaylistWithRelations[]) || [];
}

// ------------------------------
// CRUD Helpers
// ------------------------------
export async function createPlaylist(playlist: Database["public"]["Tables"]["playlists"]["Insert"]): Promise<PlaylistRow> {
    const { data, error } = await supabase.from("playlists").insert(playlist).select().single();
    if (error) throw error;
    if (!data) throw new Error("Failed to create playlist");
    return data;
}

export async function updatePlaylist(id: string, updates: Database["public"]["Tables"]["playlists"]["Update"]): Promise<PlaylistRow> {
    const { data, error } = await supabase.from("playlists").update(updates).eq("id", id).select().single();
    if (error) throw error;
    if (!data) throw new Error("Failed to update playlist");
    return data;
}

export async function deletePlaylist(id: string): Promise<void> {
    const { error } = await supabase.from("playlists").delete().eq("id", id);
    if (error) throw error;
}

export async function addTrackToPlaylist(track: Database["public"]["Tables"]["playlist_tracks"]["Insert"]): Promise<PlaylistTrackRow> {
    const { data, error } = await supabase.from("playlist_tracks").insert(track).select().single();
    if (error) throw error;
    if (!data) throw new Error("Failed to add track to playlist");
    return data;
}

export async function removeTrackFromPlaylist(id: string): Promise<void> {
    const { error } = await supabase.from("playlist_tracks").delete().eq("id", id);
    if (error) throw error;
}
