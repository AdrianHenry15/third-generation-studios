import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAlbums(artistId?: string) {
    return useQuery({
        queryKey: ["albums", artistId],
        queryFn: async () => {
            let query = supabase.from("music.albums").select("*").order("release_date", { ascending: false });
            if (artistId) query = query.eq("artist_id", artistId);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
        enabled: !!artistId || artistId === undefined, // public fetch allowed
    });
}

export function useUpsertAlbum() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (album: { id?: string; artist_id: string; name: string; type: string; release_date: string }) => {
            const { data, error } = await supabase.from("music.albums").upsert(album).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: ["albums", vars.artist_id] }),
    });
}

export function useDeleteAlbum() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, artistId }: { id: string; artistId?: string }) => {
            const { error } = await supabase.from("music.albums").delete().eq("id", id);
            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["albums", artistId] });
        },
    });
}
