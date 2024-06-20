import { SongType } from "@/lib/types";
import React from "react";

interface ITrackDetailsProps {
    track: SongType;
}

const TrackDetails = (props: ITrackDetailsProps) => {
    return (
        <div className="bg-zinc-900 text-white flex flex-col p-4 rounded-md my-4">
            <div className="flex items-center justify-between border-b-[1px] border-zinc-700 pb-2">
                <h5 className="text-xl text-white">Track Details</h5>
            </div>
            {/* {dropdownOpen && ( */}
            <div className="border-b-[1px] border-zinc-700 py-4">
                <h5 className="text-xs text-zinc-700 mb-4 font-semibold">INFORMATION</h5>
                {/* PUBLISH/RELEASE DATE */}
                <div className="flex justify-between my-2">
                    <h4 className="text-white">Published</h4>
                    <p>{props.track.release_date}</p>
                </div>
                {/* BPM */}
                <div className="flex justify-between my-2">
                    <h4 className="text-white">BPM</h4>
                    <p>{props.track.bpm.split("bpm")}</p>
                </div>
                {/* KEY */}
                <div className="flex justify-between my-2">
                    <h4 className="text-white">Key</h4>
                    <p>{props.track.key}</p>
                </div>
                {/* TODO:PLAYS */}
            </div>
            {/* )} */}
        </div>
    );
};

export default TrackDetails;
