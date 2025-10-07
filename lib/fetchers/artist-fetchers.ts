import { supabase } from "../supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "../types/supabase-types";
import { fetchTable, fetchRowById, insertRow, updateRow, deleteRow } from "./generic-fetchers";

export type Artist = Tables<"artists">;
export type ArtistInsert = TablesInsert<"artists">;
export type ArtistUpdate = TablesUpdate<"artists">;

// Basic CRUD operations
export const fetchAllArtists = () => fetchTable("artists");
export const fetchArtistById = (id: string) => fetchRowById("artists", id);
export const createArtist = (artist: ArtistInsert) => insertRow("artists", artist);
export const updateArtist = (id: string, updates: ArtistUpdate) => updateRow("artists", id, updates);
export const deleteArtist = (id: string) => deleteRow("artists", id);

// Artist-specific fetchers
export async function fetchActiveArtists(): Promise<Artist[]> {
    const { data, error } = await supabase.from("artists").select("*").eq("active", true).order("stage_name");
    if (error) throw error;
    return data ?? [];
}

export async function fetchVerifiedArtists(): Promise<Artist[]> {
    const { data, error } = await supabase.from("artists").select("*").eq("verified", true).eq("active", true).order("stage_name");
    if (error) throw error;
    return data ?? [];
}

export async function fetchArtistByStage(stageName: string): Promise<Artist | null> {
    const { data, error } = await supabase.from("artists").select("*").ilike("stage_name", stageName).eq("active", true).maybeSingle();
    if (error) throw error;
    return data;
}

// Artist with relationships
export async function fetchArtistWithTracks(id: string) {
    const { data, error } = await supabase
        .from("artists")
        .select(
            `
            *,
            tracks(
                *,
                album:albums(name, type),
                credits:track_credits(*),
                likes:track_likes(*)
            )
        `,
        )
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

export async function fetchArtistWithAlbums(id: string) {
    const { data, error } = await supabase
        .from("artists")
        .select(
            `
            *,
            albums(
                *,
                images:album_images(*),
                tracks(*)
            )
        `,
        )
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

export async function fetchArtistWithProfile(id: string) {
    const { data, error } = await supabase
        .from("artists")
        .select(
            `
            *,
            profile:profiles(
                username,
                bio,
                avatar_url,
                role,
                created_at
            )
        `,
        )
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

export async function fetchArtistStats(id: string) {
    const { data: stats, error } = await supabase.from("tracks").select("plays, id").eq("artist_id", id);

    if (error) throw error;

    const totalPlays = stats?.reduce((sum, track) => sum + track.plays, 0) || 0;
    const trackCount = stats?.length || 0;

    return {
        totalPlays,
        trackCount,
        averagePlays: trackCount > 0 ? Math.round(totalPlays / trackCount) : 0,
    };
}

// Search artists
export async function searchArtists(query: string, limit = 20): Promise<Artist[]> {
    const { data, error } = await supabase
        .from("artists")
        .select("*")
        .ilike("stage_name", `%${query}%`)
        .eq("active", true)
        .order("verified", { ascending: false })
        .order("stage_name")
        .limit(limit);
    if (error) throw error;
    return data ?? [];
}

// Popular artists based on track plays
export async function fetchPopularArtists(limit = 10): Promise<Artist[]> {
    // Get verified artists ordered by creation date as the main approach
    const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("verified", true)
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data ?? [];
}

// Artists by social platform
export async function fetchArtistsByPlatform(platform: string): Promise<Artist[]> {
    let column: keyof Artist;

    switch (platform.toLowerCase()) {
        case "spotify":
            column = "spotify_url";
            break;
        case "apple":
        case "applemusic":
            column = "apple_music_url";
            break;
        case "soundcloud":
            column = "soundcloud_url";
            break;
        case "youtube":
            column = "youtube_url";
            break;
        case "instagram":
            column = "instagram_url";
            break;
        case "tiktok":
            column = "tiktok_url";
            break;
        case "twitter":
            column = "twitter_url";
            break;
        case "facebook":
            column = "facebook_url";
            break;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }

    const { data, error } = await supabase.from("artists").select("*").not(column, "is", null).eq("active", true).order("stage_name");
    if (error) throw error;
    return data ?? [];
}

// Recently joined artists
export async function fetchRecentArtists(limit = 10): Promise<Artist[]> {
    const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(limit);
    if (error) throw error;
    return data ?? [];
}

// Featured/recommended artists
export async function fetchFeaturedArtists(): Promise<Artist[]> {
    const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("verified", true)
        .eq("active", true)
        .not("profile_image_url", "is", null)
        .order("created_at", { ascending: false })
        .limit(6);
    if (error) throw error;
    return data ?? [];
}

// Update artist social links
export async function updateArtistSocials(
    id: string,
    socials: Partial<
        Pick<
            Artist,
            | "spotify_url"
            | "apple_music_url"
            | "soundcloud_url"
            | "youtube_url"
            | "instagram_url"
            | "tiktok_url"
            | "twitter_url"
            | "facebook_url"
            | "website_url"
        >
    >,
): Promise<Artist> {
    return updateArtist(id, socials);
}

// Toggle artist verification (admin only)
export async function toggleArtistVerification(id: string): Promise<Artist> {
    const artist = await fetchArtistById(id);
    if (!artist) throw new Error("Artist not found");

    return updateArtist(id, { verified: !artist.verified });
}

// Deactivate artist account
export async function deactivateArtist(id: string): Promise<Artist> {
    return updateArtist(id, { active: false });
}

// Reactivate artist account
export async function reactivateArtist(id: string): Promise<Artist> {
    return updateArtist(id, { active: true });
}
