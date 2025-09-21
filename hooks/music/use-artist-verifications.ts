import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch artist verification (owner)
export function useArtistVerifications(userId?: string) {
    return useQuery({
        queryKey: ["artist-verifications", userId],
        queryFn: async () => {
            if (!userId) return [];
            const { data, error } = await supabase.from("music.artist_verifications").select("*").eq("user_id", userId);
            if (error) throw error;
            return data;
        },
        enabled: !!userId,
    });
}

// Submit / update verification (owner only)
export function useUpsertArtistVerification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (verification: { id?: string; user_id: string; status: string }) => {
            const { data, error } = await supabase.from("music.artist_verifications").upsert(verification).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: ["artist-verifications", vars.user_id] }),
    });
}

export function useDeleteArtistVerification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("music.artist_verifications").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["artist-verifications"] }),
    });
}
