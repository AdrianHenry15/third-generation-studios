import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/fetchers/query-keys";
import { fetchPlaylistsWithJoins, fetchPlaylistByIdWithJoins, fetchPlaylistsByUser } from "@/lib/fetchers/playlist-fetchers";
import { IPlaylistProps } from "@/lib/types/music-types";
import { insertRow, updateRow } from "@/lib/fetchers/generic-fetchers.ts";
import { supabase } from "@/lib/supabase/client";

// -------------------------
// QUERY HOOKS
// -------------------------

/**
 * Fetch all playlists with related data (tracks, creators, etc.)
 */
export function usePlaylistsQuery() {
    return useQuery<IPlaylistProps[]>({
        queryKey: QUERY_KEYS.playlists,
        queryFn: fetchPlaylistsWithJoins,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Fetch a single playlist by ID with all related data
 */
export function usePlaylistByIdQuery(playlistId?: string) {
    return useQuery<IPlaylistProps>({
        queryKey: [...QUERY_KEYS.playlists, playlistId],
        queryFn: () => fetchPlaylistByIdWithJoins(playlistId!),
        enabled: !!playlistId,
        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Fetch all playlists created by a specific user
 */
export function usePlaylistsByUserQuery(userId?: string) {
    return useQuery<IPlaylistProps[]>({
        queryKey: [...QUERY_KEYS.playlists, "user", userId],
        queryFn: () => fetchPlaylistsByUser(userId!),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
}

// -------------------------
// MUTATION HOOKS - PLAYLIST CRUD
// -------------------------

/**
 * Create a new playlist
 */
export function usePlaylistInsert() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<IPlaylistProps>) => insertRow<IPlaylistProps>("playlists", values),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
        },
    });
}

/**
 * Update an existing playlist
 */
export function usePlaylistUpdate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, values }: { id: string; values: Partial<IPlaylistProps> }) => updateRow<IPlaylistProps>("playlists", id, values),
        onSuccess: (data, variables) => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.playlists, variables.id] });
        },
    });
}

/**
 * Delete a playlist by id (optimistic update)
 */
export function usePlaylistDelete() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (playlistId: string) => {
            const { error } = await supabase.from("playlists").delete().eq("id", playlistId);
            if (error) throw error;
            return playlistId;
        },
        onMutate: async (playlistId: string) => {
            await qc.cancelQueries({ queryKey: QUERY_KEYS.playlists });
            const prev = qc.getQueryData<IPlaylistProps[]>(QUERY_KEYS.playlists);
            // Optimistically remove from playlists list cache
            if (prev) {
                qc.setQueryData<IPlaylistProps[]>(
                    QUERY_KEYS.playlists,
                    prev.filter((p) => p.id !== playlistId),
                );
            }
            return { prev };
        },
        onError: (_err, _id, ctx) => {
            // Revert on error
            if (ctx?.prev) qc.setQueryData(QUERY_KEYS.playlists, ctx.prev);
        },
        onSettled: (_data, _err, playlistId) => {
            // Invalidate lists and the specific playlist
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.playlists, playlistId] });
        },
    });
}

// -------------------------
// MUTATION HOOKS - PLAYLIST TRACKS
// -------------------------

/**
 * Add a track to a playlist
 */
export function useAddTrackToPlaylist() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ playlistId, trackId, userId }: { playlistId: string; trackId: string; userId: string }) => {
            return insertRow("playlist_tracks", {
                playlist_id: playlistId,
                track_id: trackId,
                added_by: userId,
                position: 0, // TODO: Calculate proper position
            });
        },
        onSuccess: async (data, variables) => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.playlists, variables.playlistId] });
            // Persist cover after change
            await syncPlaylistCover(variables.playlistId);
        },
    });
}

/**
 * Remove a track from a playlist
 */
export function useRemoveTrackFromPlaylist() {
    const qc = useQueryClient();
    return useMutation({
        // Return the playlistId of the deleted row so we can sync the cover
        mutationFn: async ({ playlistTrackId }: { playlistTrackId: string }) => {
            const { data, error } = await supabase
                .from("playlist_tracks")
                .delete()
                .eq("id", playlistTrackId)
                .select("playlist_id")
                .single();
            if (error) throw error;
            return data.playlist_id as string;
        },
        onSuccess: async (playlistId) => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.playlists, playlistId] });
            // Persist cover after change
            await syncPlaylistCover(playlistId);
        },
    });
}

// -------------------------
// UTILITY HOOKS
// -------------------------

/**
 * Helper hook to manually invalidate all playlist queries
 */
export function useInvalidatePlaylists() {
    const qc = useQueryClient();
    return () => {
        qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
    };
}

// Helper: resolve playlist cover from stored field or first track album image
function resolvePlaylistCover(pl: IPlaylistProps): string | null {
    // Prefer stored cover in playlists table
    if (pl.cover_image_url) return pl.cover_image_url;

    // Use first track's album image (typed)
    const first = pl.tracks?.[0];
    const imageUrl = first?.track?.album?.images?.[0]?.url;

    return imageUrl ?? null;
}

// Helper: fetch joined playlist, compute cover, and persist to playlists.cover_image_url
async function syncPlaylistCover(playlistId: string) {
    const pl = await fetchPlaylistByIdWithJoins(playlistId); // IPlaylistProps
    const cover = resolvePlaylistCover(pl);
    const values: Partial<IPlaylistProps> = { cover_image_url: cover ?? undefined };
    await updateRow<IPlaylistProps>("playlists", playlistId, values);
}
