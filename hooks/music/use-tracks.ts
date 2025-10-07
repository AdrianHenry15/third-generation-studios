import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchAllTracks,
    fetchTrackById,
    fetchTracksByArtist,
    fetchTracksByAlbum,
    fetchPublicTracks,
    fetchTrackWithRelations,
    createTrack,
    updateTrack,
    deleteTrack,
    incrementTrackPlays,
    likeTrack,
    unlikeTrack,
    fetchUserTrackLike,
    type Track,
    type TrackInsert,
    type TrackUpdate,
} from "@/lib/fetchers/track-fetchers";

// Query Keys
export const trackKeys = {
    all: ["tracks"] as const,
    lists: () => [...trackKeys.all, "list"] as const,
    list: (filters: string) => [...trackKeys.lists(), { filters }] as const,
    details: () => [...trackKeys.all, "detail"] as const,
    detail: (id: string) => [...trackKeys.details(), id] as const,
    byArtist: (artistId: string) => [...trackKeys.all, "artist", artistId] as const,
    byAlbum: (albumId: string) => [...trackKeys.all, "album", albumId] as const,
    public: () => [...trackKeys.all, "public"] as const,
    withRelations: (id: string) => [...trackKeys.detail(id), "relations"] as const,
    userLike: (trackId: string, userId: string) => [...trackKeys.detail(trackId), "like", userId] as const,
};

// Basic Query Hooks
export function useAllTracks() {
    return useQuery({
        queryKey: trackKeys.lists(),
        queryFn: fetchAllTracks,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useTrack(id: string, enabled = true) {
    return useQuery({
        queryKey: trackKeys.detail(id),
        queryFn: () => fetchTrackById(id),
        enabled: !!id && enabled,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export function useTracksByArtist(artistId: string, enabled = true) {
    return useQuery({
        queryKey: trackKeys.byArtist(artistId),
        queryFn: () => fetchTracksByArtist(artistId),
        enabled: !!artistId && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

export function useTracksByAlbum(albumId: string, enabled = true) {
    return useQuery({
        queryKey: trackKeys.byAlbum(albumId),
        queryFn: () => fetchTracksByAlbum(albumId),
        enabled: !!albumId && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

export function usePublicTracks() {
    return useQuery({
        queryKey: trackKeys.public(),
        queryFn: fetchPublicTracks,
        staleTime: 3 * 60 * 1000, // 3 minutes for public content
    });
}

export function useTrackWithRelations(id: string, enabled = true) {
    return useQuery({
        queryKey: trackKeys.withRelations(id),
        queryFn: () => fetchTrackWithRelations(id),
        enabled: !!id && enabled,
        staleTime: 10 * 60 * 1000,
    });
}

export function useUserTrackLike(trackId: string, userId: string, enabled = true) {
    return useQuery({
        queryKey: trackKeys.userLike(trackId, userId),
        queryFn: () => fetchUserTrackLike(trackId, userId),
        enabled: !!trackId && !!userId && enabled,
        staleTime: 30 * 1000, // 30 seconds for like status
    });
}

// Mutation Hooks
export function useCreateTrack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (track: TrackInsert) => createTrack(track),
        onSuccess: (newTrack) => {
            // Invalidate and refetch tracks lists
            queryClient.invalidateQueries({ queryKey: trackKeys.lists() });
            queryClient.invalidateQueries({ queryKey: trackKeys.public() });
            queryClient.invalidateQueries({ queryKey: trackKeys.byArtist(newTrack.artist_id) });
            queryClient.invalidateQueries({ queryKey: trackKeys.byAlbum(newTrack.album_id) });

            // Set the new track in cache
            queryClient.setQueryData(trackKeys.detail(newTrack.id), newTrack);
        },
    });
}

export function useUpdateTrack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: TrackUpdate }) => updateTrack(id, updates),
        onSuccess: (updatedTrack) => {
            // Update track in cache
            queryClient.setQueryData(trackKeys.detail(updatedTrack.id), updatedTrack);

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: trackKeys.byArtist(updatedTrack.artist_id) });
            queryClient.invalidateQueries({ queryKey: trackKeys.byAlbum(updatedTrack.album_id) });
            queryClient.invalidateQueries({ queryKey: trackKeys.withRelations(updatedTrack.id) });
        },
    });
}

export function useDeleteTrack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTrack,
        onSuccess: (_, deletedId) => {
            // Remove track from cache
            queryClient.removeQueries({ queryKey: trackKeys.detail(deletedId) });

            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: trackKeys.lists() });
            queryClient.invalidateQueries({ queryKey: trackKeys.public() });
            queryClient.invalidateQueries({ queryKey: trackKeys.all });
        },
    });
}

export function useIncrementTrackPlays() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: incrementTrackPlays,
        onSuccess: (_, trackId) => {
            // Optimistically update play count
            queryClient.setQueryData(trackKeys.detail(trackId), (old: Track | undefined) => {
                if (old) {
                    return { ...old, plays: old.plays + 1 };
                }
                return old;
            });
        },
    });
}

export function useLikeTrack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ trackId, userId }: { trackId: string; userId: string }) => likeTrack(trackId, userId),
        onSuccess: (_, { trackId, userId }) => {
            // Update like status in cache
            queryClient.invalidateQueries({ queryKey: trackKeys.userLike(trackId, userId) });
        },
    });
}

export function useUnlikeTrack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ trackId, userId }: { trackId: string; userId: string }) => unlikeTrack(trackId, userId),
        onSuccess: (_, { trackId, userId }) => {
            // Update like status in cache
            queryClient.invalidateQueries({ queryKey: trackKeys.userLike(trackId, userId) });
        },
    });
}

// Combined hook for like/unlike toggle
export function useToggleTrackLike(trackId: string, userId: string) {
    const { data: userLike } = useUserTrackLike(trackId, userId);
    const likeMutation = useLikeTrack();
    const unlikeMutation = useUnlikeTrack();

    const toggleLike = () => {
        if (userLike) {
            unlikeMutation.mutate({ trackId, userId });
        } else {
            likeMutation.mutate({ trackId, userId });
        }
    };

    return {
        isLiked: !!userLike,
        toggleLike,
        isLoading: likeMutation.isPending || unlikeMutation.isPending,
    };
}
