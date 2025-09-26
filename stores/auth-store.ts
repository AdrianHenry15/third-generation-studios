"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { queryClient } from "@/lib/query-client";

interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    setSession: (session: Session | null) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            session: null,
            loading: true,

            setSession: (session) =>
                set({
                    session,
                    user: session?.user ?? null,
                    loading: false,
                }),

            setLoading: (loading) => set({ loading }),

            signIn: async () => {
                await supabase.auth.signInWithOAuth({ provider: "github" });
            },

            signOut: async () => {
                await supabase.auth.signOut();
                set({ session: null, user: null });
                queryClient.setQueryData(["supabase-session"], null);
                queryClient.removeQueries({ queryKey: ["profiles"] });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                // Only persist non-sensitive data
                user: state.user
                    ? {
                          id: state.user.id,
                          email: state.user.email,
                      }
                    : null,
                // Don't persist session as it contains tokens
                session: null,
            }),
            onRehydrateStorage: () => (state) => {
                // Set loading to true when rehydrating
                if (state) {
                    state.loading = true;
                }
            },
        },
    ),
);
