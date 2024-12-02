import Link from "next/link";
import React from "react";
import Image from "next/image";

import ClerkLogo from "@/public/clerk.png";
import { CgSquare } from "react-icons/cg";
import { SiVercel } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { SiSanity } from "react-icons/si";
import EmailJsIcon from "@/public/emailjs.png";
import { FaStripe } from "react-icons/fa";

const PoweredBy = () => {
    return (
        <div className="flex flex-col w-full justify-center py-32 z-10 border-y-[1px] border-zinc-900">
            <h5 className="text-4xl text-white flex items-center justify-center mb-24">Powered By:</h5>
            <div className="flex items-center justify-around w-full">
                {/* Clerk */}
                <Link target="_blank" href="https://www.sanity.io">
                    <SiSanity className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
                {/* Sanity */}
                <Link target="_blank" href="https://clerk.com/">
                    <Image src={ClerkLogo} alt="clerk-logo" className="hover:scale-125 transition-all duration-300 ease-in-out w-[35px]" />
                </Link>
                {/* Square */}
                <Link target="_blank" href="https://stripe.com">
                    <FaStripe className="hover:scale-125 transition-all duration-300 ease-in-out" size={50} />
                </Link>
                {/* Vercel */}
                <Link target="_blank" href="https://vercel.com/">
                    <SiVercel className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
                {/* Emailjs */}
                <Link target="_blank" href="https://www.emailjs.com/">
                    <Image
                        src={EmailJsIcon}
                        alt="emailjs-icon"
                        className="hover:scale-125 transition-all duration-300 ease-in-out w-[32px] text-white"
                    />
                </Link>
                {/* Nextjs */}
                <Link target="_blank" href="https://nextjs.org/">
                    <SiNextdotjs className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
                {/* Reactjs */}
                <Link target="_blank" href="https://react.dev/">
                    <GrReactjs className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
            </div>
        </div>
    );
};

export default PoweredBy;
