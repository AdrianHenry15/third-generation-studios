"use client";

import { CreatePageNavMenu } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CreatePageNav = () => {
    const pathname = usePathname();
    return (
        <nav className="border-b-[1px] px-2 flex items-center border-black text-sm shadow-lg">
            {CreatePageNavMenu.map((item) => {
                const RouterClass = pathname === item.link ? `border-red-700 text-red-700` : "border-transparent";
                return (
                    <Link className={`${RouterClass} mx-2 py-2 border-b-2 font-semibold`} key={item.link} href={item.link}>
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
};

export default CreatePageNav;
