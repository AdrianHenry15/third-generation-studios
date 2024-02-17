"use client";

import React from "react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { BiChevronDown } from "react-icons/bi";

const UserIcon = () => {
    const { user, isSignedIn } = useUser();
    const image = user?.hasImage ? user.imageUrl : "";
    return (
        <div>
            <SignedIn>
                {/* Mount the UserButton component */}
                <div className="flex items-center">
                    {/* USER IMAGE */}
                    {isSignedIn && (
                        <span className="mr-2">
                            <Image className="rounded-full" width={35} height={35} src={image!} alt="user-image" />
                        </span>
                    )}
                    {/* DROPDOWN ARROW */}
                    <span>
                        <BiChevronDown size={15} />
                    </span>
                </div>
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <Link href={"/sign-in"} className="bg-red-700 px-10 py-2 rounded-full text-white shadow-md">
                    <SignInButton />
                </Link>
            </SignedOut>
        </div>
    );
};

export default UserIcon;
