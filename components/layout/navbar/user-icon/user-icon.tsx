"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { BiChevronDown } from "react-icons/bi";
import UserBtn from "./user-btn";

const UserIcon = () => {
    const [userIconModalOpen, setUserIconModalOpen] = useState(false);
    const { user, isSignedIn } = useUser();
    const image = user?.hasImage ? user.imageUrl : "";
    return (
        <div>
            <SignedIn>
                {/* Mount the UserButton component */}
                <div onClick={() => setUserIconModalOpen(true)} className="flex relative items-center cursor-pointer">
                    {/* USER IMAGE */}
                    <UserBtn />
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
