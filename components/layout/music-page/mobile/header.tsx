"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

import Link from "next/link";

const MobileHeader = () => {
    const { user } = useUser();
    return (
        <div className="m-4">
            {user ? (
                // IF SIGNED IN
                <UserButton afterSignOutUrl="/" />
            ) : (
                // IF SIGNED OUT
                <Link className="px-6 py-2 rounded-full bg-red-600" href={"/sign-in"}>
                    Sign In
                </Link>
            )}
        </div>
    );
};

export default MobileHeader;
