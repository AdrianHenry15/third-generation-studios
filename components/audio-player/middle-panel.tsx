import React from "react";

import { BiShuffle } from "react-icons/bi";
import { IoPlayCircle } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { LuRepeat2 } from "react-icons/lu";

const MiddlePanel = () => {
    return (
        <div className="flex flex-col">
            {/* PLAYER ACTIONS */}
            <div className="flex items-center">
                {/* SHUFFLE */}
                <BiShuffle size={20} />
                {/* PREVIOUS */}
                <MdSkipPrevious className="mx-4" size={30} />
                {/* PLAY/PAUSE */}
                <IoPlayCircle size={40} />
                {/* NEXT */}
                <MdSkipNext className="mx-4" size={30} />
                {/* REPEAT */}
                <LuRepeat2 size={20} />
            </div>
            {/* DURATION */}
            <div></div>
        </div>
    );
};

export default MiddlePanel;
