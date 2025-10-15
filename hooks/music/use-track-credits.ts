import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TrackCreditWithRelations, TrackCreditInsert, TrackCreditUpdate } from "@/lib/types/database";
import { createTrackCredit, deleteTrackCredit, fetchTrackCreditsByTrackId, updateTrackCredit } from "@/lib/fetchers/track-credit-fetchers";

export function useTrackCredits(trackId?: string) {
    const queryClient = useQueryClient();

    // Fetch all credits for a track
    const creditsQuery = useQuery<TrackCreditWithRelations[]>({
        queryKey: ["trackCredits", trackId],
        queryFn: () => {
            if (!trackId) return Promise.resolve([]);
            return fetchTrackCreditsByTrackId(trackId);
        },
        enabled: !!trackId,
    });

    // Create
    const createMutation = useMutation({
        mutationFn: (credit: TrackCreditInsert) => createTrackCredit(credit),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trackCredits", trackId] });
        },
    });

    // Update
    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: TrackCreditUpdate }) => updateTrackCredit(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trackCredits", trackId] });
        },
    });

    // Delete
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteTrackCredit(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trackCredits", trackId] });
        },
    });

    return {
        creditsQuery,
        createMutation,
        updateMutation,
        deleteMutation,
    };
}
