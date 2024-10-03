import React from "react";
import Image from "next/image";

import SplashIconItem from "./splash-icon-item";
import EmailjsIcon from "@/public/emailjs.png";
import ClerkjsIcon from "@/public/clerk.png";
import { CgSquare } from "react-icons/cg";
import { SiVercel } from "react-icons/si";

const SplashIconRow = () => {
    return (
        <div className="flex flex-col items-center justify-between w-full mt-24 z-50 md:flex-row md:flex-wrap md:justify-between md:px-10 lg:px-48">
            <SplashIconItem
                icon={<SiVercel size={35} />}
                title="Website Deployment"
                description="Ultra-fast website deployment, with global edge network and automatic scaling using Next.js and Vercel"
            />
            <SplashIconItem
                icon={<Image className="w-[35px]" src={EmailjsIcon} alt="emailjs-icon" />}
                title="Email Your Clients"
                description="Over 25,000 clients trust EmailJS to send emails"
            />
            <SplashIconItem
                icon={<Image className="w-[35px]" src={ClerkjsIcon} alt="clerkjs-icon" />}
                title="Users Log In"
                description="Handle up to 5,000 monthly active users with built-in authentication and authorization"
            />
            <SplashIconItem
                icon={<CgSquare size={45} />}
                title="Payment Processing"
                description="Increase repeat purchases and get better insight into your customer behavior with Square payment processing"
            />
        </div>
    );
};

export default SplashIconRow;
