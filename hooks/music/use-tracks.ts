import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import {
    fetchTracksWithJoins,
    fetchTrackByIdWithJoins,
    fetchTracksByArtist,
    insertRow,
    fetchTable,
    updateRow,
} from "@/lib/fetchers/fetchers";
import { ITrackCreditProps, ITrackProps } from "@/lib/types";
import { useMusicQuery } from "./use-music";

// Specific hook for tracks with joined data (album, artists, etc.)
export function useTracksWithJoinsQuery() {
    return useQuery({
        queryKey: QUERY_KEYS.tracks,
        queryFn: fetchTracksWithJoins,
    });
}

// Specific hook for single track with joins
export function useTrackByIdWithJoinsQuery(id: string | number) {
    return useQuery({
        queryKey: [...QUERY_KEYS.tracks, "with-joins", id],
        queryFn: () => fetchTrackByIdWithJoins(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

// Specific hook for tracks by artist
export function useTracksByArtistQuery(artistId: string) {
    return useQuery({
        queryKey: [...QUERY_KEYS.tracks, "artist", artistId],
        queryFn: () => fetchTracksByArtist(artistId),
        enabled: !!artistId,
    });
}

// Specific hook for current artist's tracks (requires auth context)
export function useMyTracksQuery(currentArtistId?: string) {
    return useTracksByArtistQuery(currentArtistId || "");
}

// Specific hook for getting track credits
export function useTrackCreditsQuery(trackId?: string) {
    return useQuery({
        queryKey: ["track_credits", trackId],
        queryFn: () => fetchTable<ITrackCreditProps>("track_credits"),
        select: (data) => (trackId ? data.filter((credit) => credit.track_id === trackId) : data),
        enabled: !!trackId,
    });
}

// Specific hook for all track credits
export function useAllTrackCreditsQuery() {
    return useMusicQuery<ITrackCreditProps>("track_credits", "track_credits" as keyof typeof QUERY_KEYS);
}

// MUTATIONS
// Specific hook for inserting track credits
export function useTrackCreditInsert() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<ITrackCreditProps>) => insertRow<ITrackCreditProps>("track_credits", values),
        onSuccess: () => {
            // Invalidate both track credits and tracks queries since tracks include credits
            qc.invalidateQueries({ queryKey: QUERY_KEYS.tracks });
            qc.invalidateQueries({ queryKey: ["track_credits"] });
        },
    });
}

// Specific hook for updating tracks with proper invalidation
export function useTrackUpdate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, values }: { id: string | number; values: Partial<ITrackProps> }) => updateRow<ITrackProps>("tracks", id, values),
        onSuccess: (data, variables) => {
            // Invalidate multiple related queries
            qc.invalidateQueries({ queryKey: QUERY_KEYS.tracks });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.tracks, variables.id] });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.tracks, "artist"] });
        },
    });
}
