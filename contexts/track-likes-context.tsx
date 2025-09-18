"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context"; // adjust if your path differs
import { useRouter } from "next/navigation";

type TrackLikesContextType = {
    // toggle like for a track (will redirect to /sign-in if no user)
    toggleLike: (trackId: string) => Promise<void>;
};

const TrackLikesContext = createContext<TrackLikesContextType | undefined>(undefined);

export const TrackLikesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user /*, signIn */ } = useSupabaseAuth();
    const qc = useQueryClient();
    const router = useRouter();

    const toggleLike = async (trackId: string) => {
        if (!trackId) return;

        // Ensure we have an authenticated user; if not, redirect to internal sign-in page
        let activeUser = user;
        if (!activeUser) {
            // Redirect user to the app's sign-in page (avoid external/supabase redirect)
            router.push("/sign-in");
            return;
        }

        const key = ["track-like", trackId, activeUser.id];
        const current = qc.getQueryData<boolean>(key) ?? false;

        // optimistic update
        qc.setQueryData(key, !current);

        try {
            if (current) {
                // remove like
                const { error } = await supabase.from("likes").delete().eq("user_id", activeUser.id).eq("track_id", trackId);
                if (error) throw error;
            } else {
                // add like
                const { error } = await supabase.from("likes").insert({ user_id: activeUser.id, track_id: trackId });
                if (error) throw error;
            }
        } catch (e) {
            // rollback on error
            qc.setQueryData(key, current);
            console.error("toggleLike error:", e);
        }
    };

    return <TrackLikesContext.Provider value={{ toggleLike }}>{children}</TrackLikesContext.Provider>;
};

// Hook to read cached like state and expose toggle. Uses useQuery to fetch initial value.
export const useTrackLike = (trackId: string) => {
    const { user /*, signIn */ } = useSupabaseAuth();
    const qc = useQueryClient();
    const ctx = useContext(TrackLikesContext);
    const router = useRouter();

    const key = ["track-like", trackId, user?.id ?? "anon"];

    const query = useQuery<boolean>({
        queryKey: key,
        queryFn: async () => {
            if (!user) return false;
            const { data, error } = await supabase
                .from("likes")
                .select("id")
                .eq("user_id", user.id)
                .eq("track_id", trackId)
                .limit(1)
                .maybeSingle();
            if (error) throw error;
            return !!data;
        },
        enabled: !!trackId && !!user, // if no user, we simply return false (not liked)
        staleTime: 1000 * 60, // 1 minute
        refetchOnWindowFocus: false,
    });

    const toggle = async () => {
        // prefer context-provided toggle (keeps a single implementation), fallback to inline logic
        if (ctx?.toggleLike) return ctx.toggleLike(trackId);

        let activeUser = user;
        if (!activeUser) {
            // Redirect to internal sign-in page and abort the toggle
            router.push("/sign-in");
            return;
        }

        const localKey = ["track-like", trackId, activeUser.id];
        const current = qc.getQueryData<boolean>(localKey) ?? false;
        qc.setQueryData(localKey, !current);
        try {
            if (current) {
                const { error } = await supabase.from("likes").delete().eq("user_id", activeUser.id).eq("track_id", trackId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("likes").insert({ user_id: activeUser.id, track_id: trackId });
                if (error) throw error;
            }
        } catch (e) {
            qc.setQueryData(localKey, current);
            console.error(e);
        }
    };

    return {
        liked: query.data ?? false,
        isLoading: query.isLoading,
        toggleLike: toggle,
    };
};

export const useTrackLikesContext = () => {
    const ctx = useContext(TrackLikesContext);
    if (!ctx) throw new Error("useTrackLikesContext must be used within TrackLikesProvider");
    return ctx;
};
