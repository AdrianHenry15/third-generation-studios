import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useTracks(artistId?: string) {
    return useQuery({
        queryKey: ["tracks", artistId],
        queryFn: async () => {
            let query = supabase.from("music.tracks").select("*").order("release_date", { ascending: false });
            if (artistId) query = query.eq("artist_id", artistId);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

export function useUpsertTrack() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (track: {
            id?: string;
            title: string;
            album_id: string;
            artist_id: string;
            type: string;
            duration: number;
            url: string;
        }) => {
            const { data, error } = await supabase.from("music.tracks").upsert(track).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: ["tracks", vars.artist_id] }),
    });
}

export function useDeleteTrack() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, artistId }: { id: string; artistId?: string }) => {
            const { error } = await supabase.from("music.tracks").delete().eq("id", id);
            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["tracks", artistId] });
        },
    });
}
