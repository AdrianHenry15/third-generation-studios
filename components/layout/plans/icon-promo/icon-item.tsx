import React from "react";

interface IIconItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const IconItem = (props: IIconItemProps) => {
    const { icon, title, description } = props;
    return (
        <div className="border-2 border-zinc-700 p-1 rounded-lg flex m-2">
            <div className="flex flex-col text-white items-start justify-center bg-zinc-900 border-zinc-500 rounded-lg border-[.5px] w-full p-4">
                <span className="flex mb-4">{icon}</span>
                <h5 className="font-semibold text-xl text-white">{title}</h5>
                <p className="text-white max-w-[257px] text-start text-sm mt-2">{description}</p>
            </div>
        </div>
    );
};

export default IconItem;
