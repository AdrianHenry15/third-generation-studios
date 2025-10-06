import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTable, insertRow, updateRow, deleteRow, fetchRowById } from "@/lib/fetchers/generic-fetchers.ts";
import { QUERY_KEYS } from "@/lib/fetchers/query-keys";
import { useTracksByArtistQuery } from "./use-tracks";
import { supabase } from "@/lib/supabase/client";
import type { IArtistProps, IPlaylistProps, ITrackProps } from "@/lib/types/music-types";

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

// -----------------------------
// Search helpers (sanitize + pattern)
// -----------------------------
function sanitizeForFilter(value: string) {
    // Remove characters that break PostgREST parsing in filters
    return value.replace(/[(),]/g, " ").trim();
}
function toIlikePattern(value: string) {
    return `%${value}%`;
}

// -----------------------------
// Search hooks (centralized)
// -----------------------------
export function useSearchPlaylistsQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "playlists", q],
        queryFn: async () => {
            const pattern = toIlikePattern(sanitizeForFilter(q));
            const { data, error } = await supabase
                .from("playlists")
                .select("id,name,cover_image_url,track_count")
                .ilike("name", pattern)
                .order("updated_at", { ascending: false })
                .limit(12);
            if (error) throw error;
            return (data ?? []) as Pick<IPlaylistProps, "id" | "name" | "cover_image_url" | "track_count">[];
        },
        enabled,
        staleTime: 1000 * 30,
        retry: 1,
    });
}

export function useSearchTracksQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "tracks", q],
        queryFn: async () => {
            const pattern = toIlikePattern(sanitizeForFilter(q));
            // Important: no extra wrapping parens to avoid 400 from PostgREST
            const orExpr = `title.ilike.${pattern},genre.ilike.${pattern}`;
            const { data, error } = await supabase
                .from("tracks")
                .select("id,title,duration")
                .or(orExpr)
                .order("plays", { ascending: false })
                .limit(12);
            if (error) throw error;
            return (data ?? []) as Pick<ITrackProps, "id" | "title" | "duration">[];
        },
        enabled,
        staleTime: 1000 * 30,
        retry: 1,
    });
}

export function useSearchArtistsQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "artists", q],
        queryFn: async () => {
            const pattern = toIlikePattern(sanitizeForFilter(q));
            const { data, error } = await supabase
                .from("profiles")
                .select("id,stage_name,profile_image_url,verified")
                .ilike("stage_name", pattern)
                .order("verified", { ascending: false })
                .limit(12);
            if (error) throw error;
            return (data ?? []) as Pick<IArtistProps, "id" | "stage_name" | "profile_image_url" | "verified">[];
        },
        enabled,
        staleTime: 1000 * 30,
        retry: 1,
    });
}
