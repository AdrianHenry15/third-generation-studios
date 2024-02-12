"use client";

import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { useTrackStore } from "stores/track-store";

const TrackDetails = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { currentTrack } = useTrackStore();
    return (
        <div className="bg-zinc-900 text-white flex flex-col p-4 my-2 rounded-md lg:hidden">
            <div className="flex items-center justify-between border-b-[1px] border-zinc-700 pb-2">
                <h5 className="text-xl text-white">Track Details</h5>
                {dropdownOpen ? (
                    <BiChevronUp onClick={() => setDropdownOpen(false)} size={35} />
                ) : (
                    <BiChevronDown onClick={() => setDropdownOpen(true)} size={35} />
                )}
            </div>
            {dropdownOpen && (
                <div className="border-b-[1px] border-zinc-700 py-4">
                    <h5 className="text-xs text-zinc-700 mb-4 font-semibold">INFORMATION</h5>
                    {/* PUBLISH/RELEASE DATE */}
                    <div className="flex justify-between my-2">
                        <h4 className="text-white">Published</h4>
                        <p>{currentTrack.release_date}</p>
                    </div>
                    {/* BPM */}
                    <div className="flex justify-between my-2">
                        <h4 className="text-white">BPM</h4>
                        <p>{currentTrack.bpm.split("bpm")}</p>
                    </div>
                    {/* KEY */}
                    <div className="flex justify-between my-2">
                        <h4 className="text-white">Key</h4>
                        <p>{currentTrack.key}</p>
                    </div>
                    {/* TODO:PLAYS */}
                </div>
            )}
        </div>
    );
};

export default TrackDetails;
