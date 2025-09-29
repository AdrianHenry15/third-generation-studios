import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import {
    fetchTable,
    insertRow,
    updateRow,
    deleteRow,
    fetchRowById,
    fetchTracksWithJoins,
    fetchTrackByIdWithJoins,
    fetchTracksByArtist,
} from "@/lib/fetchers/fetchers";
import { ITrackCreditProps, IArtistProps } from "@/lib/solo-q-types/music-types";

// Generic fetch hooks
type Table = Parameters<typeof fetchTable>[0];

export function useMusicQuery<T>(table: Table, key: keyof typeof QUERY_KEYS) {
    return useQuery({
        queryKey: QUERY_KEYS[key],
        queryFn: () => fetchTable<T>(table),
    });
}

export function useMusicQueryById<T>(table: Table, key: keyof typeof QUERY_KEYS, id: string | number) {
    return useQuery({
        queryKey: [...QUERY_KEYS[key], id],
        queryFn: () => fetchRowById<T>(table, id),
        enabled: !!id, // Only run query if id is provided
    });
}

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
        queryKey: [...QUERY_KEYS.tracks, id],
        queryFn: () => fetchTrackByIdWithJoins(id),
        enabled: !!id,
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

// Mutation hooks
export function useMusicInsert<T>(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<T>) => insertRow<T>(table, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS[key] }),
    });
}

export function useMusicUpdate<T>(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, values }: { id: string | number; values: Partial<T> }) => updateRow<T>(table, id, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS[key] }),
    });
}

export function useMusicDelete(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteRow(table, id),
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS[key] }),
    });
}

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

// Specific hook for getting artist by ID
export function useArtistById(artistId: string) {
    return useMusicQueryById<IArtistProps>("artists", "artists" as keyof typeof QUERY_KEYS, artistId);
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
