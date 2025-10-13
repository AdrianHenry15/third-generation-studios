import { supabase } from "../supabase/client";
import { Track, TrackInsert, TrackUpdate } from "../types/database";
import { fetchTable, fetchRowById, insertRow, updateRow, deleteRow } from "./generic-fetchers";

// Basic CRUD operations
export const fetchAllTracks = () => fetchTable("tracks");
export const fetchTrackById = (id: string) => fetchRowById("tracks", id);
export const createTrack = (track: TrackInsert) => insertRow("tracks", track);
export const updateTrack = (id: string, updates: TrackUpdate) => updateRow("tracks", id, updates);
export const deleteTrack = (id: string) => deleteRow("tracks", id);

// Track-specific fetchers
export async function fetchTracksByArtist(artistId: string): Promise<Track[]> {
    const { data, error } = await supabase.from("tracks").select("*").eq("artist_id", artistId);
    if (error) throw error;
    return data ?? [];
}

export async function fetchTracksWithRelationsByArtist(artistId: string): Promise<Track[]> {
    const { data, error } = await supabase
        .from("tracks")
        .select(
            `
            *,
            album:albums (
                id,
                name,
                release_date,
                album_images:album_images(id, url),
                artist:artists(id, stage_name, profile_image_url)
            ),
            artist:artists (
                id,
                stage_name,
                profile_image_url
            ),
            remixes:remixes (
                id,
                url,
                original_song,
                original_artists,
                created_at,
                remixer:artists(id, stage_name, profile_image_url)
            ),
            credits:track_credits (
                id,
                role,
                artist:artists(id, stage_name, profile_image_url)
            ),
            likes:track_likes (
                id,
                profile:profiles(id, username)
            )
        `,
        )
        .eq("artist_id", artistId);

    if (error) throw error;
    return data ?? [];
}

export async function fetchTracksByAlbum(albumId: string): Promise<Track[]> {
    const { data, error } = await supabase.from("tracks").select("*").eq("album_id", albumId).order("title");
    if (error) throw error;
    return data ?? [];
}

export async function fetchPublicTracks(): Promise<Track[]> {
    const { data, error } = await supabase.from("tracks").select("*").eq("is_public", true).eq("locked", false);
    if (error) throw error;
    return data ?? [];
}

export async function fetchTrackWithRelations(id: string): Promise<Track | null> {
    const { data, error } = await supabase
        .from("tracks")
        .select(
            `
      *,
      album:albums (
        id,
        name,
        release_date,
        album_images:album_images(id, url),
        artist:artists(id, stage_name, profile_image_url)
      ),
      artist:artists (
        id,
        stage_name,
        profile_image_url
      ),
      remixes:remixes (
        id,
        url,
        original_song,
        original_artists,
        created_at,
        remixer:artists(id, stage_name, profile_image_url)
      ),
      credits:track_credits (
        id,
        role,
        artist:artists(id, stage_name, profile_image_url)
      ),
      likes:track_likes (
        id,
        profile:profiles(id, username)
      )
      `,
        )
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(`[fetchTrackWithRelations] ${error.message || error.details || "Unknown error"} (code: ${error.code || "?"})`);
    }
    return data ?? null;
}

// Track interaction functions
export async function incrementTrackPlays(trackId: string): Promise<void> {
    const { error } = await supabase.rpc("increment_track_play", { track_id: trackId });
    if (error) throw error;
}

export async function likeTrack(trackId: string, userId: string) {
    return insertRow("track_likes", { track_id: trackId, user_id: userId });
}

export async function unlikeTrack(trackId: string, userId: string): Promise<boolean> {
    const { error } = await supabase.from("track_likes").delete().eq("track_id", trackId).eq("user_id", userId);
    if (error) throw error;
    return true;
}

export async function fetchUserTrackLike(trackId: string, userId: string) {
    const { data, error } = await supabase.from("track_likes").select("*").eq("track_id", trackId).eq("user_id", userId).maybeSingle();
    if (error) throw error;
    return data;
}

export async function fetchLikedTrackIdsByUser(userId: string): Promise<string[]> {
    if (!userId) return [];
    const { data, error } = await supabase
        .from("track_likes")
        .select("track_id, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row: { track_id: string }) => row.track_id);
}
