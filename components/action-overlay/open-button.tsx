import React from "react";

import { IoOpenOutline } from "react-icons/io5";

interface IOpenButtonProps {
    onClick: () => void;
}

const OpenButton = (props: IOpenButtonProps) => {
    return (
        <p onClick={props.onClick} className="z-20">
            <IoOpenOutline
                size={20}
                className="scale-100 hover:scale-125 transition-transform duration-300 text-white absolute top-3 right-3"
            />
        </p>
    );
};

export default OpenButton;
