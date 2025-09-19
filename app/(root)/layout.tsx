import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import AudioPlayer from "@/components/layout/music/audio-player";
import { AppProviders } from "@/contexts/app-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProviders>
            <Navbar />
            {children}
            <Footer />
            <AudioPlayer />
        </AppProviders>
    );
}
