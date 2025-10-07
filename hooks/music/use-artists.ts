import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchAllArtists,
    fetchArtistById,
    fetchActiveArtists,
    fetchVerifiedArtists,
    fetchArtistByStage,
    fetchArtistWithTracks,
    fetchArtistWithAlbums,
    fetchArtistWithProfile,
    fetchArtistStats,
    searchArtists,
    fetchPopularArtists,
    fetchArtistsByPlatform,
    fetchRecentArtists,
    fetchFeaturedArtists,
    createArtist,
    updateArtist,
    deleteArtist,
    updateArtistSocials,
    toggleArtistVerification,
    deactivateArtist,
    reactivateArtist,
    type ArtistInsert,
    type ArtistUpdate,
} from "@/lib/fetchers/artist-fetchers";

// Query Keys
export const artistKeys = {
    all: ["artists"] as const,
    lists: () => [...artistKeys.all, "list"] as const,
    list: (filters: string) => [...artistKeys.lists(), { filters }] as const,
    details: () => [...artistKeys.all, "detail"] as const,
    detail: (id: string) => [...artistKeys.details(), id] as const,
    active: () => [...artistKeys.all, "active"] as const,
    verified: () => [...artistKeys.all, "verified"] as const,
    popular: () => [...artistKeys.all, "popular"] as const,
    recent: () => [...artistKeys.all, "recent"] as const,
    featured: () => [...artistKeys.all, "featured"] as const,
    withTracks: (id: string) => [...artistKeys.detail(id), "tracks"] as const,
    withAlbums: (id: string) => [...artistKeys.detail(id), "albums"] as const,
    withProfile: (id: string) => [...artistKeys.detail(id), "profile"] as const,
    stats: (id: string) => [...artistKeys.detail(id), "stats"] as const,
    byPlatform: (platform: string) => [...artistKeys.all, "platform", platform] as const,
    search: (query: string) => [...artistKeys.all, "search", query] as const,
    byStage: (stageName: string) => [...artistKeys.all, "stage", stageName] as const,
};

// Basic Query Hooks
export function useAllArtists() {
    return useQuery({
        queryKey: artistKeys.lists(),
        queryFn: fetchAllArtists,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export function useArtist(id: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.detail(id),
        queryFn: () => fetchArtistById(id),
        enabled: !!id && enabled,
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
}

export function useActiveArtists() {
    return useQuery({
        queryKey: artistKeys.active(),
        queryFn: fetchActiveArtists,
        staleTime: 10 * 60 * 1000,
    });
}

export function useVerifiedArtists() {
    return useQuery({
        queryKey: artistKeys.verified(),
        queryFn: fetchVerifiedArtists,
        staleTime: 15 * 60 * 1000,
    });
}

export function useArtistByStage(stageName: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.byStage(stageName),
        queryFn: () => fetchArtistByStage(stageName),
        enabled: !!stageName && enabled,
        staleTime: 15 * 60 * 1000,
    });
}

export function usePopularArtists(limit = 10) {
    return useQuery({
        queryKey: [...artistKeys.popular(), limit],
        queryFn: () => fetchPopularArtists(limit),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
}

export function useRecentArtists(limit = 10) {
    return useQuery({
        queryKey: [...artistKeys.recent(), limit],
        queryFn: () => fetchRecentArtists(limit),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useFeaturedArtists() {
    return useQuery({
        queryKey: artistKeys.featured(),
        queryFn: fetchFeaturedArtists,
        staleTime: 30 * 60 * 1000,
    });
}

// Artist with relationships
export function useArtistWithTracks(id: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.withTracks(id),
        queryFn: () => fetchArtistWithTracks(id),
        enabled: !!id && enabled,
        staleTime: 10 * 60 * 1000,
    });
}

export function useArtistWithAlbums(id: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.withAlbums(id),
        queryFn: () => fetchArtistWithAlbums(id),
        enabled: !!id && enabled,
        staleTime: 10 * 60 * 1000,
    });
}

export function useArtistWithProfile(id: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.withProfile(id),
        queryFn: () => fetchArtistWithProfile(id),
        enabled: !!id && enabled,
        staleTime: 15 * 60 * 1000,
    });
}

export function useArtistStats(id: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.stats(id),
        queryFn: () => fetchArtistStats(id),
        enabled: !!id && enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes for stats
    });
}

export function useArtistsByPlatform(platform: string, enabled = true) {
    return useQuery({
        queryKey: artistKeys.byPlatform(platform),
        queryFn: () => fetchArtistsByPlatform(platform),
        enabled: !!platform && enabled,
        staleTime: 20 * 60 * 1000,
    });
}

export function useSearchArtists(query: string, limit = 20, enabled = true) {
    const trimmedQuery = query.trim();

    return useQuery({
        queryKey: [...artistKeys.search(trimmedQuery), limit],
        queryFn: () => searchArtists(trimmedQuery, limit),
        enabled: !!trimmedQuery && trimmedQuery.length >= 2 && enabled,
        staleTime: 30 * 1000, // 30 seconds for search
    });
}

