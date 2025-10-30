import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTable, fetchRowById, insertRow, updateRow, deleteRow } from "@/lib/fetchers/generic-fetchers";
import { supabase } from "@/lib/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/types/supabase-types";

// Types
export type Profile = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;

// Query Keys
export const profileKeys = {
    all: ["profiles"] as const,
    lists: () => [...profileKeys.all, "list"] as const,
    list: (filters: string) => [...profileKeys.lists(), { filters }] as const,
    details: () => [...profileKeys.all, "detail"] as const,
    detail: (id: string) => [...profileKeys.details(), id] as const,
    byRole: (role: Profile["role"]) => [...profileKeys.all, "role", role] as const,
    withArtist: (id: string) => [...profileKeys.detail(id), "artist"] as const,
    search: (query: string) => [...profileKeys.all, "search", query] as const,
};

// Basic Query Hooks
export function useAllProfiles() {
    return useQuery({
        queryKey: profileKeys.lists(),
        queryFn: () => fetchTable("profiles"),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export function useProfile(id: string, enabled = true) {
    return useQuery({
        queryKey: profileKeys.detail(id),
        queryFn: () => fetchRowById("profiles", id),
        enabled: !!id && enabled,
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
}

export function useProfilesByRole(role: Profile["role"]) {
    return useQuery({
        queryKey: profileKeys.byRole(role),
        queryFn: async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("role", role).order("created_at", { ascending: false });
            if (error) throw error;
            return data || [];
        },
        staleTime: 10 * 60 * 1000,
    });
}

export function useProfileWithArtist(id: string, enabled = true) {
    return useQuery({
        queryKey: profileKeys.withArtist(id),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select(
                    `
                    *,
                    artists(*)
                `,
                )
                .eq("id", id)
                .single();
            if (error) throw error;
            return data;
        },
        enabled: !!id && enabled,
        staleTime: 15 * 60 * 1000,
    });
}

export function useSearchProfiles(query: string, enabled = true) {
    const trimmedQuery = query.trim();

    return useQuery({
        queryKey: profileKeys.search(trimmedQuery),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .ilike("username", `%${trimmedQuery}%`)
                .order("created_at", { ascending: false })
                .limit(20);
            if (error) throw error;
            return data || [];
        },
        enabled: !!trimmedQuery && trimmedQuery.length >= 2 && enabled,
        staleTime: 30 * 1000, // 30 seconds for search
    });
}

// Mutation Hooks
export function useCreateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (profile: ProfileInsert) => insertRow("profiles", profile),
        onSuccess: (newProfile) => {
            // Set the new profile in cache
            queryClient.setQueryData(profileKeys.detail(newProfile.id), newProfile);

            // Invalidate profile lists
            queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
            queryClient.invalidateQueries({ queryKey: profileKeys.byRole(newProfile.role) });
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: ProfileUpdate }) => updateRow("profiles", id, updates),
        onSuccess: (updatedProfile) => {
            // Update profile in cache
            queryClient.setQueryData(profileKeys.detail(updatedProfile.id), updatedProfile);

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
            queryClient.invalidateQueries({ queryKey: profileKeys.byRole(updatedProfile.role) });
            queryClient.invalidateQueries({ queryKey: profileKeys.withArtist(updatedProfile.id) });
        },
    });
}

export function useDeleteProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteRow("profiles", id),
        onSuccess: (_, deletedId) => {
            // Remove profile from cache
            queryClient.removeQueries({ queryKey: profileKeys.detail(deletedId) });

            // Invalidate all lists
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
    });
}

// Utility Hooks
export function useCurrentUserProfile(userId?: string) {
    return useProfile(userId || "", !!userId);
}

export function useProfileManagement(profileId: string) {
    const profile = useProfile(profileId);
    const updateProfile = useUpdateProfile();
    const deleteProfile = useDeleteProfile();

    return {
        profile: profile.data,
        isLoading: profile.isLoading,
        isError: profile.isError,
        error: profile.error,
        updateProfile: (updates: ProfileUpdate) => updateProfile.mutate({ id: profileId, updates }),
        deleteProfile: () => deleteProfile.mutate(profileId),
        isUpdating: updateProfile.isPending || deleteProfile.isPending,
    };
}

// Artist Profile Hook
export function useArtistProfiles() {
    return useProfilesByRole("artist");
}

// Admin Profile Hook
export function useAdminProfiles() {
    return useProfilesByRole("admin");
}

// Listener Profile Hook
export function useListenerProfiles() {
    return useProfilesByRole("listener");
}

// Legacy compatibility hooks (keeping original names but with updated functionality)
export function useProfilesQuery() {
    return useAllProfiles();
}

export function useProfileByIdQuery(id: string) {
    return useProfile(id);
}

export function useProfileInsert() {
    return useCreateProfile();
}

export function useProfileUpdate() {
    const mutation = useUpdateProfile();

    return {
        ...mutation,
        mutate: ({ id, values }: { id: string; values: ProfileUpdate }) => mutation.mutate({ id, updates: values }),
        mutateAsync: ({ id, values }: { id: string; values: ProfileUpdate }) => mutation.mutateAsync({ id, updates: values }),
    };
}

export function useProfileDelete() {
    return useDeleteProfile();
}
