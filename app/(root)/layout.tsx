"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import Footer from "@/app/(root)/components/layout/footer";
import { useAuthListener } from "@/hooks/use-auth-listener";
import { queryClient } from "@/lib/query-client";
import ModalRoot from "./components/layout/modals";
import Navbar from "./components/layout/navigation/navigation-bar";
import AudioPlayer from "./components/layout/audio-player/audio-player";

export default function RootLayout({ children }: { children: ReactNode }) {
    // Wire Supabase session → Zustand store
    useAuthListener();

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            {children}
            <ModalRoot />
            <Footer />
            <AudioPlayer />
        </QueryClientProvider>
    );
}
