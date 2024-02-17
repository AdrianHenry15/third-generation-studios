"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { IoMdPricetags } from "react-icons/io";

import PopoverPanelItem from "./popover-panel-item";
import UserIcon from "./user-icon";

const NewMobileMenu = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const closeMobileMenu = () => setOpen(false);

    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);
    return (
        <div className="top-16 w-full max-w-sm px-4">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`
                    ${open ? "text-white" : "text-white/90"}
                    group inline-flex items-center px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        >
                            <Bars3Icon className="h-6 text-white" />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-1 w-screen max-w-sm -translate-x-[350px] transform ml-7">
                                <div className="flex flex-col relative bg-white">
                                    <div className="flex justify-end m-4">
                                        <UserIcon />
                                    </div>
                                    <PopoverPanelItem
                                        icon={<BsMusicNoteBeamed size={25} />}
                                        page={{
                                            title: "Music",
                                            link: "/music",
                                        }}
                                        description={"Music by Artists"}
                                    />
                                    <PopoverPanelItem
                                        icon={<CgWebsite size={25} />}
                                        page={{
                                            title: "Websites",
                                            link: "/websites",
                                        }}
                                        description={"Websites By Devs"}
                                    />
                                    <PopoverPanelItem
                                        icon={<IoMdPricetags size={25} />}
                                        page={{
                                            title: "Pricing",
                                            link: "/pricing",
                                        }}
                                        description={"Prices For Music & Websites"}
                                    />
                                    {/* POPOVER FOOTER */}
                                    <div className="px-4 py-6 mt-4 bg-gray-100 flex justify-evenly">
                                        {/* CONTACT US BUTTON */}
                                        <Link
                                            className="bg-red-600/90 px-10 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
                                            href={"/contact-us"}
                                        >
                                            <h5 className="hover:text-white transition-colors duration-300 ease-in-out">Contact Us</h5>
                                        </Link>
                                        {/* ESTIMATE BUTTON */}
                                        <Link
                                            className="bg-red-600/90 px-10 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
                                            href={"/estimate"}
                                        >
                                            <h5 className="hover:text-white transition-colors duration-300 ease-in-out">Estimate</h5>
                                        </Link>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default NewMobileMenu;
