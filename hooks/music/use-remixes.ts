import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { supabase } from "@/lib/supabase/client";

// -------------------------
// QUERIES
// -------------------------

// Get all remixes
export function useRemixesQuery() {
    return useQuery({
        queryKey: QUERY_KEYS.remixes,
        queryFn: () => supabase.from("remixes").select("*"),
    });
}

// Get remix by track ID
export function useRemixByTrackIdQuery(trackId: string) {
    return useQuery({
        queryKey: [...QUERY_KEYS.remixes, "track", trackId],
        queryFn: () => supabase.from("remixes").select("*").eq("track_id", trackId).single(),
        enabled: !!trackId,
    });
}

// -------------------------
// MUTATIONS
// -------------------------

interface RemixData {
    track_id: string;
    original_song: string;
    url?: string | null;
    original_artists: string[];
    additional_artists?: string[] | null;
}

// Insert new remix
export const useRemixInsert = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RemixData) => {
            const { error } = await supabase.from("remixes").insert({
                track_id: data.track_id,
                original_song: data.original_song,
                url: data.url,
                original_artists: data.original_artists,
                additional_artists: data.additional_artists,
            });

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["remixes"] });
            queryClient.invalidateQueries({ queryKey: ["tracks"] });
        },
    });
};

// Update existing remix
export const useRemixUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RemixData) => {
            const { error } = await supabase
                .from("remixes")
                .update({
                    original_song: data.original_song,
                    url: data.url,
                    original_artists: data.original_artists,
                    additional_artists: data.additional_artists,
                    updated_at: new Date().toISOString(),
                })
                .eq("track_id", data.track_id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["remixes"] });
            queryClient.invalidateQueries({ queryKey: ["tracks"] });
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
            queryClient.invalidateQueries({ queryKey: ["remixes"] });
            queryClient.invalidateQueries({ queryKey: ["tracks"] });
        },
    });
};
