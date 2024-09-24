"use client";

import React from "react";
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
            {/* FOOTER MENU */}
            <div className="flex flex-col self-center w-full md:flex-row md:py-2">
                <LogoCard />
                <div className="flex flex-col md:flex-row md:w-1/2 md:self-center">
                    <FooterMenu />
                    <ContactCard />
                </div>
            </div>
            {/* SOCIALS  */}
            <SocialsCard />
            {/* Powered By */}
            <PoweredBy />
        </footer>
    );
};

export default Footer;
