"use client";

import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

import UserBtn from "./user-btn";

const UserIcon = () => {
    return (
        <div>
            <SignedIn>
                {/* Mount the UserButton component */}
                <div className="flex relative items-center cursor-pointer">
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
