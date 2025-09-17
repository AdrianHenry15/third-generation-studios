"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ITrackProps } from "@/lib/types";

type SupabaseMusicContextValue = {
    data: ITrackProps[] | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
};

const SupabaseMusicContext = createContext<SupabaseMusicContextValue | null>(null);

const queryClient = new QueryClient();

// Simple fetcher - replace path or implementation with direct supabase-js if preferred
async function fetchSupabaseTracks(): Promise<ITrackProps[]> {
    const res = await fetch("/api/supabase/tracks");
    if (!res.ok) {
        throw new Error("Failed to fetch supabase tracks");
    }
    return (await res.json()) as ITrackProps[];
}

function SupabaseMusicInnerProvider({ children }: { children: ReactNode }) {
    const { data, isLoading, isError, refetch } = useQuery<ITrackProps[], Error>({
        queryKey: ["supabaseTracks"],
        queryFn: fetchSupabaseTracks,
        // staleTime and cacheTime can be tuned to your needs
        staleTime: 1000 * 60 * 2, // 2 minutes
    });

    return (
        <SupabaseMusicContext.Provider
            value={{
                data,
                isLoading,
                isError,
                refetch: () => void refetch(),
            }}
        >
            {children}
        </SupabaseMusicContext.Provider>
    );
}

export function SupabaseMusicProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SupabaseMusicInnerProvider>{children}</SupabaseMusicInnerProvider>
        </QueryClientProvider>
    );
}

export function useSupabaseMusic() {
    const ctx = useContext(SupabaseMusicContext);
    if (!ctx) {
        throw new Error("useSupabaseMusic must be used within SupabaseMusicProvider");
    }
    return ctx;
}
