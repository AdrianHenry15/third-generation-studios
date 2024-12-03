import React from "react";
import logoImage from "@/public/logos/glowCircle-trans.png";
import Image from "next/image";
import Link from "next/link";

interface ITitleSectionProps {
    title: string;
}

const TitleSection = (props: ITitleSectionProps) => {
    return (
        <div className="flex flex-col justify-center items-center w-full py-24 md:py-48">
            <h5 className="text-4xl flex items-center justify-center text-white w-full px-10 text-center font-semibold md:px-[300px]  ">
                {props.title}
            </h5>
            {/* TGS Logo */}
            <div className="flex items-center justify-center w-full">
                <div className="flex-shrink-0 p-4">
                    <Image src={logoImage} alt={`logo`} width={50} height={50} />
                </div>
            </div>

            <Link
                href={"/consultation"}
                className="bg-white/50 px-6 py-1 hover:shadow-white hover:bg-white hover:shadow-md duration-500 ease-in-out transition-all rounded-md"
            >
                Schedule A Consultation
            </Link>
        </div>
    );
};

export default TitleSection;
