"use client";

import { Category } from "@/lib/types";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import { LuPlus } from "react-icons/lu";
import UploadSong from "./upload-song";
import UploadWebsite from "./upload-website";
import UploadArtist from "./upload-artist";

interface ICreateItemButtonProps {
    category: Category;
    itemId: string;
}

const CreateItemButton = (props: ICreateItemButtonProps) => {
    const [uploadSong, setUploadSong] = useState(false);
    const [uploadWebsite, setUploadWebsite] = useState(false);
    const [uploadArtist, setUploadArtist] = useState(false);
    const { isSignedIn } = useAuth();

    const handleItemClick = () => {
        if (props.category === Category.SONG) {
            setUploadSong(true);
        } else if (props.category === Category.WEBSITE) {
            setUploadWebsite(true);
        } else if (props.category === Category.ARTIST) {
            setUploadArtist(true);
        } else {
            null;
        }
    };
    if (!isSignedIn) {
        return null;
    } else {
        return (
            <div className="relative w-full h-full">
                <p
                    className="z-20 absolute top-4 left-4 text-white hover:scale-125 scale-100 transition-transform duration-300"
                    onClick={() => handleItemClick()}
                >
                    <LuPlus size={20} />
                </p>
                {uploadSong ? <UploadSong /> : null}
                {uploadWebsite ? <UploadWebsite /> : null}
                {uploadArtist ? <UploadArtist /> : null}
            </div>
        );
    }
};

export default CreateItemButton;
