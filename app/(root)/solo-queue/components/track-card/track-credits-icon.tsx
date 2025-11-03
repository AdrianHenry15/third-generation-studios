"use client";

import { Info } from "lucide-react";
import React from "react";
import { useModalStore } from "@/stores/modal-store";

const TrackCreditsIcon = ({ trackId }: { trackId: string }) => {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <button
            type="button"
            aria-label="Track Credit Info"
            onClick={() =>
                openModal("track_credits_info", {
                    trackId,
                })
            }
            className="absolute right-4 top-[215px] text-white/80 drop-shadow focus:outline-none hover:text-white transition-colors"
        >
            <Info size={20} />
        </button>
    );
};

export default TrackCreditsIcon;
