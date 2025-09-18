"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // create a single QueryClient instance for this provider
    const queryClientRef = useRef<QueryClient>(null);
    if (!queryClientRef.current) queryClientRef.current = new QueryClient();

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <AuthInner>{children}</AuthInner>
        </QueryClientProvider>
    );
};

// Inner component runs after QueryClientProvider is mounted so hooks are safe to use
const AuthInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Use TanStack Query to fetch and cache the current session
    const sessionQuery = useQuery<Session | null>({
        queryKey: ["supabase-session"],
        queryFn: async () => {
            const { data } = await supabase.auth.getSession();
            return data?.session ?? null;
        },
        staleTime: 1000 * 60, // 1 minute cache by default
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        // subscribe to auth changes and update the query cache
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            // session may be null when signed out
            queryClient.setQueryData(["supabase-session"], session ?? null);
        });

        return () => {
            // unsubscribe listener if present
            (listener as any)?.subscription?.unsubscribe?.();
        };
    }, [queryClient]);

    const signIn = async () => {
        // Example OAuth sign-in; adjust provider as needed
        await supabase.auth.signInWithOAuth({ provider: "github" });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        // optionally clear cached session
        queryClient.setQueryData(["supabase-session"], null);
    };

    const user = sessionQuery.data?.user ?? null;
    const loading = sessionQuery.isLoading;

    return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useSupabaseAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
    return ctx;
};
