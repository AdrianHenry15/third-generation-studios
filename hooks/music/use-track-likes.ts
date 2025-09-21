import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch likes for a track or artist
export function useTrackLikes(artistId?: string) {
    return useQuery({
        queryKey: ["track-likes", artistId],
        queryFn: async () => {
            let query = supabase.from("music.track-likes").select("*").order("created_at", { ascending: false });
            if (artistId) query = query.eq("artist_id", artistId);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

// Upsert a track like
export function useUpsertTrackLike() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (like: { track_id: string; user_id: string; artist_id?: string }) => {
            const { data, error } = await supabase
                .from("music.track-likes")
                .upsert([like], { onConflict: "track_id,user_id" })
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({ queryKey: ["track-likes", vars.artist_id] });
        },
    });
}

// Delete a track like
export function useDeleteTrackLike() {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, { track_id: string; user_id: string; artist_id?: string }>({
        mutationFn: async ({ track_id, user_id, artist_id }) => {
            const { error } = await supabase.from("music.track-likes").delete().eq("track_id", track_id).eq("user_id", user_id);
            if (error) throw error;
        },
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({ queryKey: ["track-likes", vars.artist_id] });
        },
    });
}

export function useTrackLikeState(trackId: string, artistId?: string) {
    const queryClient = useQueryClient();

    const likeQuery = useQuery({
        queryKey: ["track-like", trackId],
        queryFn: async () => {
            const { data: auth } = await supabase.auth.getUser();
            const user_id = auth?.user?.id ?? null;
            if (!user_id) return { user_id: null as string | null, liked: false };

            const { data, error } = await supabase
                .from("music.track-likes")
                .select("*")
                .eq("track_id", trackId)
                .eq("user_id", user_id)
                .maybeSingle();

            if (error && (error as any).code !== "PGRST116") throw error;
            return { user_id, liked: !!data };
        },
        // reduce background refetch churn for each like button
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    const upsert = useUpsertTrackLike();
    const del = useDeleteTrackLike();

    const toggleLike = async () => {
        const user_id = likeQuery.data?.user_id;
        if (!user_id) return;

        if (likeQuery.data?.liked) {
            await del.mutateAsync({ track_id: trackId, user_id, artist_id: artistId });
        } else {
            await upsert.mutateAsync({ track_id: trackId, user_id, artist_id: artistId });
        }
        await queryClient.invalidateQueries({ queryKey: ["track-like", trackId] });
        await queryClient.invalidateQueries({ queryKey: ["track-likes", artistId] });
    };

    const isLoading = likeQuery.isLoading || upsert.isPending || del.isPending;
    return { liked: !!likeQuery.data?.liked, toggleLike, isLoading };
}

// Bulk: get liked track ids for the current user in a single round-trip
export function useBulkUserTrackLikes(trackIds: string[]) {
    const ids = Array.from(new Set(trackIds.filter(Boolean)));
    return useQuery({
        queryKey: ["track-likes-bulk", ids.sort().join(",")],
        enabled: ids.length > 0,
        queryFn: async () => {
            const { data: auth } = await supabase.auth.getUser();
            const user_id = auth?.user?.id ?? null;
            if (!user_id) return { user_id: null as string | null, likedIds: new Set<string>() };

            const { data, error } = await supabase.from("music.track-likes").select("track_id").eq("user_id", user_id).in("track_id", ids);

            if (error) throw error;
            return { user_id, likedIds: new Set((data ?? []).map((r) => r.track_id as string)) };
        },
        staleTime: 2 * 60 * 1000,
        retry: false,
    });
}
