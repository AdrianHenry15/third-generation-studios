"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IProfileProps } from "@/lib/solo-q-types/public-types";

type AuthContextType = {
    user: User | null;
    profile: IProfileProps | null;
    loading: boolean;
    profileLoading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<IProfileProps>) => Promise<void>;
    refetchProfile: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClientRef = useRef<QueryClient>(null);
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60 * 5, // 5 minutes
                    refetchOnWindowFocus: false,
                    retry: 1,
                },
            },
        });
    }

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <AuthInner>{children}</AuthInner>
        </QueryClientProvider>
    );
};

const AuthInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Fetch session with better error handling
    const sessionQuery = useQuery<Session | null>({
        queryKey: ["supabase-session"],
        queryFn: async () => {
            console.log("Fetching session...");
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Session error:", error);
                throw error;
            }

            console.log("Session data:", data?.session?.user?.id);
            return data?.session ?? null;
        },
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    const user = sessionQuery.data?.user ?? null;

    // Fetch profile via API with better logging
    const profileQuery = useQuery<IProfileProps | null>({
        queryKey: ["user-profile", user?.id],
        queryFn: async () => {
            if (!user?.id) {
                console.log("No user ID, skipping profile fetch");
                return null;
            }

            console.log("Fetching profile for user:", user.id);

            try {
                const response = await fetch("/api/supabase/profile", {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Profile API response status:", response.status);

                if (!response.ok) {
                    if (response.status === 401) {
                        console.log("Unauthorized - user not authenticated");
                        return null;
                    }

                    if (response.status === 404) {
                        console.log("Profile not found - may need to be created");
                        return null;
                    }

                    const errorText = await response.text();
                    console.error("Profile API error:", response.status, errorText);
                    throw new Error(`Failed to fetch profile: ${response.status}`);
                }

                const data = await response.json();
                console.log("Profile data received:", data.profile);
                return data.profile;
            } catch (fetchError) {
                console.error("Profile fetch network error:", fetchError);
                throw fetchError;
            }
        },
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error) => {
            console.log("Profile query retry:", failureCount, error);
            // Don't retry on 404 or 401 errors
            if (error?.message?.includes("404") || error?.message?.includes("401")) {
                return false;
            }
            return failureCount < 2;
        },
    });

    // Update profile via API
    const updateProfileMutation = useMutation({
        mutationFn: async (updates: Partial<IProfileProps>) => {
            const response = await fetch("/api/supabase/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to update profile");
            }

            const data = await response.json();
            return data.profile;
        },
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(["user-profile", user?.id], updatedProfile);
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
        },
    });

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth state change:", event, session?.user?.id);
            queryClient.setQueryData(["supabase-session"], session ?? null);

            if (!session) {
                queryClient.removeQueries({ queryKey: ["user-profile"] });
            }
        });

        return () => {
            (listener as any)?.subscription?.unsubscribe?.();
        };
    }, [queryClient]);

    const signIn = async () => {
        await supabase.auth.signInWithOAuth({ provider: "github" });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        queryClient.setQueryData(["supabase-session"], null);
        queryClient.removeQueries({ queryKey: ["user-profile"] });
    };

    const updateProfile = async (updates: Partial<IProfileProps>) => {
        return updateProfileMutation.mutateAsync(updates);
    };

    const refetchProfile = () => {
        profileQuery.refetch();
    };

    console.log("Auth Context State:", {
        user: !!user,
        userId: user?.id,
        profile: !!profileQuery.data,
        loading: sessionQuery.isLoading,
        profileLoading: profileQuery.isLoading,
        sessionError: sessionQuery.error,
        profileError: profileQuery.error,
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                profile: profileQuery.data ?? null,
                loading: sessionQuery.isLoading,
                profileLoading: profileQuery.isLoading,
                signIn,
                signOut,
                updateProfile,
                refetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useSupabaseAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
    return ctx;
};
