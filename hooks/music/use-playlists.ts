import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPlaylistsWithJoins, fetchPlaylistByIdWithJoins, fetchPlaylistsByUser } from "@/lib/fetchers/playlist-fetchers";
import { insertRow, updateRow, deleteRow } from "@/lib/fetchers/generic-fetchers";
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/types/supabase-types";
import { supabase } from "@/lib/supabase/client";

// Types
export type Playlist = Tables<"playlists">;
export type PlaylistInsert = TablesInsert<"playlists">;
export type PlaylistUpdate = TablesUpdate<"playlists">;
export type PlaylistTrack = Tables<"playlist_tracks">;
export type PlaylistTrackInsert = TablesInsert<"playlist_tracks">;
export type PlaylistLike = Tables<"playlist_likes">;

// Query Keys
export const playlistKeys = {
    all: ["playlists"] as const,
    lists: () => [...playlistKeys.all, "list"] as const,
    list: (filters: string) => [...playlistKeys.lists(), { filters }] as const,
    details: () => [...playlistKeys.all, "detail"] as const,
    detail: (id: string) => [...playlistKeys.details(), id] as const,
    byUser: (userId: string) => [...playlistKeys.all, "user", userId] as const,
    public: () => [...playlistKeys.all, "public"] as const,
    withTracks: (id: string) => [...playlistKeys.detail(id), "tracks"] as const,
    userLike: (playlistId: string, userId: string) => [...playlistKeys.detail(playlistId), "like", userId] as const,
    tracks: (playlistId: string) => [...playlistKeys.detail(playlistId), "tracks"] as const,
};

// Basic Query Hooks
export function useAllPlaylists() {
    return useQuery({
        queryKey: playlistKeys.lists(),
        queryFn: fetchPlaylistsWithJoins,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function usePlaylist(id: string, enabled = true) {
    return useQuery({
        queryKey: playlistKeys.detail(id),
        queryFn: () => fetchPlaylistByIdWithJoins(id),
        enabled: !!id && enabled,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export function usePlaylistsByUser(userId: string, enabled = true) {
    return useQuery({
        queryKey: playlistKeys.byUser(userId),
        queryFn: () => fetchPlaylistsByUser(userId),
        enabled: !!userId && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

export function usePublicPlaylists() {
    return useQuery({
        queryKey: playlistKeys.public(),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("playlists")
                .select(
                    `
                    *,
                    creator:profiles!playlists_created_by_fkey(*),
                    tracks:playlist_tracks(
                        *,
                        track:tracks(
                            *,
                            artists:artists!tracks_artist_id_fkey(*),
                            album:albums!tracks_album_id_fkey(
                                *,
                                images:album_images(*)
                            ),
                            credits:track_credits(*)
                        )
                    ),
                    likes:playlist_likes(*)
                `,
                )
                .eq("is_public", true)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data || [];
        },
        staleTime: 3 * 60 * 1000, // 3 minutes for public content
    });
}

export function useUserPlaylistLike(playlistId: string, userId: string, enabled = true) {
    return useQuery({
        queryKey: playlistKeys.userLike(playlistId, userId),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("playlist_likes")
                .select("*")
                .eq("playlist_id", playlistId)
                .eq("profile_id", userId)
                .maybeSingle();
            if (error) throw error;
            return data;
        },
        enabled: !!playlistId && !!userId && enabled,
        staleTime: 30 * 1000, // 30 seconds for like status
    });
}

export function usePlaylistTracks(playlistId: string, enabled = true) {
    return useQuery({
        queryKey: playlistKeys.tracks(playlistId),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("playlist_tracks")
                .select(
                    `
                    *,
                    track:tracks(
                        *,
                        artists:artists!tracks_artist_id_fkey(*),
                        album:albums!tracks_album_id_fkey(*)
                    )
                `,
                )
                .eq("playlist_id", playlistId)
                .order("position");
            if (error) throw error;
            return data || [];
        },
        enabled: !!playlistId && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

// Mutation Hooks
export function useCreatePlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playlist: PlaylistInsert) => insertRow("playlists", playlist),
        onSuccess: (newPlaylist) => {
            // Invalidate and refetch playlists lists
            queryClient.invalidateQueries({ queryKey: playlistKeys.lists() });
            queryClient.invalidateQueries({ queryKey: playlistKeys.byUser(newPlaylist.created_by) });
            queryClient.invalidateQueries({ queryKey: playlistKeys.public() });

            // Set the new playlist in cache
            queryClient.setQueryData(playlistKeys.detail(newPlaylist.id), newPlaylist);
        },
    });
}

export function useUpdatePlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: PlaylistUpdate }) => updateRow("playlists", id, updates),
        onSuccess: (updatedPlaylist) => {
            // Update playlist in cache
            queryClient.setQueryData(playlistKeys.detail(updatedPlaylist.id), updatedPlaylist);

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: playlistKeys.byUser(updatedPlaylist.created_by) });
            queryClient.invalidateQueries({ queryKey: playlistKeys.lists() });

            if (updatedPlaylist.is_public) {
                queryClient.invalidateQueries({ queryKey: playlistKeys.public() });
            }
        },
    });
}

