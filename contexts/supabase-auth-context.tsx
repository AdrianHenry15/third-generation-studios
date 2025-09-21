"use client";

import React, { createContext, useContext, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Get initial session
    const sessionQuery = useQuery({
        queryKey: ["supabase-session"],
        queryFn: async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return data?.session ?? null;
        },
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    const user = sessionQuery.data?.user ?? null;

    // Subscribe to auth changes
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
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

    return (
        <AuthContext.Provider
            value={{
                user,
                loading: sessionQuery.isLoading,
                signIn,
                signOut,
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
