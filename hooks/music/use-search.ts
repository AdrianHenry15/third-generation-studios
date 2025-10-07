// -----------------------------
// Search helpers
// -----------------------------
import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { IArtistProps, IPlaylistProps, ITrackProps } from "@/lib/types/music-types";

const DEBUG_SEARCH = true;

function dbg(group: string, payload: Record<string, unknown>) {
    // eslint-disable-next-line no-console
    if (DEBUG_SEARCH) console.debug(`[search] ${group}`, payload);
}

function sanitizeForFilter(value: string) {
    return value.replace(/[^\w\s-]/g, "").trim(); // remove dangerous symbols
}

function toPattern(value: string) {
    return `%${value}%`;
}

// -----------------------------
// Playlists
// -----------------------------
export function useSearchPlaylistsQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "playlists", q],
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) {
                dbg("playlists:skip-empty", { q });
                return [];
            }

            const pattern = toPattern(query);
            dbg("playlists:req", { q, query, pattern });

            const t0 = performance.now();
            const { data, error } = await supabase
                .from("playlists")
                .select("id,name,cover_image_url,track_count")
                .ilike("name", pattern)
                .order("updated_at", { ascending: false })
                .limit(12);
            const dt = Math.round(performance.now() - t0);

            if (error) {
                dbg("playlists:err", { q, query, pattern, ms: dt, error });
                throw error;
            }
            dbg("playlists:ok", { q, query, pattern, ms: dt, count: data?.length ?? 0 });
            return (data ?? []) as Pick<IPlaylistProps, "id" | "name" | "cover_image_url" | "track_count">[];
        },
        enabled,
        staleTime: 30_000,
        retry: 1,
    });
}

// -----------------------------
// Tracks
// -----------------------------
export function useSearchTracksQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "tracks", q],
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) {
                dbg("tracks:skip-empty", { q });
                return [];
            }

            const pattern = toPattern(query);
            const orExpr = `title.ilike.${pattern},genre.ilike.${pattern}`;
            dbg("tracks:req", { q, query, pattern, orExpr });

            const t0 = performance.now();
            const { data, error } = await supabase
                .from("tracks")
                .select("id,title,duration")
                .or(orExpr)
                .order("plays", { ascending: false })
                .limit(12);
            const dt = Math.round(performance.now() - t0);

            if (error) {
                dbg("tracks:err", { q, query, pattern, orExpr, ms: dt, error });
                throw error;
            }
            dbg("tracks:ok", { q, query, pattern, orExpr, ms: dt, count: data?.length ?? 0 });
            return (data ?? []) as Pick<ITrackProps, "id" | "title" | "duration">[];
        },
        enabled,
        staleTime: 30_000,
        retry: 1,
    });
}

// -----------------------------
// Artists
// -----------------------------
export function useSearchArtistsQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "artists", q],
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) {
                dbg("artists:skip-empty", { q });
                return [];
            }

            const pattern = toPattern(query);
            dbg("artists:req", { q, query, pattern });

            const t0 = performance.now();
            const { data, error } = await supabase
                .from("artists")
                .select("id,stage_name,profile_image_url,verified")
                .ilike("stage_name", pattern)
                .order("verified", { ascending: false })
                .limit(12);
            const dt = Math.round(performance.now() - t0);

            if (error) {
                dbg("artists:err", { q, query, pattern, ms: dt, error });
                throw error;
            }
            dbg("artists:ok", { q, query, pattern, ms: dt, count: data?.length ?? 0 });
            return (data ?? []) as Pick<IArtistProps, "id" | "stage_name" | "profile_image_url" | "verified">[];
        },
        enabled,
        staleTime: 30_000,
        retry: 1,
    });
}

// -----------------------------
// Tracks by matching artists (stage_name)
// -----------------------------
export function useSearchTracksByArtistsQuery(q: string, enabled: boolean) {
    return useQuery({
        queryKey: ["search", "tracks-by-artists", q],
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) {
                dbg("tracks-by-artists:skip-empty", { q });
                return [] as Pick<ITrackProps, "id" | "title" | "duration" | "artist_id">[];
            }

            const pattern = toPattern(query);
            dbg("tracks-by-artists:req", { q, query, pattern });

            const t0 = performance.now();
            // 1) Find matching artists (id only)
            const { data: artists, error: artistErr } = await supabase.from("artists").select("id").ilike("stage_name", pattern).limit(24);

            if (artistErr) {
                dbg("tracks-by-artists:err-artists", { q, query, pattern, error: artistErr });
                throw artistErr;
            }

            const artistIds = (artists ?? []).map((a) => a.id).filter(Boolean);
            dbg("tracks-by-artists:artists", { count: artistIds.length });

            if (artistIds.length === 0) {
                const dt = Math.round(performance.now() - t0);
                dbg("tracks-by-artists:ok-none", { q, ms: dt });
                return [] as Pick<ITrackProps, "id" | "title" | "duration" | "artist_id">[];
            }

            // 2) Fetch tracks by those artist ids
            const { data: tracks, error: tracksErr } = await supabase
                .from("tracks")
                .select("id,title,duration,artist_id")
                .in("artist_id", artistIds)
                .order("plays", { ascending: false })
                .limit(24);

            const dt = Math.round(performance.now() - t0);

            if (tracksErr) {
                dbg("tracks-by-artists:err-tracks", { q, query, pattern, ms: dt, error: tracksErr });
                throw tracksErr;
            }

            dbg("tracks-by-artists:ok", { q, query, pattern, ms: dt, count: tracks?.length ?? 0 });
            return (tracks ?? []) as Pick<ITrackProps, "id" | "title" | "duration" | "artist_id">[];
        },
        enabled,
        staleTime: 30_000,
        retry: 1,
    });
}
