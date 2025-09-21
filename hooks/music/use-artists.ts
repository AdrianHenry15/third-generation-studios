import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch verified artists (public)
export function useArtists() {
    return useQuery({
        queryKey: ["artists"],
        queryFn: async () => {
            const { data, error } = await supabase.from("music.artists").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });
}

// Owner CRUD (RLS ensures only owner can mutate)
export function useUpsertArtist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (artist: { id?: string; stage_name: string }) => {
            const { data, error } = await supabase.from("music.artists").upsert(artist).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["artists"] }),
    });
}

export function useDeleteArtist() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("music.artists").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["artists"] }),
    });
}
