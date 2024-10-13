import Image from "next/image";
import React from "react";

import PlansSplashImg from "@/public/plans-splash.jpg";
import SplashImageText from "./splash-image-text";

const PlansSplash = () => {
    return (
        <section className="flex w-full relative md:h-full">
            <div className="flex z-10 absolute w-full bg-gradient-to-r from-black h-screen"></div>
            <div className="flex flex-col justify-center items-center self-center w-full relative md:h-full">
                <Image className="object-cover w-full h-screen" src={PlansSplashImg} alt="splash" />
                <div className="flex flex-col absolute w-full">
                    <SplashImageText />
                </div>
            </div>
        </section>
    );
};

export default PlansSplash;
