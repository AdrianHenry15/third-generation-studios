"use client";

import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AudioPlayer from "@/components/layout/music/audio-player";

export default function RootLayout({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <SupabaseAuthProvider>
                <Navbar />
                {children}
                <Footer />
                <AudioPlayer />
            </SupabaseAuthProvider>
        </QueryClientProvider>
    );
}
