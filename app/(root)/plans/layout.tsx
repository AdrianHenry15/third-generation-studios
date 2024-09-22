export default async function PlansLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full">
            {/* Splash */}
            {children}
            {/* Available Plans */}
            {/* Compare Features */}
        </div>
    );
}
