import React from "react";

interface ILicenseCardProps {
    title: string;
    price: number;
    fileType?: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
}

const LicenseCard = (props: ILicenseCardProps) => {
    return (
        <div
            onClick={props.onClick}
            className={`${
                props.selected ? "border-blue-600 bg-blue-950" : "border-transparent bg-zinc-800"
            } rounded-lg my-4 p-4 cursor-pointer flex flex-col border-[1px] mx-2 w-full md:w-[200px]`}
        >
            <h5 className="text-white">{props.title}</h5>
            <p className="text-white text-sm my-2">${props.price}</p>
            <p className="text-xs">{props.fileType}</p>
            <p className="text-xs">{props.description}</p>
        </div>
    );
};

export default LicenseCard;
