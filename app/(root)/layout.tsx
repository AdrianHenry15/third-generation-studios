import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AudioPlayerProvider } from "@/contexts/audio-player-context";
import AudioPlayer from "@/components/layout/music/audio-player";
import { SupabaseMusicProvider } from "@/contexts/supabase-music-context";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseMusicProvider>
            <AudioPlayerProvider>
                <Navbar />
                {children}
                <Footer />
                <AudioPlayer />
            </AudioPlayerProvider>
        </SupabaseMusicProvider>
    );
}
