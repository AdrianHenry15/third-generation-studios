import type { ReactNode } from "react";

export default function DetailPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-5 pb-20 pt-28 text-white">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-5 text-4xl font-bold md:text-6xl"><span className="gradient-text">{title}</span></h1>
                <p className="mb-10 max-w-3xl text-lg text-gray-300">{intro}</p>
                <div className="space-y-6 leading-relaxed text-gray-200 [&_a]:text-green-300 [&_a:hover]:underline">
                    {children}
                </div>
            </div>
        </main>
    );
}
