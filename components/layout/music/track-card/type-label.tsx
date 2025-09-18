import { TrackType } from "@/lib/types";
import React from "react";

interface ITypeLabelProps {
    type: TrackType;
}

const TypeLabel: React.FC<ITypeLabelProps> = ({ type }) => {
    return (
        <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                type === "Released" ? "bg-green-500/90 text-white" : "bg-white/50 text-black"
            }`}
        >
            {type}
        </span>
    );
};

export default TypeLabel;
