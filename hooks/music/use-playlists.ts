import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queries/query-keys";
import { fetchPlaylistsWithJoins, fetchPlaylistByIdWithJoins, fetchPlaylistsByUser } from "@/lib/fetchers/playlist-fetchers";
import { IPlaylistProps } from "@/lib/types/music-types";
import { insertRow, updateRow } from "@/lib/fetchers/generic-fetchers.ts";

// -------------------------
// QUERIES
// -------------------------

// Fetch all playlists with joins
export function usePlaylistsQuery() {
    return useQuery<IPlaylistProps[]>({
        queryKey: QUERY_KEYS.playlists,
        queryFn: fetchPlaylistsWithJoins,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

// Fetch single playlist by ID
export function usePlaylistByIdQuery(playlistId?: string) {
    return useQuery<IPlaylistProps>({
        queryKey: [...QUERY_KEYS.playlists, playlistId],
        queryFn: () => fetchPlaylistByIdWithJoins(playlistId!),
        enabled: !!playlistId,
        staleTime: 1000 * 60 * 5,
    });
}

// Fetch playlists created by a specific user
export function usePlaylistsByUserQuery(userId?: string) {
    return useQuery<IPlaylistProps[]>({
        queryKey: [...QUERY_KEYS.playlists, "user", userId],
        queryFn: () => fetchPlaylistsByUser(userId!),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
}

// -------------------------
// MUTATIONS
// -------------------------

// Insert a new playlist
export function usePlaylistInsert() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (values: Partial<IPlaylistProps>) => insertRow<IPlaylistProps>("playlists", values),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
        },
    });
}

// Update an existing playlist
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
// Helper: invalidate playlists queries
// -------------------------
export function useInvalidatePlaylists() {
    const qc = useQueryClient();
    return () => {
        qc.invalidateQueries({ queryKey: QUERY_KEYS.playlists });
    };
}
