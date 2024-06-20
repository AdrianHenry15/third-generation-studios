import Link from "next/link";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

interface IAccountItemProps {
    icon: React.ReactNode;
    itemTitle: string;
    link: string;
}

const AccountItem = (props: IAccountItemProps) => {
    return (
        <Link
            href={`/account/${props.link}`}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-zinc-900 transition-colors ease-in-out duration-300 cursor-pointer"
        >
            <div className="flex items-center">
                <span className="p-2 rounded-lg bg-zinc-700 mr-4">{props.icon}</span>
                <p className="text-white">{props.itemTitle}</p>
            </div>
            <span className="">
                <BiChevronRight className="text-zinc-500" size={35} />
            </span>
        </Link>
    );
};

export default AccountItem;