// Mutation Hooks
export function useCreateArtist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (artist: ArtistInsert) => createArtist(artist),
        onSuccess: (newArtist) => {
            // Set the new artist in cache
            queryClient.setQueryData(artistKeys.detail(newArtist.id), newArtist);

            // Invalidate artist lists
            queryClient.invalidateQueries({ queryKey: artistKeys.lists() });
            queryClient.invalidateQueries({ queryKey: artistKeys.active() });
            queryClient.invalidateQueries({ queryKey: artistKeys.recent() });
        },
    });
}

export function useUpdateArtist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: ArtistUpdate }) => updateArtist(id, updates),
        onSuccess: (updatedArtist) => {
            // Update artist in cache
            queryClient.setQueryData(artistKeys.detail(updatedArtist.id), updatedArtist);

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: artistKeys.withProfile(updatedArtist.id) });
            queryClient.invalidateQueries({ queryKey: artistKeys.lists() });

            // Conditionally invalidate based on updates
            if (updatedArtist.verified) {
                queryClient.invalidateQueries({ queryKey: artistKeys.verified() });
            }
            if (updatedArtist.active) {
                queryClient.invalidateQueries({ queryKey: artistKeys.active() });
            }
        },
    });
}

export function useDeleteArtist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteArtist,
        onSuccess: (_, deletedId) => {
            // Remove artist from cache
            queryClient.removeQueries({ queryKey: artistKeys.detail(deletedId) });

            // Invalidate all lists
            queryClient.invalidateQueries({ queryKey: artistKeys.all });
        },
    });
}

export function useUpdateArtistSocials() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, socials }: { id: string; socials: Parameters<typeof updateArtistSocials>[1] }) =>
            updateArtistSocials(id, socials),
        onSuccess: (updatedArtist) => {
            // Update artist in cache
            queryClient.setQueryData(artistKeys.detail(updatedArtist.id), updatedArtist);

            // Invalidate profile data
            queryClient.invalidateQueries({ queryKey: artistKeys.withProfile(updatedArtist.id) });
        },
    });
}

export function useToggleArtistVerification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleArtistVerification,
        onSuccess: (updatedArtist) => {
            // Update artist in cache
            queryClient.setQueryData(artistKeys.detail(updatedArtist.id), updatedArtist);

            // Invalidate verification-related queries
            queryClient.invalidateQueries({ queryKey: artistKeys.verified() });
            queryClient.invalidateQueries({ queryKey: artistKeys.featured() });
            queryClient.invalidateQueries({ queryKey: artistKeys.lists() });
        },
    });
}

export function useDeactivateArtist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deactivateArtist,
        onSuccess: (updatedArtist) => {
            // Update artist in cache
            queryClient.setQueryData(artistKeys.detail(updatedArtist.id), updatedArtist);

            // Invalidate active artists
            queryClient.invalidateQueries({ queryKey: artistKeys.active() });
            queryClient.invalidateQueries({ queryKey: artistKeys.lists() });
        },
    });
}

export function useReactivateArtist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reactivateArtist,
        onSuccess: (updatedArtist) => {
            // Update artist in cache
            queryClient.setQueryData(artistKeys.detail(updatedArtist.id), updatedArtist);

            // Invalidate active artists
            queryClient.invalidateQueries({ queryKey: artistKeys.active() });
            queryClient.invalidateQueries({ queryKey: artistKeys.lists() });
        },
    });
}

// Utility hooks
export function useArtistManagement(artistId: string) {
    const artist = useArtist(artistId);
    const updateArtist = useUpdateArtist();
    const updateSocials = useUpdateArtistSocials();
    const toggleVerification = useToggleArtistVerification();
    const deactivate = useDeactivateArtist();
    const reactivate = useReactivateArtist();

    return {
        artist: artist.data,
        isLoading: artist.isLoading,
        isError: artist.isError,
        error: artist.error,
        updateArtist: (updates: ArtistUpdate) => updateArtist.mutate({ id: artistId, updates }),
        updateSocials: (socials: Parameters<typeof updateArtistSocials>[1]) => updateSocials.mutate({ id: artistId, socials }),
        toggleVerification: () => toggleVerification.mutate(artistId),
        deactivate: () => deactivate.mutate(artistId),
        reactivate: () => reactivate.mutate(artistId),
        isUpdating:
            updateArtist.isPending ||
            updateSocials.isPending ||
            toggleVerification.isPending ||
            deactivate.isPending ||
            reactivate.isPending,
    };
}

// Combined hook for artist dashboard data
export function useArtistDashboard(artistId: string) {
    const artist = useArtistWithProfile(artistId);
    const stats = useArtistStats(artistId);
    const tracks = useArtistWithTracks(artistId);
    const albums = useArtistWithAlbums(artistId);

    return {
        artist: artist.data,
        stats: stats.data,
        tracks: tracks.data?.tracks || [],
        albums: albums.data?.albums || [],
        isLoading: artist.isLoading || stats.isLoading || tracks.isLoading || albums.isLoading,
        isError: artist.isError || stats.isError || tracks.isError || albums.isError,
        error: artist.error || stats.error || tracks.error || albums.error,
    };
}
