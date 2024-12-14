"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import useCartStore from "@/stores/cart-store";
import Logo from "@/public/logos/glowCircle-trans.png";
import { usePathname } from "next/navigation";
import { NavMenuItems } from "@/lib/constants/constants";
import { BiCart } from "react-icons/bi";
import { PiPackage } from "react-icons/pi";

const Header = () => {
    const { user } = useUser();
    const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
    const pathname = usePathname();

    // console.log(user);

    return (
        <header className="flex flex-wrap sticky top-0 z-[100] justify-between items-center px-4 py-2 bg-black shadow-md">
            {/* Top row */}
            <div className="flex w-full flex-wrap justify-between items-center">
                <Link href="/" className="text-2xl font-bold hover:opacity-50 cursor-pointer mx-auto lg:mx-0">
                    <Image src={Logo} alt="tgs-logo" className="w-24" />
                </Link>

                {/* Navigation Links */}
                <div className="w-full flex justify-center sm-w-auto lg:flex-1 lg:mx-4 mt-2 lg:justify-start lg:mt-0">
                    {NavMenuItems.map((item, index) => {
                        return (
                            <Link
                                className={`${
                                    pathname === item.link ? "underline" : ""
                                } px-2 text-sm text-white hover:text-white/50 ease-in-out duration-200 transition-colors lg:text-md`}
                                key={index}
                                href={item.link}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </div>

                {/* Next 15 gives you auto query = http://localhost:3000/search?query=page as part of the Form component */}
                <form
                    className="w-full sm-w-auto lg:flex-1 lg:mx-4 mt-2 lg:mt-0"
                    // need this to hit page route
                    action={"/store/search"}
                >
                    <input
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 border w-full max-w-4xl"
                        type="text"
                        // need this for query params
                        name="query"
                        placeholder="Search for products"
                    />
                </form>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0 flex-1 lg:flex-none">
                    <Link
                        className="flex flex-1 relative justify-center border-2 lg:justify-start lg:flex-none items-center space-x-2 bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded"
                        href={"/cart"}
                    >
                        <BiCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 justify-center flex items-center">
                            <p className="text-white text-xs text-center flex justify-center items-center mb-[1px]">{itemCount}</p>
                        </span>
                        <span>My Cart</span>
                    </Link>

                    {/* User area */}
                    <ClerkLoaded>
                        {user && (
                            <Link
                                href={"/store/orders"}
                                className="flex-1 relative flex justify-center lg:justify-start border-2 lg:flex-none items-center space-x-2 bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded"
                            >
                                <PiPackage className="w-6 h-6" />
                                <span>My Orders</span>
                            </Link>
                        )}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <UserButton afterSwitchSessionUrl="/store/products" />
                                <div className="hidden lg:block text-xs">
                                    <p className="text-gray-400">Welcome Back</p>
                                    <p className="font-bold">{user.fullName}!</p>
                                </div>
                            </div>
                        ) : (
                            <SignInButton forceRedirectUrl="/store/products" mode="modal">
                                <button className="text-white">Sign In</button>
                            </SignInButton>
                        )}
                    </ClerkLoaded>
                </div>
            </div>
        </header>
    );
};

export default Header;
