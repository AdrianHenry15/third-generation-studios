import { supabase } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpsertAlbumImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (image: { id?: string; album_id: string; url: string; name?: string }) => {
            const { data, error } = await supabase.from("music.track_credits").upsert(image).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: ["track-credits", vars.album_id] }),
    });
}

export function useDeleteAlbumImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, albumId }: { id: string; albumId: string }) => {
            const { error } = await supabase.from("music.track_credits").delete().eq("id", id);
            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["track-credits", albumId] });
        },
    });
}
