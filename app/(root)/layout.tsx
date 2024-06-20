import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <div className="bg-black pb-14">
                <Footer />
            </div>
        </div>
    );
}
