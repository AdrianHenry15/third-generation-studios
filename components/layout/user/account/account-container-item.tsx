import React from "react";

interface IAccountContainerItemProps {
    title: string;
    children: React.ReactNode;
}

const AccountContainerItem = (props: IAccountContainerItemProps) => {
    return (
        <div className="flex flex-col rounded-lg bg-zinc-800 w-[700px] p-4 my-4">
            <h5 className="text-white text-semibold text-xl">{props.title}</h5>
            <div className="flex flex-col">{props.children}</div>
        </div>
    );
};

export default AccountContainerItem;
