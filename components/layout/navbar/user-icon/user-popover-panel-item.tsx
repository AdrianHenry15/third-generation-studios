import { NavMenuType } from "@/lib/types";
import Link from "next/link";
import React from "react";

interface IUserPopoverPanelItemProps {
    onClick: () => void;
    page: NavMenuType;
    icon: React.ReactNode;
}

const UserPopoverPanelItem = (props: IUserPopoverPanelItemProps) => {
    return (
        <Link
            onClick={props.onClick}
            href={props.page.link}
            className="p-2 mx-4 hover:bg-gray-200 rounded-lg transition-colors duration-300 ease-in-out"
        >
            <div className="flex items-center justify-start">
                {/* ICON */}
                <span className="mr-4">{props.icon}</span>
                <div className="flex flex-col">
                    <p>{props.page.title}</p>
                </div>
            </div>
        </Link>
    );
};

export default UserPopoverPanelItem;
