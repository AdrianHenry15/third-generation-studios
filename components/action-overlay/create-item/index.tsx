import React from "react";
import Link from "next/link";

import { LuPlus } from "react-icons/lu";

interface ICreateItemButtonProps {
    itemId: string;
}

const CreateItemButton = async (props: ICreateItemButtonProps) => {
    return (
        <div className="relative w-full h-full">
            <Link href={""} className="z-20 absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300">
                <LuPlus size={20} />
            </Link>
        </div>
    );
};
// };

export default CreateItemButton;
