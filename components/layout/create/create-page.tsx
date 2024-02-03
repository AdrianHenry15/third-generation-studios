"use client";

import Input from "@/components/inputs/input";
import Image from "next/image";
import React from "react";

const CreatePage = () => {
    return (
        <div className="w-[800px] border-[1px] shadow-lg shadow-red-700 border-gray-300">
            {/* COMPONENT NAV */}
            <div className="border-b-[1px] border-white">
                <h2 className="font-semibold text-2xl p-4">Basic Info</h2>
            </div>
            {/* MAIN SECTION */}
            <div className="flex p-8">
                {/* IMAGE */}
                <div className="w-[260px]">
                    <Image src={""} alt="upload-image" className="flex flex-1" />
                </div>
                {/* INFO SECTION */}
                <div>
                    {/* INPUT */}
                    <div>
                        <h5>Title*</h5>
                        <Input onChange={() => {}} />
                    </div>
                    {/* GENRE */}
                    {/* TAGS */}
                    {/* DESCRIPTION */}
                    {/* CAPTION */}
                    {/* PRIVACY */}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
