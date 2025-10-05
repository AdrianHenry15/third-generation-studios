import { supabase } from "../supabase/client";
import { IRemixProps } from "../types/music-types";

// Remix fetchers
export async function fetchRemixes(): Promise<IRemixProps[]> {
    const { data, error } = await supabase.from("remixes").select("*").order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function fetchRemixByTrackId(trackId: string): Promise<IRemixProps | null> {
    const { data, error } = await supabase.from("remixes").select("*").eq("track_id", trackId).single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 is "not found"
    return data;
}

export async function fetchRemixesWithJoins(): Promise<IRemixProps[]> {
    const { data, error } = await supabase
        .from("remixes")
        .select(
            `
            *,
            track:tracks(
                id,
                title,
                duration,
                plays,
                album:albums(
                    id,
                    name,
                    type,
                    images:album_images(url, width, height)
                ),
                artists:track_artists(
                    artist:artists(
                        id,
                        stage_name,
                        profile_image_url
                    )
                )
            )
        `,
        )
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}
