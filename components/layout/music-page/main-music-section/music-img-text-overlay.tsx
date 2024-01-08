import Image from "next/image";
import React from "react";

import Plane from "@/public/music/plane.jpg";

const MusicImgTextOverlay = () => {
    return (
        <div className="relative">
            <Image src={Plane} alt="plane" />
            <div className="absolute bottom-0 left-0 w-full">
                <h5 className="text-white text-5xl font-semibold m-4">Search</h5>
            </div>
        </div>
    );
};

export default MusicImgTextOverlay;
