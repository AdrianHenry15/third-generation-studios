"use client";

import React from "react";
import ContactCard from "./contact-card";
import SocialsCard from "./socials-card";
import FooterMenu from "./footer-menu";
import LogoCard from "./logo-card";

const Footer = () => {
    return (
        // FULL CONTAINER
        <footer className="w-full bg-black text-white flex flex-col justify-center px-4">
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
        </footer>
    );
};

export default Footer;
