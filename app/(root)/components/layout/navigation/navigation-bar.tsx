"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
    {
        name: "Services",
        href: "/services",
    },
    {
        name: "About",
        href: "/about",
    },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-6">
            <nav
                aria-label="Primary navigation"
                className="
                    mx-auto flex h-14 w-full max-w-5xl
                    items-center justify-between
                    rounded-2xl border border-white/10
                    bg-gray-950/80 px-3
                    shadow-lg shadow-black/10
                    backdrop-blur-xl
                    sm:h-16 sm:px-5
                "
            >
                <Link
                    href="/"
                    aria-label="Third Generation Studios home"
                    className="
                        flex shrink-0 items-center gap-2
                        rounded-lg outline-none transition
                        hover:opacity-80
                        focus-visible:ring-2
                        focus-visible:ring-green-500
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-gray-950
                    "
                >
                    <Image src="/logos/tgs-logo.png" alt="" width={40} height={40} priority className="size-9 object-contain sm:size-10" />

                    <span className="hidden text-sm font-semibold text-white lg:block">Third Generation Studios</span>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`
                                    rounded-lg px-2 py-2
                                    text-xs font-medium
                                    outline-none transition
                                    sm:px-3 sm:text-sm
                                    ${isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}
                                    focus-visible:ring-2
                                    focus-visible:ring-green-500
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <Link
                        href="/contact-us"
                        className="
                            ml-1 inline-flex items-center
                            justify-center rounded-xl
                            bg-green-600 px-3 py-2
                            text-xs font-semibold text-white
                            shadow-sm outline-none transition
                            hover:bg-green-500
                            focus-visible:ring-2
                            focus-visible:ring-green-400
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-gray-950
                            sm:ml-2 sm:px-5 sm:text-sm
                        "
                    >
                        <span className="sm:hidden">Contact</span>

                        <span className="hidden sm:inline">Get in touch</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
