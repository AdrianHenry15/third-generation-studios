import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <div className="bg-black pb-14">
                <Footer />
            </div>
        </div>
    );
}
