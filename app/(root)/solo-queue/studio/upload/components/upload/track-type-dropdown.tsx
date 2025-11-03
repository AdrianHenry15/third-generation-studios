import React from "react";
import { TrackType } from "@/lib/types/database";
import { Constants } from "@/lib/types/supabase-types";
import { ChevronDown } from "lucide-react";

type TrackTypeDropdownProps = {
    value: TrackType | undefined;
    onChange: (type: TrackType) => void;
    trackId: string;
};

// Dropdown for selecting track type (Released, Unreleased, etc.)
export default function TrackTypeDropdown({ value, onChange, trackId }: TrackTypeDropdownProps) {
    const trackTypes = Constants.public.Enums.track_type;

    return (
        <div className="relative">
            <select
                id={`track-type-${trackId}`}
                value={value || ""}
                onChange={(e) => onChange(e.target.value as TrackType)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer pr-8"
            >
                <option value="" disabled>
                    Select track type
                </option>
                {trackTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
    );
}