export function useDeletePlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteRow("playlists", id),
        onSuccess: (_, deletedId) => {
            // Remove playlist from cache
            queryClient.removeQueries({ queryKey: playlistKeys.detail(deletedId) });

            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: playlistKeys.lists() });
            queryClient.invalidateQueries({ queryKey: playlistKeys.public() });
            queryClient.invalidateQueries({ queryKey: playlistKeys.all });
        },
    });
}

export function useAddTrackToPlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            playlistId,
            trackId,
            position,
            addedBy,
        }: {
            playlistId: string;
            trackId: string;
            position: number;
            addedBy: string;
        }) => {
            return insertRow("playlist_tracks", {
                playlist_id: playlistId,
                track_id: trackId,
                position,
                added_by: addedBy,
            });
        },
        onSuccess: (_, { playlistId }) => {
            // Invalidate playlist queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: playlistKeys.detail(playlistId) });
            queryClient.invalidateQueries({ queryKey: playlistKeys.tracks(playlistId) });
            queryClient.invalidateQueries({ queryKey: playlistKeys.lists() });
        },
    });
}

export function useRemoveTrackFromPlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ playlistTrackId }: { playlistTrackId: string }) => {
            return deleteRow("playlist_tracks", playlistTrackId);
        },
        onSuccess: (_, { playlistTrackId }) => {
            // Invalidate all playlist queries since we don't know which playlist this affects
            queryClient.invalidateQueries({ queryKey: playlistKeys.all });
        },
    });
}

export function useReorderPlaylistTracks() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ updates }: { updates: Array<{ id: string; position: number }> }) => {
            const promises = updates.map(({ id, position }) => updateRow("playlist_tracks", id, { position }));
            return Promise.all(promises);
        },
        onSuccess: (_, { updates }) => {
            // We'd need to know the playlist ID to be more specific
            queryClient.invalidateQueries({ queryKey: playlistKeys.all });
        },
    });
}

export function useLikePlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, userId }: { playlistId: string; userId: string }) =>
            insertRow("playlist_likes", { playlist_id: playlistId, profile_id: userId }),
        onSuccess: (_, { playlistId, userId }) => {
            // Update like status in cache
            queryClient.invalidateQueries({ queryKey: playlistKeys.userLike(playlistId, userId) });
            queryClient.invalidateQueries({ queryKey: playlistKeys.detail(playlistId) });
        },
    });
}

export function useUnlikePlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ playlistId, userId }: { playlistId: string; userId: string }) => {
            const { error } = await supabase.from("playlist_likes").delete().eq("playlist_id", playlistId).eq("profile_id", userId);
            if (error) throw error;
            return true;
        },
        onSuccess: (_, { playlistId, userId }) => {
            // Update like status in cache
            queryClient.invalidateQueries({ queryKey: playlistKeys.userLike(playlistId, userId) });
            queryClient.invalidateQueries({ queryKey: playlistKeys.detail(playlistId) });
        },
    });
}

// Combined hook for like/unlike toggle
export function useTogglePlaylistLike(playlistId: string, userId: string) {
    const { data: userLike } = useUserPlaylistLike(playlistId, userId);
    const likeMutation = useLikePlaylist();
    const unlikeMutation = useUnlikePlaylist();

    const toggleLike = () => {
        if (userLike) {
            unlikeMutation.mutate({ playlistId, userId });
        } else {
            likeMutation.mutate({ playlistId, userId });
        }
    };

    return {
        isLiked: !!userLike,
        toggleLike,
        isLoading: likeMutation.isPending || unlikeMutation.isPending,
    };
}

// Utility hook for creating a playlist with tracks
export function useCreatePlaylistWithTracks() {
    const createPlaylist = useCreatePlaylist();
    const addTrack = useAddTrackToPlaylist();

    return useMutation({
        mutationFn: async ({ playlist, trackIds, userId }: { playlist: PlaylistInsert; trackIds: string[]; userId: string }) => {
            // First create the playlist
            const newPlaylist = await createPlaylist.mutateAsync(playlist);

            // Then add all tracks
            const trackPromises = trackIds.map((trackId, index) =>
                addTrack.mutateAsync({
                    playlistId: newPlaylist.id,
                    trackId,
                    position: index + 1,
                    addedBy: userId,
                }),
            );

            await Promise.all(trackPromises);
            return newPlaylist;
        },
    });
}
