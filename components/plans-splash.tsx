import Image from "next/image";
import React from "react";

import PlansSplashImg from "@/public/plans-splash.jpg";

const PlansSplash = () => {
    return (
        <div className="flex w-full md:h-full">
            <div className="flex absolute w-full bg-gradient-to-r from-black h-screen"></div>
            <div className="flex justify-center items-center self-center w-full md:h-full">
                <Image className="object-cover w-full h-screen" src={PlansSplashImg} alt="splash" />
            </div>
        </div>
    );
};

export default PlansSplash;
