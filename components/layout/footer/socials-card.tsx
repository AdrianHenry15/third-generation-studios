import Image from "next/image";
import Link from "next/link";
import React from "react";

import BeatstarsImg from "@/public/beatstars.png";

import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { RiSoundcloudFill } from "react-icons/ri";
const SocialsCard = () => {
    return (
        <div className="flex flex-col w-full items-center justify-center border-t-[1px] border-zinc-900">
            <h5 className="text-center text-white py-2 italic">Connect With Us:</h5>
            <div className="flex w-full justify-around py-10 ">
                <Link target="_blank" href="https://www.facebook.com/profile.php?id=61555913473339">
                    <AiFillFacebook size={35} />
                </Link>
                <Link target="_blank" href="https://www.instagram.com/wearethirdgenerationstudios">
                    <AiOutlineInstagram size={35} />
                </Link>
                <Link target="_blank" href="https://www.youtube.com/@a.iso.thirdgenerationstudios">
                    <FaYoutube size={35} />
                </Link>
                <Link target="_blank" href="https://soundcloud.com/anjin-iso">
                    <RiSoundcloudFill size={35} />
                </Link>
                <Link target="_blank" href="https://www.beatstars.com/anjiniso">
                    <Image src={BeatstarsImg} alt="beatstars-icon" className="w-[35px] h-[35px]" />
                </Link>
            </div>
        </div>
    );
};

export default SocialsCard;
