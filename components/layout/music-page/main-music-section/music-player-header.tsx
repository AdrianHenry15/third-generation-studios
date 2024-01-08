import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { IoMdPlay } from "react-icons/io";

import SignInBtn from "@/components/sign-in-btn";

const MusicPlayerHeader = () => {
    return (
        <div className="flex flex-col p-2">
            <p className="text-xs">5.5M monthly listeners</p>
            <div className="flex justify-between items-center px-2">
                <div className="flex items-center">
                    <SignInBtn />
                    <BsThreeDots />
                </div>
                <div className="flex items-center">
                    <BiShuffle size={20} />
                    <div className="bg-red-600 p-[12px] rounded-full ml-4">
                        <IoMdPlay size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayerHeader;
