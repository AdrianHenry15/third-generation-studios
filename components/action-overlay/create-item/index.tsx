import React from "react";
import Link from "next/link";

import { Category } from "@/lib/types";

import { LuPlus } from "react-icons/lu";

interface ICreateItemButtonProps {
    category: Category;
    itemId: string;
}

const CreateItemButton = async (props: ICreateItemButtonProps) => {
    // const { isSignedIn } = useAuth();

    const getHref = () => {
        if (props.category === Category.SONG) {
            return "/create/upload/songs";
        } else if (props.category === Category.WEBSITE) {
            return "/create/websites";
        } else if (props.category === Category.ARTIST) {
            return "/create/artists";
        } else {
            return "";
        }
    };
    // if (!isSignedIn) {
    //     return null;
    // } else {
    return (
        <div className="relative w-full h-full">
            <Link
                href={getHref()}
                className="z-20 absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300"
            >
                <LuPlus size={20} />
            </Link>
        </div>
    );
};
// };

export default CreateItemButton;
