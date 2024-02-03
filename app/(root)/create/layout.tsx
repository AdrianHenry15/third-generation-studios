import CreatePage from "@/components/layout/create/create-page";
import CreatePageNav from "@/components/layout/create/create-page-nav";

export default async function CreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-zinc-700 h-screen text-white">
            <CreatePageNav />
            <div className="w-full flex justify-center h-full py-48">
                <CreatePage />
            </div>
        </div>
    );
}
