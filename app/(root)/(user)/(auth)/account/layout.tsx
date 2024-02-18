import "@/styles/globals.css";

export default async function UserAccountLayout({ children }: { children: React.ReactNode }) {
    return <div className="w-full bg-black h-full flex items-center justify-center">{children}</div>;
}
