import { supabase } from "../supabase/client";
import { ITrackProps } from "../solo-q-types/music-types";

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
    const { data, error } = await supabase.from("tracks").select(`
            *,
            album:albums(
                *,
                images:album_images(*)
            ),
            artist:artists(*),
            credits:track_credits(*)
        `);

    if (error) throw error;

    // Transform the data to match ITrackProps structure
    return data.map((track: any) => ({
        ...track,
        // The main artist from the tracks table
        artists: track.artist ? [track.artist] : [],
        // Credits from track_credits table
        credits: track.credits || [],
        // Determine track type based on release_date and locked status
        type: !track.release_date ? "Unreleased" : track.locked ? "Unreleased" : "Released",
        // Convert duration from seconds to milliseconds if needed
        duration: track.duration * 1000,
        // Format release_date as string
        release_date: track.release_date || "",
        // Add default values for missing properties
        is_liked: false, // This would need to come from a user-specific likes table
        genre: track.genre || "",
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

    return data as ITrackProps;
}

// Specialized fetcher for tracks by specific artist
export async function fetchTracksByArtist(artistId: string): Promise<ITrackProps[]> {
    const { data, error } = await supabase
        .from("tracks")
        .select(
            `
            *,
            album:albums(
                *,
                images:album_images(*)
            ),
            artist:artists(*),
            credits:track_credits(*)
        `,
        )
        .eq("artist_id", artistId);

    if (error) throw error;

    // Transform the data to match ITrackProps structure
    return data.map((track: any) => ({
        ...track,
        // The main artist from the tracks table
        artists: track.artist ? [track.artist] : [],
        // Credits from track_credits table
        credits: track.credits || [],
        // Determine track type based on release_date and locked status
        type: !track.release_date ? "Unreleased" : track.locked ? "Unreleased" : "Released",
        // Convert duration from seconds to milliseconds if needed
        duration: track.duration * 1000,
        // Format release_date as string
        release_date: track.release_date || "",
        // Add default values for missing properties
        is_liked: false, // This would need to come from a user-specific likes table
        genre: track.genre || "",
    })) as ITrackProps[];
}
