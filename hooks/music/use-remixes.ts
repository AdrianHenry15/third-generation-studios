import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/fetchers/query-keys";
import { supabase } from "@/lib/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/types/supabase-types";

// -------------------------
// TYPES
// -------------------------

// Use proper Supabase types
export type RemixRow = Tables<"remixes">;
export type RemixInsert = TablesInsert<"remixes">;
export type RemixUpdate = TablesUpdate<"remixes">;

// Interface for mutation data - simplified to match what we actually need
interface RemixMutationData {
    track_id: string;
    original_song: string;
    url?: string | null;
    original_artists: string[]; // Will be converted to Json in mutations
}

// -------------------------
// QUERIES
// -------------------------

// Get all remixes
export function useRemixesQuery() {
    return useQuery({
        queryKey: QUERY_KEYS.remixes,
        queryFn: async () => {
            const { data, error } = await supabase.from("remixes").select("*");
            if (error) throw error;
            return data as RemixRow[];
        },
    });
}

// Get remix by track ID
export function useRemixByTrackIdQuery(trackId: string) {
    return useQuery({
        queryKey: [...QUERY_KEYS.remixes, "track", trackId],
        queryFn: async () => {
            const { data, error } = await supabase.from("remixes").select("*").eq("track_id", trackId).single();

            if (error) throw error;
            return data as RemixRow;
        },
        enabled: !!trackId,
    });
}

// -------------------------
// MUTATIONS
// -------------------------

// Insert new remix
export const useRemixInsert = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RemixMutationData) => {
            const insertData: RemixInsert = {
                track_id: data.track_id,
                original_song: data.original_song,
                url: data.url,
                original_artists: data.original_artists as any, // Json type in Supabase
            };

            const { error } = await supabase.from("remixes").insert(insertData);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.remixes });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tracks.all });
        },
    });
};

// Update existing remix
export const useRemixUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RemixMutationData) => {
            const updateData: RemixUpdate = {
                original_song: data.original_song,
                url: data.url,
                original_artists: data.original_artists as any, // Json type in Supabase
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase.from("remixes").update(updateData).eq("track_id", data.track_id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.remixes });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tracks.all });
        },
    });
};

// Delete remix
export const useRemixDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (trackId: string) => {
            const { error } = await supabase.from("remixes").delete().eq("track_id", trackId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.remixes });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tracks.all });
        },
    });
};
