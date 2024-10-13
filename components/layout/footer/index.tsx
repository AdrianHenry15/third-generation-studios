"use client";

import React from "react";
import Image from "next/image";

import Logo from "@/public/logos/glowCircle-trans.png";

import ContactCard from "./contact-card";
import SocialsCard from "./socials-card";
import FooterMenu from "./footer-menu";
import LogoCard from "./logo-card";
import PoweredBy from "./powered-by";

interface IFooterProps {
    className?: string;
}

const Footer = (props: IFooterProps) => {
    return (
        // FULL CONTAINER
        <footer
            className={`${props.className} w-full bg-black text-white flex flex-col justify-center px-4 border-t-[1px] border-zinc-900`}
        >
            <div className="flex flex-col relative justify-center items-center">
                <Image src={Logo} className="absolute self-center opacity-10 z-0 w-[1200px]" alt="logo" />
                {/* SOCIALS  */}
                <SocialsCard />
                {/* Powered By */}
                <PoweredBy />
            </div>
            {/* FOOTER MENU */}
            <div className="flex flex-col self-center w-full md:flex-row md:py-2">
                <LogoCard />
                <div className="flex flex-col md:flex-row md:w-1/2 md:self-center">
                    <FooterMenu />
                    <ContactCard />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
