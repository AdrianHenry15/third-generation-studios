import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { IoMdPlay } from "react-icons/io";

import SignInBtn from "@/components/sign-in-btn";

const MobileMusicPlayerHeader = () => {
    return (
        <div className="flex flex-col p-4">
            <p className="text-xs">5.5M monthly listeners</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <SignInBtn />
                    <BsThreeDots size={20} />
                </div>
                <div className="flex items-center">
                    <BiShuffle size={20} />
                    <div className="bg-red-600 p-[12px] rounded-full ml-6">
                        <IoMdPlay size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMusicPlayerHeader;
