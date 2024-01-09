import Link from "next/link";
import React from "react";

import { IoHomeSharp, IoSearchOutline } from "react-icons/io5";
import { BiLibrary } from "react-icons/bi";

const MobileMusicNavbar = () => {
    return (
        <nav className="flex justify-around bg-zinc-800 bottom-0 fixed w-full py-2">
            {/* HOME */}
            <Link className="flex flex-col items-center text-xs" href={"/music"}>
                <IoHomeSharp size={25} />
                <p>Home</p>
            </Link>
            {/* SEARCH */}
            <Link className="flex flex-col items-center text-xs" href={"/music/search"}>
                <IoSearchOutline size={25} />
                <p>Search</p>
            </Link>
            {/* YOUR LIBRARY */}
            <Link className="flex flex-col items-center text-xs" href={"/music/your-library"}>
                <BiLibrary size={25} />
                <p>Library</p>
            </Link>
        </nav>
    );
};

export default MobileMusicNavbar;
