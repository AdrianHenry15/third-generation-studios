"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AudioPlayer from "@/components/layout/music/audio-player";
import { useAuthListener } from "@/hooks/use-auth-listener";
import { queryClient } from "@/lib/query-client";

export default function RootLayout({ children }: { children: ReactNode }) {
    // Wire Supabase session → Zustand store
    useAuthListener();

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            {children}
            <Footer />
            <AudioPlayer />
        </QueryClientProvider>
    );
}
