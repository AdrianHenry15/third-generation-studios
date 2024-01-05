"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import Logo from "@/public/3rdgen-logo-red.png";

import MobileHeader from "@/components/layout/navbar/mobile-menu";
import { NavMenuItems } from "@/lib/constants";
import { NavMenu } from "@/lib/types";
import Button from "@/components/button";

const UserIcon = dynamic(() => import("@/components/layout/navbar/user-icon"), { ssr: false });

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={`text-sm whitespace-nowrap font-semibold flex w-full self-center bg-transparent absolute top-0 z-50 h-[50px]`}>
            {/* MOBILE CONTAINER */}
            <div className="absolute self-center right-0 lg:hidden">
                <MobileHeader />
            </div>
            {/* TITLE & LINKS  */}
            <div className="flex w-full my-2 justify-evenly">
                <div className="flex items-center">
                    <Link href="/" className="lg:mr-10">
                        {/* TODO: LOGO */}
                        <Image className="" src={Logo} alt="logo" width={100} />
                    </Link>
                    {/* LINKS  */}
                    <ul className="hidden text-white items-center lg:flex">
                        {NavMenuItems.map((item: NavMenu) => (
                            <li
                                className={`mx-2 transition-all duration-300 ease-in-out hover:text-red-700 hover:underline ${
                                    pathname === item.link ? "underline" : ""
                                }`}
                                key={item.title}
                            >
                                <Link href={item.link} className="">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* NAV BUTTONS */}
                <ul className="hidden items-center lg:flex">
                    <Link className="mr-4" href={"/contact-us"}>
                        <Button roundedFull name="Contact Us" altColor />
                    </Link>
                    <Link href={"/estimate"}>
                        <Button className="animate-pulse" roundedFull name="Get Your Free Estimate" />
                    </Link>
                </ul>
                {/* USER ICON */}
                <div className="hidden lg:flex lg:items-center">
                    <UserIcon />
                </div>
            </div>
        </nav>
    );
}
