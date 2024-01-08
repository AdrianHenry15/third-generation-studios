import Footer from "@/components/layout/footer";
import MobileHeader from "@/components/layout/music-page/mobile/header";
import MobileNavbar from "@/components/layout/music-page/mobile/navbar";
import Navbar from "@/components/layout/navbar";

export default async function MusicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-white h-full">
            <Navbar className="hidden md:flex" />
            {children}
            <Footer className="hidden md:flex" />
            <MobileNavbar />
        </div>
    );
}
