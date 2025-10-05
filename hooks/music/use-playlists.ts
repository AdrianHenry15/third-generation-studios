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
        onSuccess: (data, variables) => {
            // Invalidate all playlist-related queries
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
            qc.invalidateQueries({ queryKey: [...QUERY_KEYS.playlists, variables.playlistId] });
        },
    });
}

/**
 * Remove a track from a playlist
 */
export function useRemoveTrackFromPlaylist() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ playlistTrackId }: { playlistTrackId: string }) => {
            return await supabase.from("playlist_tracks").delete().eq("id", playlistTrackId);
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
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
