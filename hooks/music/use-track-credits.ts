import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { TrackCreditWithRelations, TrackCreditInsert, TrackCreditUpdate } from "@/lib/types/database";
import { createTrackCredit, deleteTrackCredit, fetchTrackCreditsByTrackId, updateTrackCredit } from "@/lib/fetchers/track-credit-fetchers";

// Query Keys
export const trackCreditKeys = {
    all: ["track-credits"] as const,
    lists: () => [...trackCreditKeys.all, "list"] as const,
    byTrack: (trackId: string) => [...trackCreditKeys.all, "by-track", trackId] as const,
    detail: (id: string) => [...trackCreditKeys.all, "detail", id] as const,
};

// Query Hooks
export function useTrackCreditsByTrackId(trackId: string, enabled = true) {
    return useQuery({
        queryKey: trackCreditKeys.byTrack(trackId),
        queryFn: () => fetchTrackCreditsByTrackId(trackId),
        enabled: !!trackId && enabled,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

// Singular version for fetching a single track's credits (returns array)
export function useTrackCreditByTrackId(trackId: string, enabled = true) {
    return useQuery({
        queryKey: trackCreditKeys.byTrack(trackId),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("track_credits")
                .select("*")
                .eq("track_id", trackId);

            if (error) throw error;
            return data || [];
        },
        enabled: !!trackId && enabled,
        staleTime: 10 * 60 * 1000,
    });
}

// Mutation Hooks
export function useCreateTrackCredit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credit: TrackCreditInsert) => createTrackCredit(credit),
        onSuccess: (newCredit) => {
            // Invalidate the track's credits list
            queryClient.invalidateQueries({ queryKey: trackCreditKeys.byTrack(newCredit.track_id) });
            queryClient.invalidateQueries({ queryKey: ["tracks", "detail", newCredit.track_id] });
        },
    });
}

export function useUpdateTrackCredit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: TrackCreditUpdate }) => updateTrackCredit(id, updates),
        onSuccess: (updatedCredit) => {
            // Invalidate the track's credits list
            queryClient.invalidateQueries({ queryKey: trackCreditKeys.byTrack(updatedCredit.track_id) });
            queryClient.invalidateQueries({ queryKey: ["tracks", "detail", updatedCredit.track_id] });
        },
    });
}

export function useDeleteTrackCredit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTrackCredit(id),
        onSuccess: (_, deletedId) => {
            // Invalidate all track credits
            queryClient.invalidateQueries({ queryKey: trackCreditKeys.all });
        },
    });
}

// Combined hook (legacy support - for backwards compatibility)
export function useTrackCredits(trackId?: string) {
    const createMutation = useCreateTrackCredit();
    const updateMutation = useUpdateTrackCredit();
    const deleteMutation = useDeleteTrackCredit();

    // Use the query hook if trackId is provided
    const creditsQuery = useTrackCreditsByTrackId(trackId || "", !!trackId);

    return {
        creditsQuery,
        createMutation,
        updateMutation,
        deleteMutation,
    };
}
