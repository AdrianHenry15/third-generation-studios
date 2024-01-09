import Footer from "@/components/layout/footer";
import MobileMusicNavbar from "@/components/layout/music-page/mobile-music/mobile-music-navbar";
import Navbar from "@/components/layout/navbar";

export default async function MusicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-white h-full">
            <Navbar className="hidden md:flex" />
            {children}
            <Footer className="hidden md:flex" />
            <MobileMusicNavbar />
        </div>
    );
}
