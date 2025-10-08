"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { NavMenuType } from "@/lib/types/generic-types";

interface IFAQSidebarNavProps {
    items: NavMenuType[];
}

const FAQSidebarNav = (props: IFAQSidebarNavProps) => {
    const [linkHash, setLinkHash] = useState("#brite");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [navBarHeight, setNavBarHeight] = useState(100);

    useEffect(() => {
        // Get the height of the navigation bar
        const navBar = document.getElementById("#nav-bar");
        if (navBar) {
            setNavBarHeight(navBar.clientHeight);
        }

        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > navBarHeight) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navBarHeight]);

    const handleScrollToSection = (event: React.MouseEvent, link: string) => {
        event.preventDefault();
        setLinkHash(link);
        setDropdownOpen(false);

        const targetElement = document.getElementById(link.substring(1));
        const offsetTop = targetElement?.getBoundingClientRect().top ?? 0;

        window.scrollTo({
            top: window.scrollY + offsetTop - navBarHeight,
            behavior: "smooth",
        });
    };

    const renderMobileDropdown = () => {
        return (
            <nav
                className={`${
                    sticky ? "fixed top-[144px] left-0 w-full bg-white shadow-lg" : ""
                } flex flex-col items-start w-full justify-between border-y border-zinc-200 p-4 z-50 transition-all duration-300 ease-in-out md:hidden`}
            >
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-between w-full py-3 px-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    aria-expanded={dropdownOpen}
                >
                    <h5 className="text-blue-600 font-medium">
                        {props.items.find((item) => item.link === linkHash)?.title || "Select Section"}
                    </h5>
                    <div className="text-blue-600">{dropdownOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}</div>
                </button>

                {dropdownOpen && (
                    <div className="w-full mt-2 bg-white border border-zinc-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
                        {props.items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                onClick={(e) => handleScrollToSection(e, item.link)}
                                className={`block px-4 py-3 text-sm hover:bg-blue-50 transition-colors border-b border-zinc-100 last:border-b-0 ${
                                    linkHash === item.link ? "bg-blue-50 text-blue-700 font-medium" : "text-blue-600"
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        );
    };

    const renderRegularNav = () => {
        return (
            <div className="hidden md:flex md:flex-col text-sm pl-10 sticky top-4">
                {props.items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        onClick={(e) => handleScrollToSection(e, item.link)}
                        className={`pb-6 text-blue-600 hover:text-blue-950 transition-all duration-300 ${
                            linkHash === item.link ? "underline underline-offset-4 text-blue-950 font-medium" : ""
                        }`}
                    >
                        <h5>{item.title}</h5>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="mb-6 w-full md:w-1/3">
            {renderMobileDropdown()}
            {renderRegularNav()}
        </div>
    );
};

export default FAQSidebarNav;
