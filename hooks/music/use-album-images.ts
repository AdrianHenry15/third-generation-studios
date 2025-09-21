import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAlbumImages(albumId?: string) {
    return useQuery({
        queryKey: ["album-images", albumId],
        queryFn: async () => {
            if (!albumId) return [];
            const { data, error } = await supabase.from("music.album_images").select("*").eq("album_id", albumId);
            if (error) throw error;
            return data;
        },
        enabled: !!albumId,
    });
}

export function useUpsertAlbumImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (image: { id?: string; album_id: string; url: string; name?: string }) => {
            const { data, error } = await supabase.from("music.album_images").upsert(image).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: ["album-images", vars.album_id] }),
    });
}

export function useDeleteAlbumImage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, albumId }: { id: string; albumId: string }) => {
            const { error } = await supabase.from("music.album_images").delete().eq("id", id);
            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["album-images", albumId] });
        },
    });
}
