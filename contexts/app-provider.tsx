"use client";

import { ReactNode, useState } from "react";
import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";
import { SupabaseMusicProvider } from "@/contexts/supabase-music-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AppProviders({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <SupabaseAuthProvider>
                <SupabaseMusicProvider>{children}</SupabaseMusicProvider>
            </SupabaseAuthProvider>
        </QueryClientProvider>
    );
}
