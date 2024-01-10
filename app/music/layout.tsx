import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default async function MusicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-white h-full">
            <Navbar className="md:flex" />
            {children}
            <Footer className="hidden md:flex" />
        </div>
    );
}
