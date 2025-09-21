import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import type { IProfileProps } from "@/lib/solo-q-types/public-types";

// Fetch the current user's profile and provide an update helper
export function useProfile() {
    const { user } = useSupabaseAuth();
    const queryClient = useQueryClient();

    const profileQuery = useQuery<IProfileProps | null>({
        queryKey: ["user-profile", user?.id],
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            if (!user?.id) return null;

            const response = await fetch("/api/supabase/profile", {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 404) {
                    return null;
                }
                const errorText = await response.text();
                throw new Error(`Failed to fetch profile: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            return data.profile as IProfileProps;
        },
        retry: (failureCount, error: any) => {
            if (error?.message?.includes("404") || error?.message?.includes("401")) return false;
            return failureCount < 2;
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: async (updates: Partial<IProfileProps>) => {
            const response = await fetch("/api/supabase/profile", {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                let msg = "Failed to update profile";
                try {
                    const err = await response.json();
                    msg = err?.error || msg;
                } catch {}
                throw new Error(msg);
            }

            const data = await response.json();
            return data.profile as IProfileProps;
        },
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(["user-profile", user?.id], updatedProfile);
        },
    });

    return {
        profile: profileQuery.data ?? null,
        loading: profileQuery.isLoading,
        error: profileQuery.error as Error | null,
        refetch: profileQuery.refetch,
        updateProfile: (u: Partial<IProfileProps>) => updateProfileMutation.mutateAsync(u),
        updating: updateProfileMutation.isPending,
        updateError: updateProfileMutation.error as Error | null,
    };
}
