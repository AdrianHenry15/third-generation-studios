"use client";

import { clerkClient, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { BiChevronLeft } from "react-icons/bi";

const EditProfile = () => {
    const { control } = useForm();
    const { user } = useUser();

    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {};
    return (
        <div className="flex flex-col w-11/12 h-full md:w-10/12">
            {/* BACK BUTTON */}
            <Link href={"/account"} className="p-2 w-min bg-zinc-700 rounded-full hover:scale-105 transition-all duration-300 ease-in-out">
                <BiChevronLeft className="text-white" size={30} />
            </Link>
            {/* TITLE */}
            <h5 className="text-5xl font-bold my-4 text-white">Edit Profile</h5>
            {/* FIRST NAME */}
            {/* <div>
                <h5 className="text-white font-semibold">First Name</h5>
                <input
                    className="w-full"
                    value={user?.firstName || ""}
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => handleFirstName(e)}
                />
            </div> */}
            {/* LAST NAME */}
            {/* EMAIL */}
            {/* PHONE NUMBER */}
        </div>
    );
};

export default EditProfile;
