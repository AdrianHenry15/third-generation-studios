"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import Logo from "@/public/logos/glowCircle-trans.png";
import { NavMenuTypeItems } from "@/lib/constants";
import { NavMenuType } from "@/lib/types";
import Button from "@/components/button";
import MobileMenu from "./mobile-menu";
import ReusableModal from "@/components/modals/resuable-modal";

interface INavbarProps {
    className?: string;
}

export default function Navbar(props: INavbarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [merchLink, setMerchLink] = useState<string | null>(null);
    const pathname = usePathname();

    const handleMerchClick = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        event.preventDefault(); // Prevent navigation
        setMerchLink(link);
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        if (merchLink) {
            window.open(merchLink, "_blank");
        }
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Modal */}
            <ReusableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="The Merch Store"
                description="You are about to open the Merch Store in a new tab. Do you wish to proceed?"
                onConfirm={handleModalConfirm}
            />

            {/* Navbar */}
            <nav
                className={`${props.className} text-sm whitespace-nowrap font-semibold flex w-full self-center bg-black sticky top-0 z-[100] py-2`}
            >
                {/* MOBILE CONTAINER */}
                <div className="absolute self-center flex flex-1 left-0 xl:hidden">
                    <MobileMenu />
                </div>

                {/* TITLE & LINKS */}
                <div className="flex w-full my-2 justify-evenly">
                    <div className="flex items-center">
                        <Link href="/websites" className="flex-1 flex lg:mr-10">
                            <Image src={Logo} alt="logo" width={50} />
                        </Link>
                        {/* LINKS */}
                        <ul className="hidden text-white items-center xl:flex">
                            {NavMenuTypeItems.map((item: NavMenuType) => (
                                <li
                                    className={`mx-2 transition-all duration-300 ease-in-out hover:text-zinc-500 hover:underline ${
                                        pathname === item.link ? "underline" : ""
                                    }`}
                                    key={item.title}
                                >
                                    <Link
                                        href={item.link}
                                        onClick={(e) => (item.title.toLowerCase() === "merch" ? handleMerchClick(e, item.link) : undefined)}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* NAV BUTTONS */}
                    <ul className="hidden items-center xl:flex">
                        <Link href="/contact-us">
                            <Button roundedFull name="Contact Us" altColor />
                        </Link>
                        <Link href="/estimate">
                            <Button className="animate-pulse mx-4" roundedFull name="Get Your Free Estimate" />
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    );
}
