import { supabase } from "../supabase/client";

// All tables are now in the public schema; list allowed table names.
export type Table =
    | "tracks"
    | "albums"
    | "album_images"
    | "artist_verifications"
    | "artists"
    | "download_links"
    | "invites"
    | "track_credits"
    | "track_likes"
    | "profiles"
    | "remixes"
    | "playlists"
    | "playlist_tracks"
    | "playlist_likes";

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
