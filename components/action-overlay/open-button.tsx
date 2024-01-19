import React from "react";

import { IoOpen } from "react-icons/io5";

interface IOpenButtonProps {
    onClick: () => void;
}

const OpenButton = (props: IOpenButtonProps) => {
    return (
        <p onClick={props.onClick} className="z-20">
            <IoOpen
                className="scale-100 hover:scale-110 transition-transform duration-300 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                size={50}
            />
        </p>
    );
};

export default OpenButton;
