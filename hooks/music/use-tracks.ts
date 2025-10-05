import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { useMusicQuery } from "./use-music";
import { fetchTracksWithJoins } from "@/lib/fetchers/track-fetchers";
import { ITrackCreditProps, ITrackProps } from "@/lib/types/music-types";
import { fetchTable, insertRow, updateRow } from "@/lib/fetchers/generic-fetchers.ts";

// -------------------------
// Queries
// -------------------------

export function useTracksWithJoinsQuery() {
    return useQuery<ITrackProps[]>({
        queryKey: QUERY_KEYS.tracks,
        queryFn: () => fetchTracksWithJoins(),
    });
}

export function useTrackByIdWithJoinsQuery(id?: string | number) {
    return useQuery<ITrackProps>({
        queryKey: [...QUERY_KEYS.tracks, "with-joins", id],
        queryFn: async () => {
            const tracks = await fetchTracksWithJoins({ trackId: id });
            if (!tracks?.[0]) throw new Error("Track not found");
            return tracks[0]; // Return single track
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}

export function useTracksByArtistQuery(artistId?: string) {
    return useQuery<ITrackProps[]>({
        queryKey: [...QUERY_KEYS.tracks, "artist", artistId],
        queryFn: () => fetchTracksWithJoins({ artistId }),
        enabled: !!artistId,
    });
}

export function useMyTracksQuery(currentArtistId?: string) {
    return useTracksByArtistQuery(currentArtistId);
}

// -------------------------
// Track Credits
// -------------------------

export function useTrackCreditsQuery(trackId?: string) {
    return useQuery<ITrackCreditProps[]>({
        queryKey: ["track_credits", trackId],
        queryFn: () => fetchTable<ITrackCreditProps>("track_credits"),
        select: (data) => (trackId ? data.filter((credit) => credit.track_id === trackId) : data),
        enabled: !!trackId,
    });
}

export function useAllTrackCreditsQuery() {
    return useMusicQuery<ITrackCreditProps>("track_credits", "track_credits" as keyof typeof QUERY_KEYS);
}

// -------------------------
// Mutations
// -------------------------

export function useTrackCreditInsert() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<ITrackCreditProps>) => insertRow<ITrackCreditProps>("track_credits", values),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.tracks });
            qc.invalidateQueries({ queryKey: ["track_credits"] });
        },
    });
}

export function useTrackUpdate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, values }: { id: string | number; values: Partial<ITrackProps> }) => updateRow<ITrackProps>("tracks", id, values),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.tracks });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.tracks, variables.id] });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.tracks, "artist"] });
        },
    });
}
