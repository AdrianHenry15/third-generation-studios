export default async function UserLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col w-full h-screen justify-center items-center">{children}</div>;
}
