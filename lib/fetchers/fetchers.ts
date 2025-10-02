import { supabase } from "../supabase/client";
import { ITrackProps, TrackType } from "../solo-queue-types/music-types";

// All tables are now in the public schema; list allowed table names.
type Table =
    | "tracks"
    | "albums"
    | "album_images"
    | "artist_verifications"
    | "artists"
    | "download_links"
    | "invites"
    | "track_credits"
    | "track_likes"
    | "profiles";

export async function fetchTable<T>(table: Table): Promise<T[]> {
    // table names reference the public schema directly
    const tableName = table;

    const { data, error } = await supabase.from(tableName).select("*");
    if (error) throw error;
    return data as T[];
}

export async function fetchRowById<T>(table: Table, id: string | number): Promise<T | null> {
    const tableName = table;

    const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single();
    if (error) throw error;
    return data as T;
}

export async function insertRow<T>(table: Table, values: Partial<T>) {
    const tableName = table;

    const { data, error } = await supabase.from(tableName).insert(values).select();
    if (error) throw error;
    return data?.[0] as T;
}

export async function updateRow<T>(table: Table, id: string | number, values: Partial<T>) {
    const tableName = table;

    const { data, error } = await supabase.from(tableName).update(values).eq("id", id).select();
    if (error) throw error;
    return data?.[0] as T;
}

export async function deleteRow(table: Table, id: string | number) {
    const tableName = table;

    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) throw error;
    return true;
}

// Specialized fetcher for tracks with complete data (albums, artists, etc.)
export async function fetchTracksWithJoins(): Promise<ITrackProps[]> {
    const { data, error } = await supabase
        .from("tracks")
        .select(
            `
            *,
            artists!tracks_artist_id_fkey(*),
            album:albums!tracks_album_id_fkey(
                *,
                images:album_images(*)
            ),
            credits:track_credits(*)
        `,
        )
        .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((track) => ({
        ...track,
        artists: track.artists ? [track.artists] : [], // Convert single artist to array
        type: computeTrackType(track.release_date, track.locked),
        is_liked: false, // This would come from a separate likes query
    })) as ITrackProps[];
}

// Specialized fetcher for single track with joins
export async function fetchTrackByIdWithJoins(id: string | number): Promise<ITrackProps> {
    const { data, error } = await supabase
        .from("tracks")
        .select(
            `
            *,
            artists!tracks_artist_id_fkey(*),
            album:albums!tracks_album_id_fkey(
                *,
                images:album_images(*)
            ),
            credits:track_credits(*)
        `,
        )
        .eq("id", id)
        .single();

    if (error) throw error;
    if (!data) throw new Error("Track not found");

    return {
        ...data,
        artists: data.artists ? [data.artists] : [], // Convert single artist to array
        type: computeTrackType(data.release_date, data.locked),
        is_liked: false,
    } as ITrackProps;
}

// Specialized fetcher for tracks by specific artist
export async function fetchTracksByArtist(artistId: string): Promise<ITrackProps[]> {
    const { data, error } = await supabase
        .from("tracks")
        .select(
            `
            *,
            artists!tracks_artist_id_fkey(*),
            album:albums!tracks_album_id_fkey(
                *,
                images:album_images(*)
            ),
            credits:track_credits(*)
        `,
        )
        .eq("artist_id", artistId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((track) => ({
        ...track,
        artists: track.artists ? [track.artists] : [],
        type: computeTrackType(track.release_date, track.locked),
        is_liked: false,
    })) as ITrackProps[];
}

// Helper function to compute track type
function computeTrackType(release_date: string | null, locked: boolean): TrackType {
    if (locked) return "Unreleased";
    if (!release_date) return "Work In Progress";

    const releaseDate = new Date(release_date);
    const now = new Date();

    if (releaseDate <= now) return "Released";
    return "Unreleased";
}
