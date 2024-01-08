"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SignInBtn = () => {
    const user = useUser();

    return (
        <div className="m-4">
            {!user ? (
                // IF SIGNED IN
                <UserButton afterSignOutUrl="/" />
            ) : (
                // IF SIGNED OUT
                <Link className="px-6 py-2 rounded-full text-xs text-white bg-transparent border-white border-[1px]" href={"/sign-in"}>
                    Sign In
                </Link>
            )}
        </div>
    );
};

export default SignInBtn;
