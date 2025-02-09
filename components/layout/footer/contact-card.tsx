import Link from "next/link";
import React from "react";

const ContactCard = () => {
    return (
        <div className="flex flex-1 flex-col justify-start items-start w-full py-10 md:py-0 md:text-left">
            <div className="flex flex-col text-xs w-full flex-1">
                <Link href={"/contact-us"} className="font-light tracking-wider text-2xl pb-4">
                    Contact Us
                </Link>
                <div className="w-full">
                    <div className="flex flex-col text-gray-400">
                        <span className="pb-4">
                            <label>Email: </label>
                            <Link href="email:thirdgenerationstudio@gmail.com">thirdgenerationstudio@gmail.com</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
