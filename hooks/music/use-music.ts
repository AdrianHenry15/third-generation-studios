import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/fetchers/query-keys";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/supabase-types";
import { deleteRow, fetchRowById, fetchTable, insertRow, updateRow } from "@/lib/fetchers/generic-fetchers";
import { useSearchTracksByArtistsQuery } from "./use-search";

// Use Supabase generated types
type Artist = Database["public"]["Tables"]["artists"]["Row"];
type Playlist = Database["public"]["Tables"]["playlists"]["Row"];
type Track = Database["public"]["Tables"]["tracks"]["Row"];

// Generic fetch hooks
type Table = Parameters<typeof fetchTable>[0];

// READ
export function useMusicQuery<T extends Table>(table: T, key: keyof typeof QUERY_KEYS) {
    const queryKey = QUERY_KEYS[key];
    return useQuery({
        queryKey: Array.isArray(queryKey) ? queryKey : (queryKey as any).all || queryKey,
        queryFn: () => fetchTable<T>(table),
    });
}

export function useMusicQueryById<T extends Table>(table: T, key: keyof typeof QUERY_KEYS, id: string) {
    const queryKey = QUERY_KEYS[key];
    const baseKey = Array.isArray(queryKey) ? queryKey : (queryKey as any).all || [queryKey];
    return useQuery({
        queryKey: [...baseKey, id],
        queryFn: () => fetchRowById(table, id),
        enabled: !!id, // Only run query if id is provided
    });
}

// Specific hook for current artist's tracks (requires auth context)
export function useMyTracksQuery(currentArtistId?: string) {
    return useSearchTracksByArtistsQuery(currentArtistId || "", !!currentArtistId);
}

// Mutation hooks
export function useMusicInsert<T extends Table>(table: T, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    const queryKey = QUERY_KEYS[key];
    return useMutation({
        mutationFn: (values: Database["public"]["Tables"][T]["Insert"]) => insertRow(table, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : (queryKey as any).all || queryKey }),
    });
}
export function useMusicUpdate<T extends Table>(table: T, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    const queryKey = QUERY_KEYS[key];
    return useMutation({
        mutationFn: ({ id, values }: { id: string; values: Partial<Database["public"]["Tables"][T]["Row"]> }) =>
            updateRow(table, id, values),
        onSuccess: () => qc.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : (queryKey as any).all || queryKey }),
    });
}
export function useMusicDelete(table: Table, key: keyof typeof QUERY_KEYS) {
    const qc = useQueryClient();
    const queryKey = QUERY_KEYS[key];
    return useMutation({
        mutationFn: (id: string) => deleteRow(table, id),
        onSuccess: () => qc.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : (queryKey as any).all || queryKey }),
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
            return (data ?? []) as Pick<Playlist, "id" | "name" | "cover_image_url" | "track_count">[];
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
            return (data ?? []) as Pick<Track, "id" | "title" | "duration">[];
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
                .from("artists")
                .select("id,stage_name,profile_image_url,verified")
                .ilike("stage_name", pattern)
                .order("verified", { ascending: false })
                .limit(12);
            if (error) throw error;
            return (data ?? []) as Pick<Artist, "id" | "stage_name" | "profile_image_url" | "verified">[];
        },
        enabled,
        staleTime: 1000 * 30,
        retry: 1,
    });
}
