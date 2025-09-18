import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import AudioPlayer from "@/components/layout/music/audio-player";
import { SupabaseMusicProvider } from "@/contexts/supabase-music-context";
import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseAuthProvider>
            <SupabaseMusicProvider>
                <Navbar />
                {children}
                <Footer />
                <AudioPlayer />
            </SupabaseMusicProvider>
        </SupabaseAuthProvider>
    );
}
