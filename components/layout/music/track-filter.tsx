import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

interface TrackFilterProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const TrackFilter = ({ value, onChange, options }: TrackFilterProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="flex items-center px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <FaFilter className="mr-2" />
                <span className="hidden md:inline">Filter</span>
            </button>
            {open && (
                <ul className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-green-500/20 text-white ${value === opt.value ? "bg-green-500/30" : ""}`}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TrackFilter;
