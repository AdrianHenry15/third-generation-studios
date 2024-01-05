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
                    <address className="text-gray-400 pb-4">2211 Allen Lane Winter Park, FL 32792</address>
                    <div className="flex flex-col text-gray-400">
                        <span className="pb-4">
                            <label>Office: </label>
                            <Link href="tel:3213700836">321-370-0836</Link>
                        </span>
                        <span className="pb-4">
                            <label>Email: </label>
                            <Link href="email:adrianhenry2115@gmail.com">adrianhenry2115@gmail.com</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
