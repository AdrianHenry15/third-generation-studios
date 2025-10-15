// lib/api/trackCredits.ts
import { supabase } from "@/lib/supabase/client";
import type { TrackCreditWithRelations, TrackCreditInsert, TrackCreditUpdate } from "@/lib/types/database";

// Fetch all credits for a track
export async function fetchTrackCreditsByTrackId(trackId: string): Promise<TrackCreditWithRelations[]> {
    const { data, error } = await supabase
        .from("track_credits")
        .select(
            `
      *,
      artist:artist_id (
        id, stage_name, verified, active, profile_image_url,
        albums:albums (
          id, name, artist_id, created_at, release_date, type, updated_at
        ),
        tracks:tracks (
          id, title, artist_id, created_at, updated_at
        )
      ),
      track:track_id (
        id, title
      )
    `,
        )
        .eq("track_id", trackId)
        .order("role", { ascending: true });

    if (error) throw error;
    return data as TrackCreditWithRelations[];
}

// Fetch single track credit
export async function fetchTrackCreditById(id: string): Promise<TrackCreditWithRelations | null> {
    const { data, error } = await supabase
        .from("track_credits")
        .select(
            `
      *,
      artist:artist_id (
        id, stage_name, verified, active, profile_image_url
      ),
      track:track_id (
        id, title
      )
    `,
        )
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as TrackCreditWithRelations | null;
}

// Create track credit
export async function createTrackCredit(credit: TrackCreditInsert) {
    const { data, error } = await supabase.from("track_credits").insert(credit).select().single();

    if (error) throw error;
    return data as TrackCreditWithRelations;
}

// Update track credit
export async function updateTrackCredit(id: string, updates: TrackCreditUpdate) {
    const { data, error } = await supabase.from("track_credits").update(updates).eq("id", id).select().single();

    if (error) throw error;
    return data as TrackCreditWithRelations;
}

// Delete track credit
export async function deleteTrackCredit(id: string) {
    const { data, error } = await supabase.from("track_credits").delete().eq("id", id).select().single();

    if (error) throw error;
    return data as TrackCreditWithRelations;
}
