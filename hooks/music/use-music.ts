import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTable, insertRow, updateRow, deleteRow, fetchRowById } from "@/lib/fetchers/generic-fetchers.ts";
import { QUERY_KEYS } from "@/lib/fetchers/query-keys";
import { fetchTrackByIdWithJoins, fetchTracksByArtist, fetchTracksWithJoins } from "@/lib/fetchers/track-fetchers";
import { ITrackProps } from "@/lib/types/music-types";

// Generic fetch hooks
type Table = Parameters<typeof fetchTable>[0];

// READ
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
        queryFn: () => fetchTracksWithJoins(),
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
